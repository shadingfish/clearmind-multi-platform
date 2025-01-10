import React, { useEffect, useState } from "react";
import {
  YStack,
  ScrollView,
  Text,
  Input,
  Button,
  View,
  Theme,
  Overlay,
  Spinner,
  ZStack,
} from "tamagui";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { LogoImage } from "@/components/LogoImage";
import { DropdownComponent } from "@/components/Dropdown";
import colors from "@/constants/colors";
import { useLocalSearchParams } from "expo-router";
import { useAuth } from "@/hooks/useAuth";
import { ActivityIndicator } from "react-native";
import LoadingOverlay from "@/components/LoadingOverlay";

interface userSecurity {
  question1: string;
  question2: string;
  answer1: string;
  answer2: string;
}

function matchStringsIgnoreCase(str1: string, str2: string) {
  return str1.toLowerCase().trim() === str2.toLowerCase().trim();
}

export default function ForgetPasswordPage() {
  const { bottom } = useSafeAreaInsets();
  const local = useLocalSearchParams<{ username: string }>();
  const { getUserSecurity } = useAuth();

  const [isLoading, setIsLoading] = useState(false);

  const [securityQuestion1, setSecurityQuestion1] = useState("");
  const [securityAnswer1, setSecurityAnswer1] = useState("");
  const [q1Error, setQ1Error] = useState(false);

  const [securityQuestion2, setSecurityQuestion2] = useState("");
  const [securityAnswer2, setSecurityAnswer2] = useState("");
  const [q2Error, setQ2Error] = useState(false);

  const [user, setUser] = useState<userSecurity>();

  useEffect(() => {
    setIsLoading(true);
    getUserSecurity(local.username).then((snapshot) => {
      const userData = snapshot.val();
      setSecurityQuestion1(userData.question1);
      setSecurityQuestion2(userData.question2);
      setUser(userData);
      setIsLoading(false);
    });
  }, []);

  const onSubmit = () => {
    if (!user) {
      return;
    }

    if (
      matchStringsIgnoreCase(securityAnswer1, user.answer1) &&
      matchStringsIgnoreCase(securityAnswer2, user.answer2)
    ) {
      console.log("success");
    } else {
      if (!matchStringsIgnoreCase(securityAnswer1, user.answer1)) {
        setQ1Error(true);
        console.log(q1Error);
      }
      if (!matchStringsIgnoreCase(securityAnswer2, user.answer2)) {
        setQ2Error(true);
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
            value={securityQuestion1}
            setValue={setSecurityQuestion1}
          />

          <Input
            marginTop="$2"
            size="$4"
            borderColor={q1Error ? "$red10Light" : colors.border}
            borderWidth="$1"
            placeholder="Answer 1"
            value={securityAnswer1}
            onChangeText={setSecurityAnswer1}
            onFocus={() => {
              setQ1Error(false);
            }}
          />
          {q1Error && (
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
            value={securityQuestion2}
            setValue={setSecurityQuestion2}
          />

          <Input
            marginTop="$2"
            size="$4"
            borderColor={q2Error ? "$red10Light" : colors.border}
            borderWidth="$1"
            placeholder="Answer 2"
            value={securityAnswer2}
            onChangeText={setSecurityAnswer2}
            onFocus={() => {
              setQ2Error(false);
            }}
          />
          {q2Error && (
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
