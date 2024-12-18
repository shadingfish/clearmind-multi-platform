// app/_layout.tsx

import { Stack } from "expo-router";

export default function RootLayout() {
  return (
    <Stack>
      <Stack.Screen
        name="index" // Map to `app/index.tsx`
        options={{
          headerShown: false, // Navigation Optional
        }}
      />
    </Stack>
  );
}
