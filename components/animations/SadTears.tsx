// SadTears.tsx
import React, { useEffect } from 'react';
import Animated, {
    useSharedValue,
    useAnimatedProps,
    withTiming,
    withRepeat,
    withDelay,
    Easing,
} from 'react-native-reanimated';
import { Dimensions } from 'react-native';
import Svg, { Circle } from 'react-native-svg';

const { width, height } = Dimensions.get('window');
const AnimatedCircle = Animated.createAnimatedComponent(Circle);

function Tear({ x, delay }: { x: number; delay: number }) {
    const y = useSharedValue(-20);

    useEffect(() => {
        y.value = withDelay(
            delay,
            withRepeat(
                withTiming(height * 0.7, {
                    duration: 2000,
                    easing: Easing.in(Easing.quad),
                }),
                -1,
                false
            )
        );
    }, []);

    const animatedProps = useAnimatedProps(() => ({
        cy: y.value,
    }));

    return (
        <AnimatedCircle
            animatedProps={animatedProps}
            cx={x}
            r="6"
            fill="#00BFFF"
            opacity={0.7}
        />
    );
}

export default function SadTears() {
    const positions = [width * 0.4, width * 0.6, width * 0.5, width * 0.2, width * 0.8, width * 0.3];

    return (
        <Svg height={height} width={width} style={{ position: 'absolute', zIndex: 100 }}>
            {positions.map((x, index) => (
                <Tear key={index} x={x} delay={index * 600} />
            ))}
        </Svg>
    );
}
