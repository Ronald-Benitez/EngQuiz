// Confetti.tsx
import React from 'react';
import { Dimensions } from 'react-native';
import Svg from 'react-native-svg';
import ConfettiPiece from './ConfettiPiece';

const { width } = Dimensions.get('window');

const colors = ['#FF69B4', '#1E90FF', '#32CD32', '#FFD700', '#FF4500', '#00FFFF'];

const generateConfetti = (count = 30) => {
    return Array.from({ length: count }).map(() => ({
        x: Math.random() * width,
        delay: Math.random() * 1000,
        color: colors[Math.floor(Math.random() * colors.length)],
        size: 6 + Math.random() * 4,
        duration: 2000 + Math.random() * 1500,
    }));
};

export default function Confetti() {
    const pieces = generateConfetti();

    return (
        <Svg height="100%" width="100%" style={{ position: 'absolute', zIndex: 100 }}>
            {pieces.map((piece, index) => (
                <ConfettiPiece
                    key={index}
                    x={piece.x}
                    delay={piece.delay}
                    color={piece.color}
                    size={piece.size}
                    duration={piece.duration}
                />
            ))}
        </Svg>
    );
}
