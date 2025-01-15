// app/(login)/forgetPassword/[username]/index.tsx

import React, { useEffect, useState } from "react";
import { YStack, ScrollView, Text, Input, Button, ZStack } from "tamagui";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { LogoImage } from "@/components/LogoImage";
import { DropdownComponent } from "@/components/Dropdown";
import colors from "@/constants/colors";
import { useLocalSearchParams, useRouter } from "expo-router";
import { useAuth } from "@/hooks/useAuth";
import LoadingOverlay from "@/components/LoadingOverlay";

function matchStringsIgnoreCase(str1: string, str2: string) {
  return str1.toLowerCase().trim() === str2.toLowerCase().trim();
}

export default function ForgetPasswordPage() {
  const router = useRouter();
  const { bottom } = useSafeAreaInsets();
  const local = useLocalSearchParams<{ username: string }>();
  const { getUserSecurity } = useAuth();

  const [isLoading, setIsLoading] = useState(false);

  type SecurityQuestion = {
    question1: string;
    question2: string;
    answer1: string;
    answer2: string;
    userAnswer1: string;
    userAnswer2: string;
  };

  type Error = {
    question1: boolean;
    question2: boolean;
  };

  const [secureQuestion, setSecureQuestion] = useState<SecurityQuestion>({
    question1: "",
    question2: "",
    answer1: "",
    answer2: "",
    userAnswer1: "",
    userAnswer2: "",
  });
  const [userError, setUserErrors] = useState<Error>({
    question1: false,
    question2: false,
  });

  const updateSecurityQuestion = (
    field: keyof SecurityQuestion,
    value: string
  ) => {
    setSecureQuestion((prev) => ({ ...prev, [field]: value }));
  };

  const updateErrors = (field: keyof Error, value: boolean) => {
    setUserErrors((prev) => ({ ...prev, [field]: value }));
  };

  useEffect(() => {
    setIsLoading(true);
    getUserSecurity(local.username)
      .then((snapshot) => {
        const userData = snapshot.val();
        updateSecurityQuestion("question1", userData.question1);
        updateSecurityQuestion("question2", userData.question2);
        updateSecurityQuestion("answer1", userData.answer1);
        updateSecurityQuestion("answer2", userData.answer2);
      })
      .catch((err) => {
        console.log(err);
      });
    setIsLoading(false);
  }, []);

  const onSubmit = () => {
    if (
      matchStringsIgnoreCase(
        secureQuestion.userAnswer1,
        secureQuestion.answer1
      ) &&
      matchStringsIgnoreCase(secureQuestion.userAnswer2, secureQuestion.answer2)
    ) {
      router.push("./setNewPassword", { relativeToDirectory: true });
    } else {
      if (
        !matchStringsIgnoreCase(
          secureQuestion.userAnswer1,
          secureQuestion.answer1
        )
      ) {
        updateErrors("question1", true);
      }
      if (
        !matchStringsIgnoreCase(
          secureQuestion.userAnswer2,
          secureQuestion.answer2
        )
      ) {
        updateErrors("question2", true);
      }
    }
  };

  return (
    <ZStack height="100%">
      {isLoading && <LoadingOverlay />}
      <ScrollView
        flex={1}
        backgroundColor={colors.background}
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

          <DropdownComponent
            items={items}
            value={secureQuestion.question1}
            setValue={(val) => updateSecurityQuestion("question1", val)}
          />

          <Input
            marginTop="$2"
            size="$4"
            borderColor={userError.question1 ? "$red10Light" : colors.border}
            borderWidth="$1"
            placeholder="Answer 1"
            value={secureQuestion.userAnswer1}
            onChangeText={(val) => updateSecurityQuestion("userAnswer1", val)}
            onFocus={() => {
              updateErrors("question1", false);
            }}
          />
          {userError.question1 && (
            <Text paddingStart="$1" paddingTop="$1" color="$red10Light">
              Question 1 incorrect
            </Text>
          )}
        </YStack>

        <YStack alignSelf="center" paddingTop="$6" width="85%">
          <Text fontSize="$5" color={colors.primary} paddingBottom="$2">
            Security Question 2:
          </Text>

          <DropdownComponent
            items={items}
            value={secureQuestion.question2}
            setValue={(val) => updateSecurityQuestion("question2", val)}
          />

          <Input
            marginTop="$2"
            size="$4"
            borderColor={userError.question2 ? "$red10Light" : colors.border}
            borderWidth="$1"
            placeholder="Answer 2"
            value={secureQuestion.userAnswer2}
            onChangeText={(val) => updateSecurityQuestion("userAnswer2", val)}
            onFocus={() => {
              updateErrors("question2", false);
            }}
          />
          {userError.question2 && (
            <Text paddingStart="$1" paddingTop="$1" color="$red10Light">
              Question 2 incorrect
            </Text>
          )}
        </YStack>

        <Button
          size="$3"
          borderRadius="$10"
          backgroundColor={colors.primary}
          alignSelf="center"
          width="80%"
          marginTop="$5"
          onPress={onSubmit}
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
    </ZStack>
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
