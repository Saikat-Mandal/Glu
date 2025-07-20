import { useFonts } from 'expo-font';
import { Stack } from "expo-router";
import * as SplashScreen from 'expo-splash-screen';
import { useEffect } from "react";
import "../global.css";

export default function RootLayout() {

  SplashScreen.preventAutoHideAsync();

  const [loaded, error] = useFonts({
    'Figtree-Black': require('../assets/fonts/Figtree-Black.ttf'),
    'Figtree-BlackItalic': require('../assets/fonts/Figtree-BlackItalic.ttf'),
    'Figtree-Bold': require('../assets/fonts/Figtree-Bold.ttf'),
    'Figtree-BoldItalic': require('../assets/fonts/Figtree-BoldItalic.ttf'),
    'Figtree-ExtraBold': require('../assets/fonts/Figtree-ExtraBold.ttf'),
    'Figtree-ExtraBoldItalic': require('../assets/fonts/Figtree-ExtraBoldItalic.ttf'),
    'Figtree-Italic': require('../assets/fonts/Figtree-Italic.ttf'),
    'Figtree-Light': require('../assets/fonts/Figtree-Light.ttf'),
    'Figtree-LightItalic': require('../assets/fonts/Figtree-LightItalic.ttf'),
    'Figtree-Medium': require('../assets/fonts/Figtree-Medium.ttf'),
    'Figtree-MediumItalic': require('../assets/fonts/Figtree-MediumItalic.ttf'),
    'Figtree-Regular': require('../assets/fonts/Figtree-Regular.ttf'),
    'Figtree-SemiBold': require('../assets/fonts/Figtree-SemiBold.ttf'),
    'Figtree-SemiBoldItalic': require('../assets/fonts/Figtree-SemiBoldItalic.ttf'),
    'Dancing-ScriptRegualar': require('../assets/fonts/DancingScript-VariableFont_wght.ttf'),

  });

  // ✅ Avoid undefined state
  // const auth = useContext(AuthContext);
  useEffect(() => {
    if (loaded || error) {
      SplashScreen.hideAsync();
    }
  }, [loaded, error]);


  return (
    <Stack>
      <Stack.Screen name="index" options={{ headerShown: false }} />
      <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
      <Stack.Screen name="option" options={{
        headerShown: false,
        presentation: 'modal',
        contentStyle: { backgroundColor: 'transparent' },
      }} />
      <Stack.Screen name="settings" options={{
        headerShown: false,
        presentation: 'modal',
        contentStyle: { backgroundColor: 'transparent' },
      }} />
      <Stack.Screen name="map" options={{ headerShown: false }} />
      <Stack.Screen name="search" options={{ headerShown: false }} />
      <Stack.Screen name="bookingreview" options={{ headerShown: false }} />
      <Stack.Screen name="[hostel]" options={{ headerShown: false }} />
    </Stack>
  );
}
