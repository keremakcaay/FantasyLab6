
import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  ImageBackground,
  Pressable,
  StyleSheet,
  Alert,
  ActivityIndicator,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useFonts, MedievalSharp_400Regular } from '@expo-google-fonts/medievalsharp';
import { Asset } from 'expo-asset';
import * as FileSystem from 'expo-file-system/legacy';
import LottieView from 'lottie-react-native';
import DragonAnimation from '../components/DragonAnimation';

type GameInfo = {
  title: string;
  version: string;
  subtitle: string;
};

const DEFAULT_INFO: GameInfo = {
  title: 'Fantasy Adventure',
  version: '1.0.0',
  subtitle: 'Start Your Journey!',
};

function parseGameInfo(text: string): GameInfo {
  const values: Record<string, string> = {};

  text.split(/\r?\n/).forEach(line => {
    const separator = line.indexOf('=');

    if (separator > 0) {
      const key = line.slice(0, separator).trim();
      const value = line.slice(separator + 1).trim();
      values[key] = value;
    }
  });

  if (!values.title || !values.version || !values.subtitle) {
    throw new Error('Invalid game information');
  }

  return {
    title: values.title,
    version: values.version,
    subtitle: values.subtitle,
  };
}

export default function StartScreen() {
  const [info, setInfo] = useState<GameInfo>(DEFAULT_INFO);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  const [fontsLoaded, fontError] = useFonts({
    MedievalSharp: MedievalSharp_400Regular,
  });

  useEffect(() => {
    async function loadGameInfo() {
      try {
        const asset = Asset.fromModule(
          require('../data/gameInfo.txt')
        );

        await asset.downloadAsync();

        const uri = asset.localUri ?? asset.uri;
        const content = await FileSystem.readAsStringAsync(uri);

        setInfo(parseGameInfo(content));
      } catch (err) {
        console.warn('Cannot load game information:', err);
        setError(true);
        setInfo(DEFAULT_INFO);
      } finally {
        setLoading(false);
      }
    }

    loadGameInfo();
  }, []);

  if (loading || (!fontsLoaded && !fontError)) {
    return (
      <View style={styles.loading}>
        <ActivityIndicator size="large" color="#D4AF37" />
      </View>
    );
  }

  const medievalFont = fontsLoaded ? 'MedievalSharp' : undefined;

  return (
    <ImageBackground
      source={require('../assets/medieval_wood.jpg')}
      resizeMode="cover"
      style={styles.background}
    >
      <SafeAreaView style={styles.container}>
        <View style={styles.overlay}>
        
            <DragonAnimation />

          {/* Left torch */}
          <LottieView
            source={require('../assets/torch_animation.json')}
            autoPlay
            loop
            style={styles.torchLeft}
          />

          {/* Right torch */}
          <LottieView
            source={require('../assets/torch_animation.json')}
            autoPlay
            loop
            style={styles.torchRight}
          />

          <View style={styles.content}>
            <Text style={[
              styles.title,
              { fontFamily: medievalFont },
            ]}>
              {info.title}
            </Text>

            <Text style={styles.version}>
              Version {info.version}
            </Text>

            <Text style={[
              styles.subtitle,
              { fontFamily: medievalFont },
            ]}>
              {info.subtitle}
            </Text>

            {error && (
              <Text style={styles.warning}>
                Game information could not be loaded.
                Default values are used.
              </Text>
            )}

            <Pressable
              onPress={() =>
                Alert.alert('Game', 'Your adventure begins!')
              }
              style={({ pressed }) => [
                styles.button,
                pressed && styles.buttonPressed,
              ]}
            >
              <Text style={[
                styles.buttonText,
                { fontFamily: medievalFont },
              ]}>
                START GAME
              </Text>
            </Pressable>
          </View>
        </View>
      </SafeAreaView>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  background: {
    flex: 1,
    width: '100%',
    height: '100%',
  },
  container: {
    flex: 1,
  },
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.55)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  content: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
    width: '100%',
  },
  title: {
    color: '#D4AF37',
    fontSize: 34,
    textAlign: 'center',
    marginBottom: 12,
  },
  version: {
    color: '#E8D9B5',
    fontSize: 14,
    marginBottom: 20,
  },
  subtitle: {
    color: '#F5DEB3',
    fontSize: 21,
    textAlign: 'center',
    marginBottom: 35,
  },
  warning: {
    color: '#FFCC66',
    fontSize: 12,
    textAlign: 'center',
    marginBottom: 16,
  },
  torchLeft: {
    position: 'absolute',
    left: 5,
    top: '20%',
    width: 85,
    height: 160,
  },
  torchRight: {
    position: 'absolute',
    right: 5,
    top: '20%',
    width: 85,
    height: 160,
  },
  button: {
    backgroundColor: '#6B3E20',
    borderWidth: 2,
    borderColor: '#D4AF37',
    paddingVertical: 15,
    paddingHorizontal: 40,
    borderRadius: 10,
  },
  buttonPressed: {
    opacity: 0.65,
    transform: [{ scale: 0.95 }],
  },
  buttonText: {
    color: '#FFD700',
    fontSize: 22,
  },
  loading: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#15110D',
  },
});
