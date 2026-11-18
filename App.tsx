
import React, { useEffect } from 'react';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import * as ScreenOrientation from 'expo-screen-orientation';

import StartScreen from './screens/StartScreen';

export default function App() {
  useEffect(() => {
    async function lockOrientation() {
      try {
        await ScreenOrientation.lockAsync(
          ScreenOrientation.OrientationLock.PORTRAIT_UP
        );
      } catch (error) {
        console.warn('Orientation lock failed:', error);
      }
    }

    lockOrientation();
  }, []);

  return (
    <SafeAreaProvider>
      <StartScreen />
    </SafeAreaProvider>
  );
}
