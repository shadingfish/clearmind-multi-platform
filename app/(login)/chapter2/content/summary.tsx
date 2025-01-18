// app/(login)/index.tsx
import React, { useState } from "react";

import { useRouter } from "expo-router";
import {
  Button,
  Input,
  YStack,
  XStack,
  Stack,
  Text,
  ScrollView,
  View,
  Checkbox,
  Paragraph,
} from "tamagui";
import colors from "@/constants/colors";
import { ChapterNavigationButton } from "@/components/ChapterNavigateButton";
import YoutubePlayer from "react-native-youtube-iframe";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { Dimensions } from "react-native";
import RadioGroup from "@/components/RadioGroup";
import RadioButtonGroup from "@/components/RadioButtonGroup";
import { SummaryQuestion } from "@/components/Chapter2SummaryQuestion";
import { Chapter2 } from "@/constants/data";

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

  return (
    <ScrollView>
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
          prev={() => {
            router.push("/(login)/chapter2/content/activity5");
          }}
          next={() => {
            router.push("/(login)/chapter2/content/activity3");
          }}
        />
      </YStack>
    </ScrollView>
  );
}
