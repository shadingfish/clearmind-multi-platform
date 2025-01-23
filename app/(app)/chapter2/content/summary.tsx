// app/(app)/index.tsx
import React, { useState } from "react";

import { SummaryQuestion } from "@/components/Chapter2SummaryQuestion";
import { ChapterNavigationButton } from "@/components/ChapterNavigateButton";
import { Chapter2 } from "@/constants/data";
import { hasEmptyValues } from "@/constants/helper";
import { useToastController } from "@tamagui/toast";
import { useRouter } from "expo-router";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { ScrollView, Text, View, YStack } from "tamagui";
import { useAuth } from "@/hooks/useAuth";

export type SummaryQuestions = {
  question1: string;
  question2: string;
  question3: string;
  question4: string;
};

export default function Summary() {
  const router = useRouter();
  const [questions, setQuestions] = useState<SummaryQuestions>({
    question1: "",
    question2: "",
    question3: "",
    question4: "",
  });

  const { bottom } = useSafeAreaInsets();

  const updateQuestion = (field: keyof SummaryQuestions, value: string) => {
    setQuestions((prev) => ({ ...prev, [field]: value }));
  };

  const toast = useToastController();

  const { user, pending } = useAuth();

  if (pending) {
    return null;
  }

  return (
    <ScrollView automaticallyAdjustKeyboardInsets={true}>
      <YStack margin={"$4"} gap={"$4"} paddingBottom={bottom}>
        <Text fontSize={"$5"} lineHeight={20}>
          In this part, we explored the “Passengers on the Bus,” a metaphor
          commonly used in ACT practice. It introduces a new way of handling
          challenging thoughts and feelings – acknowledging them with kindness
          rather than engaging in a fight or argument. You can practice this
          exercise whenever you need to make a decision.
        </Text>

        <Text fontSize={"$5"} lineHeight={20}>
          Simply, close your eyes and picture yourself driving a bus. Ask
          yourself: {"\n"} - Who are my passengers right now? {"\n"} - What are
          they persuading me to do? {"\n"} - What do I truly want to do?
        </Text>

        <Text fontSize={"$5"} lineHeight={20}>
          Following questions will help you reflect on this chapter:
        </Text>

        {Chapter2.SummaryQuestionData.map((ele, i) => {
          return (
            <View key={i}>
              <SummaryQuestion
                question={ele.text}
                placeholder={ele.placeholder}
                value={questions[ele.id as keyof SummaryQuestions]}
                onChange={(val) =>
                  updateQuestion(ele.id as keyof SummaryQuestions, val)
                }
                useRadio={ele.useRadio}
              />
            </View>
          );
        })}

        <ChapterNavigationButton
          prev={"/(app)/chapter2/content/activity5"}
          next={"/(app)/chapter2/content/chapter2"}
          progress_index="8_Summary"
          username={user?.uid!}
          canGoNext={!hasEmptyValues(questions)}
          failAction={() => {
            toast.show("Empty Input");
          }}
        />
      </YStack>
    </ScrollView>
  );
}
