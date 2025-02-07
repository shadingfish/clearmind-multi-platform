// app/(app)/_layout.tsx

import colors from "@/constants/colors";
import { Chapter2Provider } from "@/contexts/Chapter2Context";
import Ionicons from "@expo/vector-icons/Ionicons";
import { router, Stack } from "expo-router";
import React from "react";
import { Button } from "tamagui";

export default function RootLayout() {
  return (
    <Chapter2Provider>
    <Stack>
      <Stack.Screen
        name="index"
        options={{
          title: "Part 2: Understanding",
          headerTintColor: "#FFFFFF",
          headerTitleStyle: {
            fontWeight: "bold", // Bold font
            fontSize: 19, // Font size
          },
          headerStyle: {
            backgroundColor: colors.headerBackground,
          },
          headerLeft: () => (
            <Button onPress={() => router.dismissTo("/(app)")} unstyled>
              <Ionicons name="chevron-back" size={24} color="white" />
            </Button>
          ),
        }}
      />
      <Stack.Screen
        name="content"
        options={{
          headerShown: false,
        }}
      />
    </Stack>
    </Chapter2Provider>
  );
}
