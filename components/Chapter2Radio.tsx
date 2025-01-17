import colors from "@/constants/colors";
import { useEffect, useState } from "react";
import { RadioButton } from "react-native-paper";
import { YStack, Text, XStack } from "tamagui";

export interface Chapter2RadioProps {
  question: string;
  option1: string;
  option2: string;
  correctOption: "first" | "second";
  correctText: string;
  incorrectText: string;
}

export const Chapter2Radio: React.FC<Chapter2RadioProps & { id: number }> = ({
  id,
  question,
  option1,
  option2,
  correctOption,
  correctText,
  incorrectText,
}) => {
  const [showHint, setShowHint] = useState(false);
  const [checked, setChecked] = useState("");

  const [correct, setCorrect] = useState<Boolean | undefined>();

  useEffect(() => {
    if (checked != "") {
      setCorrect(checked == correctOption);
    }
  }, [checked]);
  return (
    <YStack key={id}>
      <Text>{question}</Text>

      <XStack
        borderWidth={1}
        borderColor={colors.hintColor}
        alignSelf="flex-start"
        padding={"$2"}
        borderRadius={"$10"}
        onPress={() => setShowHint(!showHint)}
        paddingHorizontal={showHint ? "$4" : "$2"}
        marginTop={"$1"}
      >
        <Text color={colors.hintColor}>
          <Text fontWeight={showHint ? "bold" : 400}>
            {showHint ? "Hint: " : "hints?"}
          </Text>
          {showHint
            ? "When you drive with your passengers, remember that you are the one steering the bus, not the passengers. Don’t let your passengers decide where the bus goes."
            : ""}
        </Text>
      </XStack>

      <YStack marginLeft={"$4"} gap={"$1"}>
        <XStack alignItems="center" width={"80%"}>
          <RadioButton.Android
            value="first"
            status={checked === "first" ? "checked" : "unchecked"}
            onPress={() => setChecked("first")}
            color={colors.primary}
          />
          <Text>{option1}</Text>
        </XStack>
        <XStack alignItems="center" width={"80%"}>
          <RadioButton.Android
            value="second"
            status={checked === "second" ? "checked" : "unchecked"}
            onPress={() => setChecked("second")}
            color={colors.primary}
          />
          <Text>{option2}</Text>
        </XStack>

        {checked != "" &&
          (correct ? (
            <Text marginHorizontal={"$2"} color={colors.correct}>
              {correctText}
            </Text>
          ) : (
            <Text marginHorizontal={"$2"} color={colors.incorrect}>
              {incorrectText}
            </Text>
          ))}
      </YStack>
    </YStack>
  );
};
