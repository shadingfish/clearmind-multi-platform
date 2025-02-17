// app/(app)/_layout.tsx

import { auth } from "@/constants/firebaseConfig";
import { useAuth } from "@/hooks/useAuth";
import { Stack, useRouter } from "expo-router";
import { onAuthStateChanged } from "firebase/auth";
import { useEffect } from "react";
import { AuthProvider } from "@/contexts/AuthContext";

export default function AppRootLayout() {
  const router = useRouter();
  const { isSignedIn, pending } = useAuth();


  useEffect(() => {
    if (!isSignedIn && pending == false) {
      router.replace("/(login)");
      console.log("Not Login");
    }
  }, [pending]);

  return (
    <AuthProvider>
      <Stack>
        <Stack.Screen
          name="index" // Map to `app/index.tsx`
          options={{
            headerShown: false, // Navigation Optional
          }}
        />
        <Stack.Screen
        name="chapter1" // Map to `app/index.tsx`
        options={{
          headerShown: false, // Navigation Optional
        }}
      />
      <Stack.Screen
          name="chapter2" // Map to `app/index.tsx`
          options={{
            headerShown: false, // Navigation Optional
          }}
        />
      <Stack.Screen
          name="chapter3" // Map to `app/index.tsx`
          options={{
            headerShown: false, // Navigation Optional
          }}
        />
      <Stack.Screen
          name="chapter4" // Map to `app/index.tsx`
          options={{
            headerShown: false, // Navigation Optional
          }}
        />

      </Stack>
      
    </AuthProvider>
  );
}
