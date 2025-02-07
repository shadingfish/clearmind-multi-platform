// app/(app)/_layout.tsx

import colors from "@/constants/colors";
import { Chapter3Provider } from "@/contexts/Chapter3Context";
import Ionicons from "@expo/vector-icons/Ionicons";
import { router, Stack } from "expo-router";
import React from "react";
import { Button } from "tamagui";

export default function RootLayout() {
  return (
    <Chapter3Provider>
    <Stack>
      <Stack.Screen
        name="index"
        options={{
          title: "Part 3: Practice",
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
              <Ionicons name="chevron-back" size={24} color="black" />
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
    </Chapter3Provider>
  );
}
