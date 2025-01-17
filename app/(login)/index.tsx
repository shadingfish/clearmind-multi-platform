// app/(login)/index.tsx
import React, { useEffect, useState } from "react";
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
import auth from '@react-native-firebase/auth';
import {GoogleSignin} from '@react-native-google-signin/google-signin';

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

  useEffect(() => {
    GoogleSignin.configure({
      webClientId: '324251870640-gdslopcmn3vp58qv3me4f878sc04kj1r.apps.googleusercontent.com',
    });
  }, [])

  async function onGoogleButtonPress() {
    try {
      // Check if your device supports Google Play
      await GoogleSignin.hasPlayServices({ showPlayServicesUpdateDialog: true });
      // Get the users ID token
      const signInResult = await GoogleSignin.signIn();

      // Try the new style of google-sign in result, from v13+ of that module
      const idToken = signInResult.data?.idToken;

      if (!idToken) {
        throw new Error('ID token is not available');
      }

      console.log('idToken', idToken);
      Alert.alert("success google login");

      // Create a Google credential with the token
      const googleCredential = auth.GoogleAuthProvider.credential(idToken);

      // Sign-in the user with the credential
      return auth().signInWithCredential(googleCredential);
    }
    catch (e) {
      console.log('error signing in with google', e);
    }
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
          onPress={() => onPressForgetPassword()}
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
        <Button onPress={() => onGoogleButtonPress()}>
          Sign in with google
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
