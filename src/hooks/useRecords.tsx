import AsyncStorage from '@react-native-async-storage/async-storage';
import React, { useState, useEffect, useCallback, useContext, createContext } from 'react';

const RECORDS_KEY = 'appRecords';

export type Record = {
    questions: number;
    errors: number;
    corrects: number;
    date: string;
};

export type AppRecords = {
    [quizName: string]: Record[];
};

const defaultRecords: AppRecords = {

};

interface AppSettingsContextProps {
    records: AppRecords;
    loading: boolean;
    error: unknown;
    updateRecords: (key: string, newRecord: Record) => Promise<void>;
    resetRecords: () => Promise<void>;
}

const AppRecordsContext = createContext<AppSettingsContextProps | undefined>(undefined);

const AppRecordsProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [records, setRecords] = useState<AppRecords>(defaultRecords);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<unknown>(null);

    useEffect(() => {
        const loadSettings = async () => {
            try {
                const storedSettings = await AsyncStorage.getItem(RECORDS_KEY);
                if (storedSettings) {
                    setRecords(JSON.parse(storedSettings));
                }
            } catch (e) {
                setError(e);
                console.error('Error loading settings:', e);
            } finally {
                setLoading(false);
            }
        };

        loadSettings();
    }, []);

    const updateRecords = useCallback(async (key: string, newRecord: Record) => {
        try {
            let newRecords = {}
            if (Object.keys(records)?.includes(key)) {
                newRecords = {
                    ...records,
                    [key]: [
                        ...records[key],
                        newRecord
                    ]
                }
            } else {
                newRecords = {
                    ...records,
                    [key]: [newRecord]
                }
            }

            await AsyncStorage.setItem(RECORDS_KEY, JSON.stringify(newRecords));
            setRecords(newRecords);
        } catch (e) {
            setError(e);
            console.error('Error saving settings:', e);
        }
    }, [records]);

    const resetRecords = useCallback(async () => {
        try {
            await AsyncStorage.removeItem(RECORDS_KEY);
            setRecords(defaultRecords);
        } catch (e) {
            setError(e);
            console.error('Error resetting settings:', e);
        }
    }, []);

    const hook = { records, loading, error, updateRecords, resetRecords };
    return (
        <AppRecordsContext.Provider value={hook}>
            {children}
        </AppRecordsContext.Provider>
    )
};

const useAppRecords = () => {
    const context = useContext(AppRecordsContext);
    if (context === undefined) {
        throw new Error('useAppRecords must be used within an AppRecordsProvider');
    }
    return context;
}

export {
    AppRecordsProvider,
    useAppRecords,
}