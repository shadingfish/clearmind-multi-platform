// app/(app)/chapter1/content/summary.tsx

import React, { useEffect, useState } from "react";
import { View, ScrollView, Text, YStack } from "tamagui";
import { useRouter } from "expo-router";
import { useAuth } from "@/hooks/useAuth";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useToastController } from "@tamagui/toast";
import { ChapterNavigationButton } from "@/components/ChapterNavigateButton";
import { SummaryQuestion } from "@/components/Chapter2SummaryQuestion";
import { Chapter1 } from "@/constants/data";
import { hasEmptyValues } from "@/constants/helper";
import { useChapter1Context } from "@/contexts/Chapter1Context";
import { useChapterProgressContext } from "@/contexts/AuthContext";
import { doc, getDoc, setDoc } from "firebase/firestore";
import { database } from "@/constants/firebaseConfig";
import { updateChapter1Progress } from "@/hooks/Chapter1Activity";


// 定义问题数据结构
type SummaryQuestions = {
  answer1: string;
  answer2: string;
  answer3: string;
  answer4: string;
};

export default function Summary() {
  const router = useRouter();
  const toast = useToastController();
  const { user, pending } = useAuth();
  const { bottom } = useSafeAreaInsets();
  const { chapterData, updateChapterData } = useChapter1Context();
  const { updateChapterProgress, setCurrPage } = useChapterProgressContext();

  // **优先从 Context 获取数据**
  const [questions, setQuestions] = useState<SummaryQuestions>(
    chapterData["summary"] || {
      answer1: "",
      answer2: "",
      answer3: "",
      answer4: "",
    }
  );

  useEffect(() => {
    setCurrPage("summary");
  }, []);

  // **如果 Context 为空，则从 Firestore 读取**
  useEffect(() => {
    const loadUserInput = async () => {
      if (!chapterData["summary"]?.answer1 && user) {
        const data = await getChapter1Summary(user.uid);
        if (data) {
          setQuestions(data);
          updateChapterData("summary", data);
        }
      }
    };
    loadUserInput();
  }, [user]);

  // **同步数据到 Context**
  useEffect(() => {
    updateChapterData("summary", questions);
  }, [questions]);

  // **更新回答**
  const updateQuestion = (field: keyof SummaryQuestions, value: string) => {
    setQuestions((prev) => ({ ...prev, [field]: value }));
  };

  // **提交数据**
  const handleSubmit = async () => {
    if (hasEmptyValues(questions)) {
      toast.show("Please fill out all answers before submitting.");
      return;
    }

    if (!user) {
      toast.show("No user found, please log in again.");
      return;
    }

    try {
      await updateChapter1Summary(user.uid, questions);
      updateChapterData("summary", questions);
      updateChapter1Progress(user.uid, "6_Summary");
      updateChapterProgress("chapter1", "summary");

      toast.show("Your answers have been saved!");
      router.push("/(app)/chapter1");
    } catch (error) {
      console.error("Error saving summary:", error);
      toast.show("Error saving answers. Please try again.");
    }
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

        {/* 显示所有问题 */}
        {Chapter1.SummaryQuestionData.map((ele, i) => (
          <View key={i}>
            <SummaryQuestion
              question={ele.text}
              placeholder={ele.placeholder}
              value={questions[ele.ans as keyof SummaryQuestions]}
              onChange={(val) => updateQuestion(ele.ans as keyof SummaryQuestions, val)}
              useRadio={ele.useRadio}
            />
          </View>
        ))}

        <ChapterNavigationButton prev="/(app)/chapter1/content/activity5" next={handleSubmit} />
      </YStack>
    </ScrollView>
  );
}

// **获取用户的总结数据**
const getChapter1Summary = async (userId: string): Promise<SummaryQuestions | null> => {
  try {
    const summaryRef = doc(database, "Chapter1", "Summary", "users", userId);
    const snapshot = await getDoc(summaryRef);
    return snapshot.exists() ? (snapshot.data() as SummaryQuestions) : null;
  } catch (err) {
    console.error("Error getting Chapter1 summary:", err);
    return null;
  }
};

// **保存用户的总结数据**
const updateChapter1Summary = async (userId: string, data: SummaryQuestions) => {
  try {
    const summaryRef = doc(database, "Chapter1", "Summary", "users", userId);
    await setDoc(summaryRef, data, { merge: true });
    console.log("Chapter1 Summary updated successfully!");
  } catch (err) {
    console.error("Error updating Chapter1 Summary:", err);
  }
};