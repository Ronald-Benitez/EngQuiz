import AsyncStorage from '@react-native-async-storage/async-storage';
import React, { useState, useEffect, useCallback, useContext, createContext } from 'react';

const SETTINGS_KEY = 'appSettings';

/*
en-AU	English	Australia	Australian English
en-CA	English	Canada	Canadian English
en-GB	English	United Kingdom	British English
en-IE	English	Ireland	Irish English
en-IN	English	India	Indian English
en-NZ	English	New Zealand	New Zealand English
en-US	English	United States	US English
en-ZA	English	South Africa	English (South Africa)
*/

export type AppSettings = {
    automatically: boolean;
    delay: number;
    questions: number;
    accent?: "en-AU" | "en-CA" | "en-GB" | "en-IE" | "en-IN" | "en-NZ" | "en-US" | "en-ZA";
    max: boolean;
    animationDuration: number;
    listenMode: boolean;
    showQuestionInListenMode: boolean;
};

export type UpdateOptions = keyof AppSettings;

const defaultSettings: AppSettings = {
    automatically: false,
    delay: 1000,
    questions: 20,
    accent: "en-US",
    max: false,
    animationDuration: 2000,
    listenMode: false,
    showQuestionInListenMode: false,
};

interface AppSettingsContextProps {
    settings: AppSettings;
    loading: boolean;
    error: unknown;
    updateSettings: (newSettings: AppSettings) => Promise<void>;
    resetSettings: () => Promise<void>;
}

const AppSettingsContext = createContext<AppSettingsContextProps | undefined>(undefined);

const AppSettingsProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [settings, setSettings] = useState<AppSettings>(defaultSettings);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<unknown>(null);

    useEffect(() => {
        const loadSettings = async () => {
            try {
                const storedSettings = await AsyncStorage.getItem(SETTINGS_KEY);
                if (storedSettings) {
                    setSettings(JSON.parse(storedSettings));
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

    const updateSettings = useCallback(async (newSettings: AppSettings) => {
        try {
            const updatedSettings = { ...settings, ...newSettings };
            await AsyncStorage.setItem(SETTINGS_KEY, JSON.stringify(updatedSettings));
            setSettings(updatedSettings);
        } catch (e) {
            setError(e);
            console.error('Error saving settings:', e);
        }
    }, [settings]);

    const resetSettings = useCallback(async () => {
        try {
            await AsyncStorage.removeItem(SETTINGS_KEY);
            setSettings(defaultSettings);
        } catch (e) {
            setError(e);
            console.error('Error resetting settings:', e);
        }
    }, []);

    const hook = { settings, loading, error, updateSettings, resetSettings };
    return (
        <AppSettingsContext.Provider value={hook}>
            {children}
        </AppSettingsContext.Provider>
    )
};

const useAppSettings = () => {
    const context = useContext(AppSettingsContext);
    if (context === undefined) {
        throw new Error('useAppSettings must be used within an AppSettingsProvider');
    }
    return context;
}

const calculateQuestions = (questions: number, settings: AppSettings) => {
    if (settings) {
        if (!settings.max) {
            return questions > settings.questions ? settings.questions : questions;
        }
    }
    return questions;
}

export {
    AppSettingsProvider,
    useAppSettings,
    calculateQuestions,
}