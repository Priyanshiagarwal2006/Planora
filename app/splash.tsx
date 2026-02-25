import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { useRouter } from 'expo-router';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
} from 'react-native-reanimated';
import { useEffect } from 'react';

export default function Splash() {
  const router = useRouter();

  const scale = useSharedValue(0.8);
  const opacity = useSharedValue(0);

  useEffect(() => {
    scale.value = withTiming(1, { duration: 800 });
    opacity.value = withTiming(1, { duration: 800 });
  }, []);

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ scale: scale.value }],
    opacity: opacity.value,
  }));

  return (
    <View style={styles.container}>

      <Animated.View style={[styles.center, animatedStyle]}>
        {/* 🔥 Better Logo */}
        <View style={styles.logoBox}>
          <Text style={styles.logoIcon}>✓</Text>
        </View>

        <Text style={styles.logoText}>Planora</Text>
        <Text style={styles.tagline}>Organize your day smarter</Text>
      </Animated.View>

      <TouchableOpacity
        style={styles.button}
        onPress={() => router.replace('/home')}
      >
        <Text style={styles.buttonText}>Get Started</Text>
      </TouchableOpacity>

    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0F172A', // premium dark
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 80,
  },

  center: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },

  logoBox: {
    width: 70,
    height: 70,
    borderRadius: 20,
    backgroundColor: '#7C3AED',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 15,
  },

  logoIcon: {
    fontSize: 30,
    color: '#fff',
    fontWeight: 'bold',
  },

  logoText: {
    fontSize: 36,
    fontWeight: 'bold',
    color: '#ffffff',
    letterSpacing: 2,
  },

  tagline: {
    marginTop: 8,
    fontSize: 14,
    color: '#94A3B8',
  },

  button: {
    backgroundColor: '#7C3AED',
    paddingVertical: 14,
    paddingHorizontal: 60,
    borderRadius: 30,
    marginBottom: 40,
  },

  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
});