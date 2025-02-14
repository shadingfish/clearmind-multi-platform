// clear-mind/app/_layout.tsx


import { useFonts } from "expo-font";
import { Slot, SplashScreen, Stack } from "expo-router";
import { useEffect } from "react";
import "../tamagui-web.css";
import { Provider } from "./Provider";
import { GestureHandlerRootView } from 'react-native-gesture-handler';

export {
  ErrorBoundary,
} from "expo-router";

SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const [fontsLoaded, fontsError] = useFonts({
    NotoSans: require("../assets/fonts/NotoSans-VariableFont_wdth,wght.ttf"),
    NotoSansItalic: require("../assets/fonts/NotoSans-Italic-VariableFont_wdth,wght.ttf"),
  });

  useEffect(() => {
    if (fontsLoaded || fontsError) {
      SplashScreen.hideAsync();
    }
  }, [fontsLoaded, fontsError]);

  if (!fontsLoaded && !fontsError) {
    return null;
  }

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <Providers>
        <RootLayoutNav />
      </Providers>
    </GestureHandlerRootView>
  );
}

const Providers = ({ children }: { children: React.ReactNode }) => {
  return <Provider>{children}</Provider>;
};

function RootLayoutNav() {
  return (
    <Stack>
      <Stack.Screen
        name="index"
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="(login)"
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="(app)"
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="modal"
        options={{
          title: "Tamagui + Expo",
          presentation: "modal",
          animation: "slide_from_right",
          gestureEnabled: true,
          gestureDirection: "horizontal",
        }}
      />
    </Stack>
  );
}