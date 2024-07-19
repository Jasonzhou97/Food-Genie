import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native';
import { useFonts } from 'expo-font';
import { Stack } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import { useEffect } from 'react';
import 'react-native-reanimated';
import { AuthProvider } from '../hooks/AuthContext'; // Ensure correct path
import { useColorScheme } from '@/hooks/useColorScheme';
import { GestureHandlerRootView } from 'react-native-gesture-handler';

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const colorScheme = useColorScheme();
  const [loaded] = useFonts({
    SpaceMono: require('../assets/fonts/SpaceMono-Regular.ttf'),
  });

  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync();
    }
  }, [loaded]);

  if (!loaded) {
    return null;
  }

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
    <AuthProvider>
      <ThemeProvider value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
        <Stack>
          <Stack.Screen name="Home" options={{ headerShown: true, title: 'FoodGenie' }} />
          <Stack.Screen name="Login" options={{ headerShown: false }} />
          <Stack.Screen name="Register" options={{ headerShown: false }} />
          {/* <Stack.Screen name="profile" options={{ headerShown: false }} /> */}
          <Stack.Screen name="Restaurant" options={{ headerShown: false }} />
          <Stack.Screen name="+not-found" />
        </Stack>
      </ThemeProvider>
    </AuthProvider>
    </GestureHandlerRootView>
  );
}
