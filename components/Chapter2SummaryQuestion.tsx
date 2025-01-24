import { YStack, Text, Input } from "tamagui";
import RadioButtonGroup from "./RadioButtonGroup";
import colors from "@/constants/colors";

interface SummaryQuestionProps {
  question: string;
  placeholder: string;
  useRadio?: boolean;
  value: string;
  onChange: (val: string) => void;
}

export const SummaryQuestion: React.FC<SummaryQuestionProps> = ({
  question,
  placeholder,
  useRadio = false,
  value,
  onChange,
}) => (
  <YStack gap={"$3"}>
    <Text color={"#808080"} lineHeight={18}>
      {question}
    </Text>
    {useRadio ? (
      <RadioButtonGroup
        options={["1", "2", "3", "4", "5"]}
        question={value}
        setQuestion={onChange}
      />
    ) : (
      <Input
        unstyled
        placeholder={placeholder}
        placeholderTextColor={colors.placeholder}
        borderColor={colors.border}
        borderWidth={3}
        borderRadius={7}
        size="$3"
        fontSize={"$5"}
        width={"100%"}
        alignSelf="center"
        value={value}
        onChangeText={onChange}
      />
    )}
  </YStack>
);
