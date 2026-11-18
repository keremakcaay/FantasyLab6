
import React, { useEffect, useRef } from 'react';
import {
  Animated,
  Easing,
  Image,
  StyleSheet,
  useWindowDimensions,
  View,
} from 'react-native';

export default function DragonAnimation() {
  const { width, height } = useWindowDimensions();

  const x = useRef(new Animated.Value(-120)).current;
  const y = useRef(new Animated.Value(height * 0.25)).current;
  const animation = useRef<Animated.CompositeAnimation | null>(null);

  useEffect(() => {
    const fly = () => {
      animation.current?.stop();

      const startY = height * (0.12 + Math.random() * 0.3);
      const endY = height * (0.12 + Math.random() * 0.3);
      const middleY = (startY + endY) / 2 + (Math.random() - 0.5) * 100;

      x.setValue(-120);
      y.setValue(startY);

      animation.current = Animated.parallel([
        Animated.timing(x, {
          toValue: width + 120,
          duration: 3500,
          easing: Easing.linear,
          useNativeDriver: true,
        }),
        Animated.sequence([
          Animated.timing(y, {
            toValue: middleY,
            duration: 1750,
            easing: Easing.inOut(Easing.ease),
            useNativeDriver: true,
          }),
          Animated.timing(y, {
            toValue: endY,
            duration: 1750,
            easing: Easing.inOut(Easing.ease),
            useNativeDriver: true,
          }),
        ]),
      ]);

      animation.current.start();
    };

    fly();

    const interval = setInterval(fly, 5000);

    return () => {
      clearInterval(interval);
      animation.current?.stop();
    };
  }, [width, height, x, y]);

  return (
    <View pointerEvents="none" style={styles.container}>
      <Animated.View
        style={[
          styles.dragon,
          {
            transform: [
              { translateX: x },
              { translateY: y },
            ],
          },
        ]}
      >
        <Image
          source={require('../assets/dragon.png')}
          style={styles.image}
          resizeMode="contain"
        />
      </Animated.View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    overflow: 'hidden',
    },
  dragon: {
    position: 'absolute',
    left: 0,
    top: 0,
  },
  image: {
    width: 110,
    height: 90,
  },
});
