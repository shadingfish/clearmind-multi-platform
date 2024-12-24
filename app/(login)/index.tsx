// app/screens/MainScreen.tsx
import React, { useState } from "react";
import { Alert } from "react-native";
import { Button, Input, Stack, Text, XStack, YStack } from "tamagui";
import LogoImage from "../../components/LogoImage";
import BackgroundImage from "../../components/BackgroundImage";
import { useAuth } from "../../hooks/useAuth";
import { useFonts } from "expo-font";
import colors from "../../constants/colors";

export default function MainScreen() {
  const { handleLogin } = useAuth();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [fontsLoaded] = useFonts({
    spacemono: require("../../assets/fonts/SpaceMono-Regular.ttf"),
  });

  if (!fontsLoaded) {
    return null;
  }

  return (
    <YStack flex={1} >
      <BackgroundImage />

      <YStack
        flex={1}
        position="absolute"
        alignItems="center"
        justifyContent="center"
        width="100%"
        >
          <Text 
            marginTop="$8"
            fontSize="$8" 
            fontWeight="bold" 
            color={colors.primary} 
            textAlign="center"
            width="100%"
          >
            Learn Acceptance and commitment therapy for free!
          </Text>

          {/* Logo */}
          <LogoImage />

          <Text 
            marginTop="$4"
            fontSize="$8" 
            fontWeight="bold" 
            color={colors.primary}
            textAlign="center"
            width="100%"
          >
            On-demand help for overcoming procrastination
        </Text>
      </YStack>

      <YStack
        flex={1}
        alignItems="center"
        justifyContent="flex-end"
        paddingHorizontal="$4"
        gap="$4"
        position="absolute"
        top={0}
        left={0}
        right={0}
        bottom="$10"
      >

        <Stack width="100%" maxWidth={300} space="$3">
          <Input
            placeholder="Username"
            value={username}
            onChangeText={setUsername}
          />
          <Input
            placeholder="Password"
            value={password}
            onChangeText={setPassword}
            secureTextEntry
          />
        </Stack>

        <Stack width="100%" maxWidth={300} space="$3">
          <Button
            size="$4"
            onPress={() => handleLogin(username, password)}
            theme="active"
            color={colors.secondary}
            fontWeight="bold"
            backgroundColor={colors.primary}
          >
            Sign In
          </Button>
          <XStack justifyContent="space-between">
            <Button
              size="$3"
              theme="alt2"
              onPress={() => Alert.alert("Register")}
              alignSelf="flex-start"
            >
              Create Account
            </Button>
            <Button
              size="$3"
              theme="alt2"
              onPress={() => Alert.alert("Forgot Password")}
              alignSelf="flex-end"
            >
              Forgot Password?
            </Button>
          </XStack>
        </Stack>
      </YStack>
    </YStack>
  );
}