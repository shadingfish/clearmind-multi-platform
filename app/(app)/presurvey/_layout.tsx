// app/(app)/_layout.tsx

import colors from "@/constants/colors";
import Ionicons from "@expo/vector-icons/Ionicons";
import { router, Stack } from "expo-router";
import React from "react";
import { Button } from "tamagui";

export default function RootLayout() {
  return (
    <Stack>
      <Stack.Screen
        name="content"
        options={{
          headerShown: false,
        }}
      />
    </Stack>
  );
}
