// app/(login)/_layout.tsx

import { router, Stack } from "expo-router";
import Ionicons from "@expo/vector-icons/Ionicons";
import { Button } from "tamagui";
import colors from "@/constants/colors";

export default function RootLayout() {
  return (
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
            <Button onPress={() => router.back()} unstyled>
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
  );
}
