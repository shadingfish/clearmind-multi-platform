// app/(app)/chapter1/content/summary.tsx

import React, { useEffect, useState } from "react";
import { View, ScrollView, Text, YStack } from "tamagui";
import { useRouter } from "expo-router";
import { useAuth } from "@/hooks/useAuth";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useToastController } from "@tamagui/toast";

import { SummaryQuestion } from "@/components/Chapter2SummaryQuestion"; 
// (或你也可以做一个通用组件 SummaryQuestion。只要能处理 useRadio = true/false 就行。)

import { ChapterNavigationButton } from "@/components/ChapterNavigateButton";
import { Chapter1 } from "@/constants/data";
import { hasEmptyValues } from "@/constants/helper";

import {
  getChapter1Summary,
  setChapter1Summary,
  updateChapter1Progress,
} from "@/hooks/Chapter1Activity";

// 定义问题 ID 映射到用户回答
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

  // 保存 4 个问题的答案
  const [questions, setQuestions] = useState<SummaryQuestions>({
    answer1: "",
    answer2: "",
    answer3: "",
    answer4: "",
  });

  // 回显：获取数据库里已保存的回答
  useEffect(() => {
    if (user && !pending) {
      getChapter1Summary(user.uid)
        .then((snapshot) => {
          if (snapshot.exists()) {
            const data = snapshot.val();
            // data 形如 { question1: "...", question2: "...", question3: "...", question4: "3" }
            setQuestions((prev) => ({
              ...prev,
              ...data,
            }));
          }
        })
        .catch((err) => console.log("Error get chapter1 summary:", err));
    }
  }, [user, pending]);

  // 更新某一道题的回答
  const updateQuestion = (field: keyof SummaryQuestions, value: string) => {
    setQuestions((prev) => ({ ...prev, [field]: value }));
  };

  // 点击「下一步」提交
  const handleSubmit = async () => {
    // 判断是否有空
    if (hasEmptyValues(questions)) {
      toast.show("Please fill out all answers before submitting.");
      return;
    }

    if (!user) {
      toast.show("No user found, please log in again.");
      return;
    }

    // 保存回答
    await setChapter1Summary(user.uid, questions);
    // 更新进度 "6_Summary" -> "1"
    await updateChapter1Progress(user.uid, "6_Summary");

    toast.show("Your answers have been saved!");
    // 跳转到 Chapter1 主目录或其他
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

        {/* 遍历 Chapter1.SummaryQuestionData */}
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

        {/* 底部导航按钮 */}
        <ChapterNavigationButton
          prev={"/(app)/chapter1/content/activity3"} // 例如 "How to Use the App" 
          next={handleSubmit}
        />
      </YStack>
    </ScrollView>
  );
}