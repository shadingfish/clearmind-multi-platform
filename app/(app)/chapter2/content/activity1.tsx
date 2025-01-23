// app/(app)/index.tsx
import { Check as CheckIcon } from "@tamagui/lucide-icons";
import React, { useState } from "react";

import { ChapterNavigationButton } from "@/components/ChapterNavigateButton";
import { CheckboxWithLabel } from "@/components/CheckboxWithLabel";
import colors from "@/constants/colors";
import { useRouter } from "expo-router";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import {
  Button,
  Checkbox,
  Input,
  ScrollView,
  Text,
  View,
  XStack,
  YStack,
} from "tamagui";

export default function Activity1() {
  const router = useRouter();
  const { bottom } = useSafeAreaInsets();
  const [topChoice, setTopChoice] = useState("undefined");
  const [checkboxes, setCheckboxes] = useState([
    { id: "1", label: "Sadness", checked: false },
    { id: "2", label: "Anger", checked: false },
    { id: "3", label: "Loneliness", checked: false },
    { id: "4", label: "Anxiety", checked: false },
    { id: "5", label: "Overwhelm", checked: false },
    { id: "6", label: "Doubt", checked: false },
    { id: "7", label: "Distraction", checked: false },
  ]);
  const [checkboxOther, setCheckboxOther] = useState(false);
  const [otherInput, setOtherInput] = useState("");

  const toggleCheckbox = (id: string) => {
    setCheckboxes((prevCheckboxes) =>
      prevCheckboxes.map((checkbox) =>
        checkbox.id === id
          ? { ...checkbox, checked: !checkbox.checked }
          : checkbox
      )
    );
  };

  const getCheckedLabels = () => {
    const checkboxList = checkboxes
      .filter((checkbox) => checkbox.checked)
      .map((checkbox) => checkbox.label);

    if (checkboxOther) {
      return { original: checkboxList, other: otherInput };
    }
    return { original: checkboxList };
  };

  return (
    <ScrollView automaticallyAdjustKeyboardInsets={true}>
      <YStack margin={"$4"} gap={"$4"} paddingBottom={bottom}>
        <Text fontSize={"$5"} lineHeight={20}>
          One reason people often procrastinate and choose not to follow their
          values is that challenging thoughts and feelings can get in the way.
          What kind of challenging thoughts and feelings have counteracted your
          efforts toward your top value [{topChoice}] mentioned in Part 1?
        </Text>

        <View>
          <Text fontSize={"$5"} lineHeight={20}>
            Take a moment to reflect on your recent experiences with
            procrastination. Identify up to three of the most challenging
            thoughts and feelings that arise when you think about those
            experiences.
          </Text>

          <YStack gap={"$3"} marginLeft={"$5"} marginTop={"$4"}>
            {checkboxes.map((checkbox) => (
              <CheckboxWithLabel
                id={checkbox.id}
                key={checkbox.id}
                size={"$3"}
                label={checkbox.label}
                checked={checkbox.checked}
                onCheckedChange={() => toggleCheckbox(checkbox.id)}
              />
            ))}

            <XStack alignItems="center" gap="$3">
              <Checkbox
                id={"8"}
                key={"8"}
                size={"$3"}
                borderColor={"black"}
                backgroundColor="#ffffff"
                checked={checkboxOther}
                onCheckedChange={() => {
                  setCheckboxOther(!checkboxOther);
                }}
              >
                <Checkbox.Indicator>
                  <CheckIcon />
                </Checkbox.Indicator>
              </Checkbox>

              <Text fontSize={"$5"}>Other:</Text>
              <Input
                unstyled
                placeholder="Input here"
                placeholderTextColor={colors.placeholder}
                borderColor={colors.border}
                borderWidth={3}
                borderRadius={7}
                size={"$2"}
                width="60%"
                disabled={!checkboxOther}
                value={otherInput}
                onChangeText={setOtherInput}
              />
            </XStack>

            <Button
              size="$4"
              borderRadius="$1"
              backgroundColor={colors.headerBackground}
              alignSelf="center"
              width={"40%"}
              onPress={() => {
                console.log(getCheckedLabels());
              }}
            >
              SUBMIT
            </Button>
          </YStack>
        </View>

        <Text fontSize={"$5"} lineHeight={20} marginBottom={"$4"}>
          Here are some common challenging thoughts that other app users have
          encountered:
        </Text>

        <ChapterNavigationButton
          prev={() => {
            router.push("/(app)/chapter2/content/opening");
          }}
          next={() => {
            router.push("/(app)/chapter2/content/activity2");
          }}
        />
      </YStack>
    </ScrollView>
  );
}
