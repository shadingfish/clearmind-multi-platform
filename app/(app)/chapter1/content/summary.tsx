// app/(app)/chapter1/content/summary.tsx

import React, { useEffect, useState } from "react";
import { View, ScrollView, Text, YStack } from "tamagui";
import { useRouter } from "expo-router";
import { useAuth } from "@/hooks/useAuth";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useToastController } from "@tamagui/toast";

import { SummaryQuestion } from "@/components/Chapter2SummaryQuestion"; 

import { ChapterNavigationButton } from "@/components/ChapterNavigateButton";
import { Chapter1 } from "@/constants/data";
import { hasEmptyValues } from "@/constants/helper";

import {
  getChapter1Summary,
  setChapter1Summary,
  updateChapter1Progress,
} from "@/hooks/Chapter1Activity";
import { useChapterProgressContext } from "@/contexts/AuthContext";
//import { useAuthContext } from "@/contexts/AuthContext";

export type SummaryQuestions = {
  answer1: string;
  answer2: string;
  answer3: string;
  answer4: string; // for radio
};

export default function Summary() {
  const router = useRouter();
  const toast = useToastController();
  const { user, pending } = useAuth();
  const { bottom } = useSafeAreaInsets();
  

  const {updateChapterProgress, setCurrPage} = useChapterProgressContext();

  useEffect(() => {
    setCurrPage('summary');
  }, [])

  const [questions, setQuestions] = useState<SummaryQuestions>({
    answer1: "",
    answer2: "",
    answer3: "",
    answer4: "",
  });

  useEffect(() => {
    if (user && !pending) {
      getChapter1Summary(user.uid)
        .then((data) => {
          if (data) {
            setQuestions((prev) => ({
              ...prev,
              ...data,
            }));
          }
        })
        .catch((err) => console.log("Error getting chapter1 summary:", err));
    }
  }, [user, pending]);

  const updateQuestion = (field: keyof SummaryQuestions, value: string) => {
    setQuestions((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async () => {
    if (hasEmptyValues(questions)) {
      toast.show("Please fill out all answers before submitting.");
      return;
    }

    if (!user) {
      toast.show("No user found, please log in again.");
      return;
    }

    await setChapter1Summary(user.uid, questions);
    await updateChapter1Progress(user.uid, "6_Summary");

    toast.show("Your answers have been saved!");

    updateChapterProgress("chapter1", "summary");

    router.push("/(app)/chapter1");
  };

  return (
    <ScrollView style={{ flex: 1 }} contentContainerStyle={{ paddingBottom: bottom }}>
      <YStack margin="$4" gap="$4">
        <Text fontSize="$5" lineHeight={20}>
          In this part, we explored various procrastination tendencies and the reasons behind 
          such behaviors, focusing on how they relate to your life priorities and values.
        </Text>

        <Text fontSize="$5" lineHeight={20}>
          Following questions will help you reflect on this chapter:
        </Text>

        {Chapter1.SummaryQuestionData.map((ele, i) => {
          return (
            <View key={i}>
              <SummaryQuestion
                question={ele.text}
                placeholder={ele.placeholder}
                value={questions[ele.ans as keyof SummaryQuestions]}
                onChange={(val) =>
                  updateQuestion(ele.ans as keyof SummaryQuestions, val)
                }
                useRadio={ele.useRadio}
              />
            </View>
          );
        })}

        <ChapterNavigationButton
          prev={"/(app)/chapter1/content/activity3"}
          next={handleSubmit}
        />
      </YStack>
    </ScrollView>
  );
}