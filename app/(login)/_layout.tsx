// app/(login)/_layout.tsx

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
        name="forgetPassword/[username]"
        options={{
          title: "Forget Password",
        }}
      />
      <Stack.Screen
        name="register"
        options={{
          title: "Register",
        }}
      />
      <Stack.Screen
        name="registerAdditional"
        options={{
          title: "Register Additional",
        }}
      />
      <Stack.Screen
        name="chapter2" // Map to `app/index.tsx`
        options={{
          headerShown: false, // Navigation Optional
        }}
      />
    </Stack>
  );
}
