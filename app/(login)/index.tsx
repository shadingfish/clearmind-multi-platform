// app/(login)/index.tsx

import { LogoImage } from "@/components/LogoImage";
import colors from "@/constants/colors";
import { useToastController } from "@tamagui/toast";
import { useFonts } from "expo-font";
import { useRouter } from "expo-router";
import React, { useState } from "react";
import { Dimensions } from "react-native";
import {
  Button,
  Input,
  ScrollView,
  Stack,
  Text,
  XStack,
  YStack,
} from "tamagui";
import BackgroundImage from "../../components/BackgroundImage";
import { useAuth } from "../../hooks/useAuth";

import { isValidEmail } from "@/constants/helper";
import { getUser } from "@/hooks/UserInfo";

const screenWidth = Dimensions.get("window").width;

export default function MainScreen() {
  const router = useRouter();
  const toast = useToastController();
  const { handleFirebaseLogin } = useAuth();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [fontsLoaded] = useFonts({
    notoSans: require("assets/fonts/NotoSans-VariableFont_wdth,wght.ttf"),
  });

  if (!fontsLoaded) {
    return null;
  }

  const onPressLogin = async () => {
    if (!username || !password) {
      toast.show("Please enter email and password");
      return;
    }

    let email = "";
    if (isValidEmail(username)) {
      email = username;
    } else {
      const user = await getUser(username);
      if (user.length != 1) {
        toast.show("User not exist.");
        return;
      } else {
        email = user[0]["email"];
      }
    }

    handleFirebaseLogin(email, password)
      .then(() => {
        router.replace("/(app)");
      })
      .catch((err) => {
        const error = err.code.replace("auth/", "");
        // update toast message
        if (error == "invalid-credential") {
          toast.show(`Login Error: Incorrect Password`);
        } else {
          toast.show(`Login Error: ${error}`);
        }
        console.log("Registration failed:", err);
      });
  };

  return (
    <YStack flex={1}>
      <BackgroundImage />
      <ScrollView flex={1} automaticallyAdjustKeyboardInsets={true}>
        <YStack alignItems="center" justifyContent="center" width={screenWidth}>
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
          alignItems="center"
          paddingHorizontal="$4"
          gap="$4"
          marginTop="$10"
        >
          <Stack width="100%" maxWidth={300} gap="$2">
            <Input
              placeholder="Username / Email"
              placeholderTextColor={colors.placeholder}
              value={username}
              onChangeText={setUsername}
              autoCapitalize="none"
            />
            <Input
              placeholder="Password"
              placeholderTextColor={colors.placeholder}
              value={password}
              onChangeText={setPassword}
              secureTextEntry
              autoCapitalize="none"
            />
            <Button
              backgroundColor={colors.link}
              size="$1"
              onPress={() => {}}
              alignSelf="flex-end"
            >
              <Text
                fontSize={12}
                textDecorationLine="underline"
                color={colors.linkText}
              >
                Forgot Username / Password?
              </Text>
            </Button>
          </Stack>

          <Stack width="100%" maxWidth={300} gap="$2">
            <Button
              size="$4"
              onPress={onPressLogin}
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
      </ScrollView>
    </YStack>
  );
}
