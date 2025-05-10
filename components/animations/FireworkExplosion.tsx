// FireworkExplosion.tsx
import React, { useEffect } from 'react';
import Animated, {
  useSharedValue,
  useAnimatedProps,
  withTiming,
  withRepeat,
  withDelay,
  Easing,
  runOnJS,
} from 'react-native-reanimated';
import Svg, { Line } from 'react-native-svg';

const AnimatedLine = Animated.createAnimatedComponent(Line);

const generateLines = (count = 8) => {
  const angleStep = (2 * Math.PI) / count;
  const lines = [];
  for (let i = 0; i < count; i++) {
    const angle = i * angleStep;
    const dx = Math.cos(angle) * 80;
    const dy = Math.sin(angle) * 80;
    lines.push({ dx, dy });
  }
  return lines;
};

export default function FireworkExplosion({ cx, cy, color }: {
  cx: number;
  cy: number;
  color: string;
}) {
  const lines = generateLines();
  const progress = useSharedValue(0);

  useEffect(() => {
    progress.value = withDelay(
      Math.random() * 1000,
      withRepeat(
        withTiming(1, {
          duration: 800,
          easing: Easing.out(Easing.exp),
        }),
        -1,
        true
      )
    );
  }, []);

  return (
    <>
      {lines.map((line, index) => {
        const animatedProps = useAnimatedProps(() => ({
          x1: `${cx}`,
          y1: `${cy}`,
          x2: `${cx + line.dx * progress.value}`,
          y2: `${cy + line.dy * progress.value}`,
        }));
        return (
          <AnimatedLine
            key={index}
            animatedProps={animatedProps}
            stroke={color}
            strokeWidth="2"
          />
        );
      })}
    </>
  );
}
