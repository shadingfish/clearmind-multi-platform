// app/(app)/_layout.tsx

import { auth } from "@/constants/firebaseConfig";
import { useAuth } from "@/hooks/useAuth";
import { Stack, useRouter, useSegments } from "expo-router";
import { useEffect } from "react";
import { ChapterProgressProvider } from "@/contexts/AuthContext";
import { View, StyleSheet } from "react-native";
import BottomNav from "./BottomNav"; 

export default function AppRootLayout() {
  const router = useRouter();
  const { isSignedIn, pending } = useAuth();

  const segments = useSegments();
  useEffect(() => {
    console.log("Current segments:", segments);
  }, [segments]);

  useEffect(() => {
    if (!isSignedIn && !pending) {
      router.replace("/(login)");
      console.log("Not Login");
    }
  }, [pending]);

  const topLevelScreens = ["index", "profile", "tracker", "achieve"];
  const isOnTopLevel = topLevelScreens.includes(segments[1] ?? "index");

  return (
    <ChapterProgressProvider>
      <View style={styles.container}>
        <Stack screenOptions={{ headerShown: false }}>
          <Stack.Screen name="index" />
          <Stack.Screen name="profile" />
          <Stack.Screen name="tracker" />
          <Stack.Screen name="achieve" />
          <Stack.Screen name="profile/settings" />
          <Stack.Screen name="chapter1" />
          <Stack.Screen name="chapter2" />
          <Stack.Screen name="chapter3" />
          <Stack.Screen name="chapter4" />
        </Stack>

        {isOnTopLevel && <BottomNav />}
      </View>
    </ChapterProgressProvider>
  );
}

const styles = StyleSheet.create({
  container: { paddingBottom: 20, flex: 1, backgroundColor: "#54B363" },
});