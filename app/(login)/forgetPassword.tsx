import React, { useState } from "react";
import { YStack, ScrollView, Text, Input, Button } from "tamagui";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { LogoImage } from "@/components/LogoImage";
import { Alert } from "react-native";
import { DropdownComponent } from "@/components/Dropdown";
import colors from "@/constants/colors";

export default function ForgetPasswordPage() {
  const { top, bottom } = useSafeAreaInsets();
  const [securityQuestion1, setSecurityQuestion1] = useState("");
  const [securityQuestion2, setSecurityQuestion2] = useState("");

  return (
    <ScrollView
      flex={1}
      backgroundColor={colors.background}
      paddingTop={top}
      paddingBottom={bottom}
    >
      <YStack marginTop="$8">
        <LogoImage size="sm" />
        <Text
          color={colors.primary}
          fontWeight="bold"
          fontSize="$9"
          alignSelf="center"
          paddingTop="$3"
        >
          Find Your Password
        </Text>
      </YStack>

      <YStack alignSelf="center" paddingTop="$10" width="85%">
        <Text fontSize="$5" color={colors.primary} paddingBottom="$2">
          Security Question 1:
        </Text>

        <DropdownComponent items={items} />

        <Input
          marginTop="$2"
          size="$4"
          borderColor={colors.border}
          borderWidth="$1"
          placeholder="Answer 1"
          value={securityQuestion1}
          onChangeText={setSecurityQuestion1}
        />
      </YStack>

      <YStack alignSelf="center" paddingTop="$6" width="85%">
        <Text fontSize="$5" color={colors.primary} paddingBottom="$2">
          Security Question 2:
        </Text>

        <DropdownComponent items={items} />
        <Input
          marginTop="$2"
          size="$4"
          borderColor={colors.border}
          borderWidth="$1"
          placeholder="Answer 2"
          value={securityQuestion2}
          onChangeText={setSecurityQuestion2}
        />
      </YStack>

      <Button
        size="$3"
        borderRadius="$10"
        backgroundColor={colors.primary}
        alignSelf="center"
        width="80%"
        marginTop="$5"
        onPress={() => Alert.alert("Submit")}
      >
        <Text
          color="white"
          fontWeight="bold"
          fontSize="$8"
          paddingVertical="$1"
        >
          SUBMIT
        </Text>
      </Button>
    </ScrollView>
  );
}

const items: { name: string }[] = [
  { name: "In what city were you born?" },
  { name: "What is the name of your pet?" },
  { name: "What high school did you attend?" },
  { name: "What College/University did you attend?" },
  { name: "What is your major in school?" },
  { name: "What was your first car?" },
  { name: "What was your favorite food?" },
  { name: "What is your favorite color?" },
];
