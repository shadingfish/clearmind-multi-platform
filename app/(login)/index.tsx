// app/(app)/index.tsx
import { LogoImage } from "@/components/LogoImage";
import colors from "@/constants/colors";
import { useToastController } from "@tamagui/toast";
import { useFonts } from "expo-font";
import { RelativePathString, useRouter } from "expo-router";
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

import { auth } from "@/constants/firebaseConfig";
import { isValidUsername } from "@/constants/helper";
import { sendPasswordResetEmail } from "firebase/auth";

const screenWidth = Dimensions.get("window").width;

export default function MainScreen() {
  const router = useRouter();
  const toast = useToastController();
  const {
    getUserInfo,
    handleLogin,
    handleFirebaseLogin,
    handleFirebaseRegister,
    getUserSecurity,
  } = useAuth();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [fontsLoaded] = useFonts({
    notoSans: require("assets/fonts/NotoSans-VariableFont_wdth,wght.ttf"),
  });

  if (!fontsLoaded) {
    return null;
  }

  const onPressForgetPassword = () => {
    if (username != "") {
      if (isValidUsername(username)) {
        getUserInfo(username).then((snapshot) => {
          if (snapshot.exists()) {
            const user = snapshot.val();

            if (user.email) {
              sendPasswordResetEmail(auth, user.email)
                .then(() => {
                  toast.show("Password reset email sent!");
                })
                .catch((error) => {
                  console.error("Error sending password reset email:", error);
                });
            } else {
              router.push(`/forgetPassword/${username}` as RelativePathString);
            }
          } else {
            toast.show("User does not exist.");
          }
        });
      } else {
        toast.show("Please input valid username");
      }
    } else {
      toast.show("Please input username or email");
    }
  };

  const onPressLogin = () => {
    try {
      handleFirebaseLogin(username, password)
        .then(() => {
          router.replace("/(app)");
        })
        .catch((err) => {
          console.error("Registration failed:", err.message);
        });
    } catch (err) {
      if (err instanceof Error) {
        toast.show(err.message);
      } else {
        console.log(err);
      }
    }
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
              placeholder="Username"
              placeholderTextColor={colors.placeholder}
              value={username}
              onChangeText={setUsername}
            />
            <Input
              placeholder="Password"
              placeholderTextColor={colors.placeholder}
              value={password}
              onChangeText={setPassword}
              secureTextEntry
            />
            <Button
              backgroundColor={colors.link}
              size="$1"
              onPress={() => onPressForgetPassword()}
              alignSelf="flex-end"
            >
              <Text
                fontSize={12}
                textDecorationLine="underline"
                color={colors.linkText}
              >
                Forgot Password?
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
