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
      <Stack.Screen
        name="register"
        options={{
          headerShown: false, // Navigation Optional
        }}
      />
      <Stack.Screen
        name="forgetPassword"
        options={{
          headerShown: false, // Navigation Optional
        }}
      />
    </Stack>
  );
}
