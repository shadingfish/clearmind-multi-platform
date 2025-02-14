// app/(app)/forgetPassword/[username]/index.tsx

import LoadingOverlay from "@/components/LoadingOverlay";
import { LogoImage } from "@/components/LogoImage";
import colors from "@/constants/colors";
import { auth } from "@/constants/firebaseConfig";
import { getUser } from "@/hooks/UserInfo";
import Fontisto from "@expo/vector-icons/Fontisto";
import { useToastController } from "@tamagui/toast";
import { useRouter } from "expo-router";
import { sendPasswordResetEmail } from "firebase/auth";
import React, { useState } from "react";
import { Linking } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import {
  Anchor,
  Button,
  Input,
  ScrollView,
  Text,
  YStack,
  ZStack,
} from "tamagui";

export default function ForgetPasswordPage() {
  const router = useRouter();
  const toast = useToastController();

  const { bottom } = useSafeAreaInsets();
  const [popup, setPopup] = useState(false);
  const [email, setEmail] = useState("");

  const onPressRetrieve = async () => {
    if (!email) {
      toast.show("Please enter email");
      return;
    }
    const user = await getUser("", email);
    if (user.length != 1) {
      toast.show("User not found!");
      return;
    } else {
      console.log("found");
      sendPasswordResetEmail(auth, email)
        .then(() => {
          setPopup(true);
        })
        .catch((error) => {
          console.error("Error sending password reset email:", error);
        });
    }
  };

  const handleEmailPress = () => {
    Linking.openURL("mailto:clearminducsd@gmail.com");
  };

  return (
    <ZStack height="100%">
      {popup && (
        <LoadingOverlay>
          <YStack
            marginHorizontal={"$7"}
            backgroundColor={colors.primary}
            padding={"$6"}
            paddingTop={"$4"}
            borderRadius={"$8"}
          >
            <Button
              unstyled
              marginBottom={"$5"}
              alignSelf="flex-end"
              onPress={() => {
                router.back();
              }}
            >
              <Fontisto name="close-a" size={20} color="white" />
            </Button>
            <Text color={"white"} fontSize={"$5"}>
              We will send a password reset email to your registered email
              address. After resetting, you can sign in using either your email
              or username.
            </Text>
            <Text color={"white"} fontSize={"$5"} marginTop={"$5"}>
              Please allow a few minutes for the email to appear.
            </Text>
          </YStack>
        </LoadingOverlay>
      )}

      <ScrollView
        automaticallyAdjustKeyboardInsets={true}
        flex={1}
        backgroundColor={"$white0"}
        paddingBottom={bottom}
        marginHorizontal={"$5"}
      >
        <YStack marginTop="$5">
          <LogoImage size="sm" />
          <Text
            color={colors.primary}
            fontWeight="bold"
            fontSize={35}
            alignSelf="center"
            paddingTop="$3"
          >
            Find Password
          </Text>
        </YStack>

        <Text
          marginTop={"$5"}
          lineHeight={"$3"}
          fontSize={"$5"}
          color={colors.primary}
        >
          ** If you forgot your registered email and username, please contact us
          through{" "}
          <Text onPress={handleEmailPress} textDecorationLine="underline">
            clearminducsd@gmail.com
          </Text>{" "}
          so we can assist you.
        </Text>

        <YStack marginTop={"$7"}>
          <Text color={colors.primary}>Registered Email</Text>
          <Input
            backgroundColor="transparent"
            marginTop="$2"
            size="$4"
            borderColor={colors.border}
            borderWidth="$1"
            borderRadius={"$6"}
            placeholder="Registered Email"
            value={email}
            onChangeText={setEmail}
          />
        </YStack>

        <Button
          size="$4"
          borderRadius="$10"
          backgroundColor={colors.primary}
          alignSelf="center"
          width="100%"
          marginTop="$7"
          onPress={onPressRetrieve}
        >
          <Text color="white" fontWeight="bold" fontSize="$8">
            Retrieve
          </Text>
        </Button>
      </ScrollView>
    </ZStack>
  );
}
