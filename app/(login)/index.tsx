// clear-mind/app/(login)/index.tsx
import React, { useState } from "react";
import { View, Alert } from "react-native";
import { CustomButton } from "../../components/CustomButton";
import BackgroundImage from "../../components/BackgroundImage";
import { useAuth } from "../../hooks/useAuth";
import { useFonts } from "expo-font";
import { useRouter } from "expo-router";
import { Input, YStack, XStack } from "tamagui";
import { LogoImage } from "@/components/LogoImage";

export default function MainScreen() {
  const router = useRouter();
  const { handleLogin } = useAuth();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [fontsLoaded] = useFonts({
    notoSans: require("../../assets/fonts/NotoSans-VariableFont_wdth,wght.ttf"),
  });

  if (!fontsLoaded) {
    return null;
  }

  return (
    <YStack 
    flex={1} >
      <BackgroundImage />
      <View
        style={{
          flex: 1,
          alignItems: "center",
          justifyContent: "center",
          paddingHorizontal: 16,
        }}
      >
        <LogoImage />
        <Input
          placeholder="Username"
          value={username}
          onChangeText={setUsername}
          color="$primary"
        />
        <Input
          placeholder="Password"
          color="$primary"
          value={password}
          onChangeText={setPassword}
          secureTextEntry
        />
        <CustomButton
          title="Sign In"
          onPress={() => handleLogin(username, password)}
        />
        <XStack paddingHorizontal="$10">
          <CustomButton
            title="Create Account"
            onPress={() => router.push("/register")}
            variant="link"
          />
          <CustomButton
            title="Forgot Password?"
            onPress={() => router.push("/(login)/register")}
            variant="link"
          />
        </XStack>
      </View>
    </YStack>
  );
}