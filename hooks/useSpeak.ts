import * as Speach from 'expo-speech';

import { useEffect, useState } from 'react';

const useSpeak = () => {
    const [isSpeaking, setIsSpeaking] = useState(false);

    const speak = (text: string) => {
        if (isSpeaking) return
        setIsSpeaking(true);
        const cleanText = text.replace("${}", " ")
        Speach.speak(cleanText, {
            onDone: () => setIsSpeaking(false),
            onStopped: () => setIsSpeaking(false),
            language: "en-US" 
        });
    };

    const stop = () => {
        setIsSpeaking(false);
        Speach.stop();
    };

    return { speak, isSpeaking, stop };
}

export default useSpeak;