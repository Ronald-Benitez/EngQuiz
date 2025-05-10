// SadFace.tsx
import React, { useEffect } from 'react';
import { View } from 'react-native';
import Svg, { Circle, Path } from 'react-native-svg';
import Animated, {
    useSharedValue,
    useAnimatedStyle,
    withRepeat,
    withTiming,
    Easing,
} from 'react-native-reanimated';

export default function SadFace() {
    const offset = useSharedValue(0);

    useEffect(() => {
        offset.value = withRepeat(
            withTiming(20, {
                duration: 1000,
                easing: Easing.inOut(Easing.sin),
            }),
            -1,
            true
        );
    }, []);

    const animatedStyle = useAnimatedStyle(() => ({
        transform: [{ translateX: offset.value }],
    }));

    return (
        <Animated.View style={[{ position: 'absolute', top: 100, alignSelf: 'center', zIndex: 100 }, animatedStyle]}>
            <Svg height="120" width="120">
                <Circle cx="60" cy="60" r="50" stroke="#333" strokeWidth="4" fill="transparent" />
                <Circle cx="40" cy="50" r="5" fill="#333" />
                <Circle cx="80" cy="50" r="5" fill="#333" />
                <Path
                    d="M40 85 Q60 70 80 85"
                    stroke="#333"
                    strokeWidth="4"
                    fill="none"
                />
            </Svg>
        </Animated.View>
    );
}
