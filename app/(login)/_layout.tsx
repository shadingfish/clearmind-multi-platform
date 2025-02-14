import { Stack } from "expo-router";

export default function LoginLayout() {
  return (
    <Stack>
      <Stack.Screen
        name="index"
        options={{
          headerShown: false,
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
        name="forgetPassword"
        options={{
          title: "Forget Password",
        }}
      />
    </Stack>
  );
}
