// app/(app)/index.tsx
import React, { useEffect, useState } from "react";

import { SummaryQuestion } from "@/components/Chapter2SummaryQuestion";
import { ChapterNavigationButton } from "@/components/ChapterNavigateButton";
import { Chapter2 } from "@/constants/data";
import { hasEmptyValues } from "@/constants/helper";
import { useAuth } from "@/hooks/useAuth";
import { useToastController } from "@tamagui/toast";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { ScrollView, Text, View, YStack } from "tamagui";
import { useRouter } from "expo-router";
// import {
//   getChapter2Summary,
//   setChapter2Summary,
//   updateChapter2Progress,
// } from "@/hooks/Chapter2Activity";
import { useChapterProgressContext } from "@/contexts/AuthContext";
import { useChapter2Context } from "@/contexts/Chapter2Context";

export type SummaryQuestions = {
  question1: string;
  question2: string;
  question3: string;
  question4: string;
};

export default function Summary() {
  const router = useRouter();
  const {chapterData, updateChapterData} = useChapter2Context();
  const [questions, setQuestions] = useState<SummaryQuestions>(chapterData["summary"] || {
    question1: "",
    question2: "",
    question3: "",
    question4: "",
  });

  const { bottom } = useSafeAreaInsets();

  //~~~JUST COPY PAST THIS INTO EACH ACTIVITY AND CHANGE THE CHAPTER AND TITLE ACCORDINGLY~~~
  const { updateChapterProgress } = useChapterProgressContext();

  useEffect(() => {
    updateChapterProgress("chapter2", "summary");
  }, []);
  //~~~END COPY PASTA~~~

  const updateQuestion = (field: keyof SummaryQuestions, value: string) => {
    setQuestions((prev) => ({ ...prev, [field]: value }));
  };

  useEffect(() => {
    updateChapterData("summary", questions);
  }, [questions])

  const toast = useToastController();

  const { user, pending } = useAuth();

  /* useEffect(() => {
    if (user) {
      getChapter2Summary(user.uid)
        .then((snapshot) => {
          if (snapshot.exists()) {
            const answer = snapshot.val();
            for (const [key, value] of Object.entries(answer)) {
              updateQuestion(key as keyof SummaryQuestions, value as string);
            }
          }
        })
        .catch((err) => console.log("Error get chapter 2 summary: " + err));
    }
  }, [pending]); */

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
          Simply, close your eyes and picture yourself driving a bus. Then, ask
          yourself: {"\n"} - Who are my passengers right now? {"\n"} - What are
          they persuading me to do? {"\n"} - What do I truly want to do?
        </Text>

        <Text fontSize={"$5"} lineHeight={20}>
          The following questions will help you reflect on this part:
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
          next={() => {
            if (hasEmptyValues(questions)) {
              toast.show("Empty Input");
            } else {
              //setChapter2Summary(user!.uid, questions);
              router.push("/(app)/chapter2");
              //updateChapter2Progress(user!.uid, "8_Summary");
            }
          }}
        />
      </YStack>
    </ScrollView>
  );
}
