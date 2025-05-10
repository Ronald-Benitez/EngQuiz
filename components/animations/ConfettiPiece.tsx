// ConfettiPiece.tsx
import React, { useEffect } from 'react';
import Animated, {
  useSharedValue,
  useAnimatedProps,
  withTiming,
  withRepeat,
  withDelay,
  Easing,
} from 'react-native-reanimated';
import { Rect } from 'react-native-svg';

const AnimatedRect = Animated.createAnimatedComponent(Rect);

export default function ConfettiPiece({
  x,
  delay,
  color,
  size,
  duration,
}: {
  x: number;
  delay: number;
  color: string;
  size: number;
  duration: number;
}) {
  const y = useSharedValue(-50);

  useEffect(() => {
    y.value = withDelay(
      delay,
      withRepeat(
        withTiming(900, {
          duration,
          easing: Easing.linear,
        }),
        -1,
        false
      )
    );
  }, []);

  const animatedProps = useAnimatedProps(() => ({
    y: y.value,
  }));

  return (
    <AnimatedRect
      animatedProps={animatedProps}
      x={x}
      width={size}
      height={size * 2}
      fill={color}
      rx={2}
      ry={2}
    />
  );
}
