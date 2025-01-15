// clear-mind/app/(login)/index.tsx
import React, { useState } from "react";
import {Dimensions} from "react-native";
import { Alert } from "react-native";
import BackgroundImage from "../../components/BackgroundImage";
import { useAuth } from "../../hooks/useAuth";
import { useFonts } from "expo-font";
import { RelativePathString, useRouter } from "expo-router";
import { Button, Input, YStack, XStack, Stack, Text} from "tamagui";
import { LogoImage } from "@/components/LogoImage";
import colors from "@/constants/colors";
import { useToastController } from "@tamagui/toast";

const screenWidth = Dimensions.get("window").width;

export default function MainScreen() {
  const router = useRouter();
  const toast = useToastController();
  const { handleLogin, getUserSecurity } = useAuth();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [fontsLoaded] = useFonts({
    notoSans: require("../../assets/fonts/NotoSans-VariableFont_wdth,wght.ttf"),
  });

  if (!fontsLoaded) {
    return null;
  }

  const onPressForgetPassword = () => {
    if (username != "") {
      getUserSecurity(username).then((snapshot) => {
        if (snapshot.exists()) {
          router.push(`/forgetPassword/${username}` as RelativePathString);
        } else {
          toast.show("User does not exist. Please register.");
        }
      });
    } else {
      toast.show("Please input username");
    }
  };

  return (
    <YStack flex={1}>
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
        bottom="$10"
      >

        <Stack width="100%" maxWidth={300} gap="$2">
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
        <Button
          backgroundColor={colors.link}
          size="$1"
          onPress={() => router.push("/forgetPassword")}
          alignSelf="flex-end"
        >
          <Text fontSize={12} textDecorationLine="underline" color={colors.linkText}>
            Forgot Password?
          </Text>
        </Button>
        </Stack>

        <Stack width="100%" maxWidth={300} gap="$2">
        <Button
          size="$4"
          onPress={() => handleLogin(username, password)}
          color={colors.secondary}
          fontWeight="bold"
          backgroundColor={colors.primary}
          borderRadius={20}
          fontSize={16}
        >
            Sign In
          </Button>
          
          <XStack justifyContent="space-between">
            <Button
              size="$4"
              width="100%"
              onPress={() => router.push("/register")}
              borderRadius={20}
              fontSize={16}
            >
              Create Account
            </Button>
          </XStack>
        </Stack>
      </YStack>
    </YStack>
  );
}
