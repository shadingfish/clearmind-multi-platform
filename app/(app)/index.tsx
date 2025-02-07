import { auth } from "@/constants/firebaseConfig";
import { useRouter } from "expo-router";
import React from "react";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { Button, Image, Text, XStack, YStack } from "tamagui";

export default function Page1() {
  const router = useRouter();
  const { top } = useSafeAreaInsets();

  return (
    <YStack flex={1} paddingTop={top} gap={"$5"}>
      <Button onPress={() => router.push("/(app)/chapter2")}>
        <Text>Chapter 2</Text>
      </Button>

      <Button
        onPress={() => {
          auth.signOut();
          router.replace("/(login)");
        }}
      >
        <Text>Log Out</Text>
      </Button>
    </YStack>
  );
}
