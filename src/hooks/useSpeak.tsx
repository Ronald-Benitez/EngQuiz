import * as Speach from 'expo-speech';

import { createContext, useContext, useEffect, useState } from 'react';
import { useAppSettings } from './useSettings';

export interface UseSpeakReturn {
    speak: (text: string) => void;
    isSpeaking: boolean;
    stop: () => void;
}

const SpeakContext = createContext<UseSpeakReturn | undefined>(undefined);

const SpeakProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [isSpeaking, setIsSpeaking] = useState(false);
    const { settings } = useAppSettings()

    const speak = (text: string) => {
        stop()
        setIsSpeaking(true);
        const cleanText = text.replace("${}", " ").replaceAll("*", "").replaceAll("-", "").replaceAll("_", "")
        Speach.speak(cleanText, {
            onDone: () => setIsSpeaking(false),
            onStopped: () => setIsSpeaking(false),
            language: settings?.accent || "en-US"
        });
    };

    const stop = () => {
        setIsSpeaking(false);
        Speach.stop();
    };

    const hook = { speak, isSpeaking, stop }

    return (
        <SpeakContext.Provider value={hook} >
            {children}
        </SpeakContext.Provider>
    );
}

const useSpeak = () => {
    const context = useContext(SpeakContext)
    if (context === undefined) {
        throw new Error('useSpeak must be used within an SpeakProvider')
    }
    return context
}

export default useSpeak;
export { SpeakProvider }