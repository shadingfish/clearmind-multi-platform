import { RelativePathString, useRouter } from "expo-router";
import React, { useEffect, useState } from "react";
import { Input, ScrollView, Text, View, YStack } from "tamagui";
//import { useChapterProgressContext } from "@/contexts/AuthContext";
import { ChapterNavigationButton } from "@/components/ChapterNavigateButton";
import RadioButtonGroup from "@/components/RadioButtonGroup";
import colors from "@/constants/colors";
import { useChapterProgressContext } from "@/contexts/AuthContext";

import CheckboxList from "@/components/CheckboxList";
import { hasEmptyValues } from "@/constants/helper";
import { useToastController } from "@tamagui/toast";

type SummaryQuestions = {
  question1: string;
  question2: string;
  question3: string[];
  question4: string[];
};

const Summary = () => {
  const router = useRouter();
  const toast = useToastController();
  const [questions, setQuestions] = useState<SummaryQuestions>({
    question1: "",
    question2: "",
    question3: [],
    question4: [],
  });

  const updateQuestion = (
    field: keyof SummaryQuestions,
    value: string | string[]
  ) => {
    setQuestions((prev) => ({ ...prev, [field]: value }));
  };

  const { updateChapterProgress, setCurrPage } = useChapterProgressContext();

  useEffect(() => {
    setCurrPage("summary");
  }, []);

  return (
    <ScrollView automaticallyAdjustKeyboardInsets={true}>
      <YStack margin={"$4"} gap={"$4"}>
        <Text fontSize={"$5"} lineHeight={20}>
          Keep in mind that you can allow difficult feelings to come and go
          without fighting and arguing with them. They only gain control if you
          permit it. Consider them like background noise, even if they seem loud
          at times.
        </Text>

        <Text fontSize={"$5"} lineHeight={20}>
          Following questions will help you reflect on this part:
        </Text>

        <YStack gap={"$1"}>
          <Text color={"#808080"} lineHeight={18}>
            1. Rate the effectiveness of this chapter in managing your
            procrastination tendencies on a scale of 1 to 5, where 1 represents
            “not effective at all” and 5 represents “extremely effective.”
          </Text>
          <RadioButtonGroup
            options={["1", "2", "3", "4", "5"]}
            question={questions.question1}
            setQuestion={(val) => updateQuestion("question1", val)}
          />
        </YStack>

        <YStack gap={"$3"}>
          <Text color={"#808080"} lineHeight={18}>
            2. Share your experience where our content helped you manage your
            procrastination tendency.
          </Text>
          <Input
            unstyled
            placeholder={"Input your answer for question2"}
            placeholderTextColor={colors.placeholder}
            borderColor={colors.border}
            borderWidth={3}
            borderRadius={7}
            size="$3"
            fontSize={"$5"}
            width={"100%"}
            alignSelf="center"
            value={questions.question2}
            onChangeText={(val) => updateQuestion("question2", val)}
          />
        </YStack>

        <YStack gap={"$3"}>
          <Text color={"#808080"} lineHeight={18}>
            3. Which part(s) do you think was useful? Select all that apply.
          </Text>
          <View>
            <CheckboxList
              id="3"
              onSelectionChange={(val) => updateQuestion("question3", val)}
            />
          </View>
        </YStack>

        <YStack gap={"$3"}>
          <Text color={"#808080"} lineHeight={18}>
            4. Which part(s) do you find interesting? Select all that apply.
          </Text>
          <View>
            <CheckboxList
              id="4"
              onSelectionChange={(val) => updateQuestion("question4", val)}
            />
          </View>
        </YStack>

        <ChapterNavigationButton
          prev={"/(app)/chapter4"}
          next={() => {
            if (hasEmptyValues(questions)) {
              toast.show("Empty Input");
            } else {
              updateChapterProgress("chapter4", "Summary");
              router.push("/(app)/chapter4/" as RelativePathString);
            }
          }}
        />
      </YStack>
    </ScrollView>
  );
};

export default Summary;
