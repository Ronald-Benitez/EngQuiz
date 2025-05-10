// Fireworks.tsx
import React from 'react';
import { Dimensions } from 'react-native';
import Svg from 'react-native-svg';
import FireworkExplosion from './FireworkExplosion';

const { width, height } = Dimensions.get('window');

const getRandomColor = () => {
    const colors = ['#FFD700', '#FF69B4', '#00FFFF', '#ADFF2F', '#FF4500', '#1E90FF'];
    return colors[Math.floor(Math.random() * colors.length)];
};

const generateExplosions = (count: number) => {
    return Array.from({ length: count }, () => ({
        cx: Math.random() * width,
        cy: Math.random() * (height * 0.7),
        color: getRandomColor(),
    }));
};

export default function Fireworks() {
    const explosions = generateExplosions(6); // Cambia a más si quieres más fuegos

    return (
        <Svg height={height} width={width} style={{ position: 'absolute', zIndex: 100 }}>
            {explosions.map((explosion, index) => (
                <FireworkExplosion
                    key={index}
                    cx={explosion.cx}
                    cy={explosion.cy}
                    color={explosion.color}
                />
            ))}
        </Svg>
    );
}
