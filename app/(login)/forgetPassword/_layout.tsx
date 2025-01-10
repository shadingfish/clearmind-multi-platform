import { Stack } from "expo-router";

export default function RootLayout() {
  return (
    <Stack>
      <Stack.Screen
        name="[username]" // Map to `app/index.tsx`
        options={{
          headerShown: false, // Navigation Optional
        }}
      />
    </Stack>
  );
}
