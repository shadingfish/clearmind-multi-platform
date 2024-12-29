import React, { useState } from "react";
import { YStack, View, Text, Input, Button } from "tamagui";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { LogoImage } from "@/components/LogoImage";
import { Alert } from "react-native";

export default function ForgetPasswordPage() {
  const { top } = useSafeAreaInsets();
  const [securityQuestion1, setSecurityQuestion1] = useState("");
  const [securityQuestion2, setSecurityQuestion2] = useState("");

  return (
    <View flex={1} backgroundColor="$background" paddingTop={top}>
      <YStack marginTop="$8">
        <LogoImage size="sm" />
        <Text
          color="$primary"
          fontWeight="bold"
          fontSize="$9"
          alignSelf="center"
          paddingTop="$3"
        >
          Find Your Password
        </Text>
      </YStack>

      <YStack alignSelf="center" paddingTop="$10" width="85%">
        <Text fontSize="$5" color="$primary">
          Security Question 1:
        </Text>
        <Text
          fontSize="$7"
          color="$primary"
          fontWeight="semiBold"
          paddingStart="$3"
          paddingTop="$1"
        >
          What's the name of your pet?
        </Text>
        <Input
          marginTop="$2"
          size="$4"
          borderColor="$borderColor"
          borderWidth="$1"
          placeholder="Answer 1"
          value={securityQuestion1}
          onChangeText={setSecurityQuestion1}
        />
      </YStack>

      <YStack alignSelf="center" paddingTop="$6" width="85%">
        <Text fontSize="$5" color="$primary">
          Security Question 2:
        </Text>
        <Text
          fontSize="$7"
          color="$primary"
          fontWeight="semiBold"
          paddingStart="$3"
          paddingTop="$1"
        >
          What's the name of your pet?
        </Text>
        <Input
          marginTop="$2"
          size="$4"
          borderColor="$borderColor"
          borderWidth="$1"
          placeholder="Answer 2"
          value={securityQuestion2}
          onChangeText={setSecurityQuestion2}
        />
      </YStack>

      <Button
        size="$3"
        borderRadius="$10"
        backgroundColor="$primary"
        alignSelf="center"
        width="80%"
        marginTop="$5"
        onPress={() => Alert.alert("Submit")}
      >
        <Text
          color="$white1"
          fontWeight="bold"
          fontSize="$8"
          paddingVertical="$1"
        >
          SUBMIT
        </Text>
      </Button>
    </View>
  );
}
