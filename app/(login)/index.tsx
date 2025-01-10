// clear-mind/app/(login)/index.tsx
import React, { useState } from "react";
import {Dimensions} from "react-native";
import BackgroundImage from "../../components/BackgroundImage";
import { useAuth } from "../../hooks/useAuth";
import { useFonts } from "expo-font";
import { useRouter } from "expo-router";
import { Button, Input, YStack, XStack, Stack, Text} from "tamagui";
import { LogoImage } from "@/components/LogoImage";
import colors from "@/constants/colors";

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
    flex={1}
     >
      <BackgroundImage />
      <YStack
        flex={1}
        position="absolute"
        alignItems="center"
        justifyContent="center"
        width={screenWidth}
        >
          <Text 
            marginTop="$12"
            fontFamily="notoSans"
            fontSize="$8" 
            color="$primary"
            textAlign="center"
            width="100%"
          >
            Learn Acceptance and commitment therapy for free!
          </Text>

          {/* Logo */}
          <LogoImage />

          <Text 
            marginTop="$4"
            fontFamily="notoSans" 
            fontSize="$8" 
            fontWeight="bold" 
            color="$primary"
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
        bottom="$11"
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
            color={colors.secondary}
            fontWeight="bold"
            backgroundColor={colors.primary}
          >
            Sign In
          </Button>
          <XStack justifyContent="space-between">
            <Button
              size="$3"
              onPress={() => router.push("/register")}
              alignSelf="flex-start"
            >
              Create Account
            </Button>
            <Button
              size="$3"
              onPress={() => router.push("/forgetPassword")}
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