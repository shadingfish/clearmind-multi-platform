// clear-mind/app/(login)/index.tsx
import React, { useState } from "react";
import { View, Alert, Dimensions } from "react-native";
import { CustomButton } from "../../components/CustomButton";
import BackgroundImage from "../../components/BackgroundImage";
import { useAuth } from "../../hooks/useAuth";
import { useFonts } from "expo-font";
import { useRouter } from "expo-router";
import { Button, Input, YStack, XStack } from "tamagui";
import { LogoImage } from "@/components/LogoImage";

const screenWidth = Dimensions.get("window").width;

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

      <YStack >
      <LogoImage />
      </YStack>
      
      <View
        style={{
          flex: 1,
          gap: 10,
          alignItems: "center",
          justifyContent: "flex-end",
          paddingHorizontal: 16,
          paddingBottom: 100, 
          width: screenWidth
        }}
      >
        <Input
          placeholder="Username"
          width="80%"
          value={username}
          onChangeText={setUsername}
          color="$primary"
        />
        <Input
          placeholder="Password"
          color="$primary"
          width="80%"
          value={password}
          onChangeText={setPassword}
          secureTextEntry
        />
        <CustomButton
          title="Sign In"
          onPress={() => handleLogin(username, password)}
        />
        <XStack paddingHorizontal="$10">
        <Button 
          themeInverse size="$3"
          onPress={() => router.push("/register")}
         >
        Create Account
        </Button>
        < Button
          themeInverse size="$3"
          onPress={() => router.push("/forgetPassword")}
        >
          Forgot Password?
        </Button>
        </XStack>
      </View>
    </YStack>
  );
}