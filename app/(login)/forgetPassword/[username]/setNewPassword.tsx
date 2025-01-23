import InputField from "@/components/InputField";
import colors from "@/constants/colors";
import { useAuth } from "@/hooks/useAuth";
import { useToastController } from "@tamagui/toast";
import { useLocalSearchParams, useRouter } from "expo-router";
import { useState } from "react";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { Text, ScrollView, YStack, Input, Button } from "tamagui";

export default function setNewPassword() {
  const router = useRouter();
  const toast = useToastController();
  const { updateUserPassword } = useAuth();

  const { bottom } = useSafeAreaInsets();
  const local = useLocalSearchParams<{ username: string }>();

  const [newPassword, setNewPassword] = useState("");
  const [reEnterPassword, setReEnterPassword] = useState("");
  const [error, setError] = useState(false);

  const onSubmit = () => {
    if (newPassword != reEnterPassword) {
      setError(true);
    } else {
      updateUserPassword(local.username, newPassword)
        .then(() => {
          toast.show("Password change successfully!");
          router.dismissAll();
          router.replace("/(app)");
        })
        .catch((error) => {
          console.error("Error updating data:", error);
        });
    }
  };

  return (
    <ScrollView
      flex={1}
      backgroundColor={colors.background}
      paddingBottom={bottom}
      automaticallyAdjustKeyboardInsets={true}
    >
      <YStack alignItems="flex-start" marginHorizontal="$6" marginTop="$15">
        <Text fontSize={"$5"} fontWeight={900}>
          Enter New Password:
        </Text>
        <Input
          width={"100%"}
          marginTop="$2"
          size="$4"
          borderColor={colors.border}
          borderWidth="$1"
          placeholder="new password"
          placeholderTextColor={colors.placeholder}
          value={newPassword}
          onChangeText={setNewPassword}
          onFocus={() => setError(false)}
        />
      </YStack>

      <YStack alignItems="flex-start" marginHorizontal="$6" marginTop="$10">
        <Text fontSize={"$5"} fontWeight={900}>
          Re-Enter New Password:
        </Text>
        <Input
          width={"100%"}
          marginTop="$2"
          size="$4"
          borderColor={error ? "$red10Light" : colors.border}
          borderWidth="$1"
          placeholder="re-enter password"
          placeholderTextColor={colors.placeholder}
          value={reEnterPassword}
          onChangeText={setReEnterPassword}
          onFocus={() => setError(false)}
        />
        {error && (
          <Text paddingStart="$1" paddingTop="$1" color="$red10Light">
            Password doesn't match, please retry.
          </Text>
        )}
      </YStack>

      <Button
        size="$4"
        borderRadius="$10"
        backgroundColor={colors.primary}
        alignSelf="center"
        width="80%"
        marginTop="$11"
        onPress={onSubmit}
      >
        <Text
          color="white"
          fontWeight="bold"
          fontSize="$8"
          paddingVertical="$1"
        >
          Done
        </Text>
      </Button>
    </ScrollView>
  );
}
