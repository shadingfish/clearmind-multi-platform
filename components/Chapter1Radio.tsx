// app/components/Chapter1Radio.tsx

import colors from "@/constants/colors";
import { useState } from "react";
import { RadioButton } from "react-native-paper";
import { YStack, Text, XStack } from "tamagui";

export interface Chapter1RadioProps {
  question: string;
  option1: string;
  option2: string;
  option3: string;
  correctOption: "first" | "second" | "third";
  correctText: string;
  incorrectText: string;
  hint?: string;
  onAnswer?: (isCorrect: boolean, selectedOptionIndex: number) => void;
}

export const Chapter1Radio: React.FC<Chapter1RadioProps> = ({
  question,
  option1,
  option2,
  option3,
  correctOption,
  correctText,
  incorrectText,
  hint,
  onAnswer,
}) => {
  const [showHint, setShowHint] = useState(false);
  const [checked, setChecked] = useState<string>("");
  const [feedback, setFeedback] = useState<string>("");
  const [feedbackColor, setFeedbackColor] = useState<string>(colors.incorrect);

  const handleValueChange = (value: string) => {
    setChecked(value);

    const isCorrect =
      (correctOption === "first" && value === "first") ||
      (correctOption === "second" && value === "second") ||
      (correctOption === "third" && value === "third");

    if (isCorrect) {
      setFeedback(correctText);
      setFeedbackColor(colors.correct);
    } else {
      setFeedback(incorrectText);
      setFeedbackColor(colors.incorrect);
    }

    if (onAnswer) {
      const selectedOptionIndex = ["first", "second", "third"].indexOf(value);
      onAnswer(isCorrect, selectedOptionIndex);
    }
  };

  return (
    <YStack marginBottom="$4">
      <Text fontSize="$5" color="#000000">
        {question}
      </Text>

      {hint && (
        <XStack
          borderWidth={1}
          borderColor={colors.hintColor}
          alignSelf="flex-start"
          padding="$2"
          borderRadius="$10"
          onPress={() => setShowHint(!showHint)}
          paddingHorizontal={showHint ? "$4" : "$2"}
          marginTop="$1"
        >
          <Text color={colors.hintColor}>
            <Text fontWeight={showHint ? "bold" : "400"}>
              {showHint ? "Hide Hint" : "Hint?"}
            </Text>
            {showHint ? ` ${hint}` : ""}
          </Text>
        </XStack>
      )}

      <RadioButton.Group onValueChange={handleValueChange} value={checked}>
        <YStack marginLeft="$4" gap="$1" marginTop="$2">
          <XStack alignItems="center" width="80%">
            <RadioButton.Android
              value="first"
              color={colors.primary}
              rippleColor="transparent"
              uncheckedColor={colors.primary}
            />
            <Text>{option1}</Text>
          </XStack>
          <XStack alignItems="center" width="80%">
            <RadioButton.Android
              value="second"
              color={colors.primary}
              rippleColor="transparent"
              uncheckedColor={colors.primary}
            />
            <Text>{option2}</Text>
          </XStack>
          <XStack alignItems="center" width="80%">
            <RadioButton.Android
              value="third"
              color={colors.primary}
              rippleColor="transparent"
              uncheckedColor={colors.primary}
            />
            <Text>{option3}</Text>
          </XStack>
        </YStack>
      </RadioButton.Group>

      {feedback !== "" && (
        <Text marginLeft="$4" color={feedbackColor} fontSize="$3">
          {feedback}
        </Text>
      )}
    </YStack>
  );
};
