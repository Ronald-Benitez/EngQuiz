import { useState, useEffect, useRef } from 'react';

export interface UseTimerReturn {
    time: number;
    formatTime: (seconds: number) => string;
    stop: () => void;
    isRunning: boolean;
    start: () => void;
    reset: () => void;
}

const useTimer = () => {
    const [time, setTime] = useState(0);
    const [isRunning, setIsRunning] = useState(true); // Track running state
    const intervalRef = useRef<number | null>(null);

    useEffect(() => {
        if (isRunning) {
            intervalRef.current = window.setInterval(() => {
                setTime((prevTime) => prevTime + 1);
            }, 1000);
        }

        return () => {
            if (intervalRef.current) {
                clearInterval(intervalRef.current);
            }
        };
    }, [isRunning]); // Depend on isRunning

    const formatTime = (seconds: number) => {
        const hours = Math.floor(seconds / 3600);
        const minutes = Math.floor((seconds % 3600) / 60);
        const remainingSeconds = seconds % 60;
        return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${remainingSeconds.toString().padStart(2, '0')}`;
    };
    
    const stop = () => {
        setIsRunning(false);
    };

    const start = () => {
        setIsRunning(true);
    }

    const reset = () => {
        setTime(0);
        setIsRunning(true);
    }

    return { time, formatTime, stop, isRunning, start, reset };
};

export default useTimer;
