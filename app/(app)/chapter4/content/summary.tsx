import { ChapterNavigationButton } from "@/components/ChapterNavigateButton";
import RadioButtonGroup from "@/components/RadioButtonGroup";
import colors from "@/constants/colors";
import { useChapterProgressContext } from "@/contexts/AuthContext";
import { RelativePathString, useRouter } from "expo-router";
import React, { useEffect, useState } from "react";
import { Input, ScrollView, Text, View, YStack } from "tamagui";

import CheckboxList from "@/components/CheckboxList";
import { hasEmptyValues } from "@/constants/helper";
import {
  getChapter4Summary,
  setChapter4Summary,
  updateChapter4Progress,
} from "@/hooks/Chapter4Activity";
import { useAuth } from "@/hooks/useAuth";
import { useToastController } from "@tamagui/toast";

export type Chp4SummaryQuestions = {
  question1: string;
  question2: string;
  question3: string[];
  question4: string[];
};

const Summary = () => {
  const router = useRouter();
  const toast = useToastController();
  const [questions, setQuestions] = useState<Chp4SummaryQuestions>({
    question1: "",
    question2: "",
    question3: [],
    question4: [],
  });

  const updateQuestion = (
    field: keyof Chp4SummaryQuestions,
    value: string | string[]
  ) => {
    setQuestions((prev) => ({ ...prev, [field]: value }));
  };

  const { updateChapterProgress, setCurrPage } = useChapterProgressContext();
  const { user, pending } = useAuth();

  useEffect(() => {
    setCurrPage("summary");
  }, []);

  useEffect(() => {
    if (user) {
      getChapter4Summary(user.uid)
        .then((snapshot) => {
          if (snapshot.exists()) {
            const answer = snapshot.data();
            console.log(answer);
            for (const [key, value] of Object.entries(answer)) {
              console.log(key, value);
              updateQuestion(
                key as keyof Chp4SummaryQuestions,
                value as string
              );
            }
          }
        })
        .catch((err) => console.log("Error get chapter 4 activity3: " + err));
    }
  }, [pending]);

  return (
    <ScrollView automaticallyAdjustKeyboardInsets={true}>
      <YStack margin={"$4"} gap={"$4"}>
        <Text fontSize={"$5"} lineHeight={20}>
          Before we unlock the goal tracker feature, let’s summarize the key
          points covered in this section. In this part, we integrated
          goal-setting principles with Acceptance and Commitment Therapy. We
          also revisited key concepts from previous sections, including coping
          with challenging passengers and strategies for staying focused.
        </Text>

        <Text fontSize={"$5"} lineHeight={20}>
          Following questions will help you reflect on this part:
        </Text>

        <YStack gap={"$1"}>
          <Text color={"#808080"} lineHeight={18}>
            1. Rate the effectiveness of this part in managing your
            procrastination on a scale of 1 to 5, where 1 is "not effective" and
            5 is "extremely effective."
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
            placeholder={""}
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
              value={questions.question3}
              onChange={(val) => updateQuestion("question3", val)}
            />
          </View>
        </YStack>

        <YStack gap={"$3"}>
          <Text color={"#808080"} lineHeight={18}>
            4. Which part(s) do you find interesting? Select all that apply.
          </Text>
          <View>
            <CheckboxList
              value={questions.question4}
              onChange={(val) => updateQuestion("question4", val)}
            />
          </View>
        </YStack>

        <ChapterNavigationButton
          prev={"/(app)/chapter4/content/activity4"}
          next={() => {
            if (hasEmptyValues(questions)) {
              toast.show("Empty Input");
            } else {
              updateChapter4Progress(user!.uid, "6_Summary");
              updateChapterProgress("chapter4", "summary");
              setChapter4Summary(user!.uid, questions);
              router.push(
                "(app)/chapter4/content/activity5" as RelativePathString
              );
            }
          }}
        />
      </YStack>
    </ScrollView>
  );
};

export default Summary;
