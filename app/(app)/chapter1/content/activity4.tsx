// app/(app)/chapter1/content/activity4.tsx

import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  Alert,
  ActivityIndicator,
  ScrollView,
} from "react-native";
import { Chapter1 } from "@/constants/data";
import { useAuth } from "@/hooks/useAuth";
import { updateChapter1Progress } from "@/hooks/Chapter1Activity";
import { useRouter } from "expo-router";
import { ChapterNavigationButton } from "@/components/ChapterNavigateButton";
import { Chapter1Radio, Chapter1RadioProps } from "@/components/Chapter1Radio"; 
import { PrimaryButton } from "@/components/CustomButton";
import { YStack } from "tamagui";
import { useChapterProgressContext } from "@/contexts/AuthContext";
import { useChapter1Context } from "@/contexts/Chapter1Context";
import { doc, getDoc, setDoc } from "firebase/firestore";
import { database } from "@/constants/firebaseConfig";

const options = ["first", "second", "third"] as const;

export default function Activity4() {
  const router = useRouter();
  const { user, pending } = useAuth();
  const { chapterData, updateChapterData } = useChapter1Context();
  const { updateChapterProgress, setCurrPage } = useChapterProgressContext();
  const [loading, setLoading] = useState<boolean>(false);

  // Load user answers from context or Firestore
  const [answers, setAnswers] = useState<{ [key: string]: number }>(
    chapterData["activity4"] || {}
  );

  // Mark activity as visited & sync progress
  useEffect(() => {
    updateChapterProgress("chapter1", "activity4");
    setCurrPage("activity4");
    updateChapterData("activity4", answers);
  }, [answers]);

  // Load Firestore data if context is empty
  useEffect(() => {
    const loadUserInput = async () => {
      if (Object.keys(chapterData["activity4"] || {}).length === 0 && user) {
        const data = await getChapter1Activity4UserAnswers(user.uid);
        if (data) {
          setAnswers(data);
          updateChapterData("activity4", data);
        }
      }
    };

    loadUserInput();
  }, [user, chapterData]);

  // Handle answer selection
  const handleAnswer = (questionIndex: number, selectedOptionIndex: number) => {
    setAnswers((prev) => ({
      ...prev,
      [questionIndex.toString()]: selectedOptionIndex,
    }));
  };

  // Submit answers
  const handleSubmit = async () => {
    if (!user) {
      Alert.alert("Error", "User not authenticated.");
      return;
    }

    if (Object.keys(answers).length < Chapter1.RadioQuestionsActivity2_2.length) {
      Alert.alert("Incomplete", "Please answer all questions before submitting.");
      return;
    }

    setLoading(true);
    try {
      await updateChapter1Activity4UserAnswers(user.uid, answers);
      updateChapterData("activity4", answers);
      Alert.alert("Success", "Your answers have been saved.");
    } catch (error) {
      console.error("Error saving answers:", error);
      Alert.alert("Error", "There was an error saving your answers. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  /** 🔄 Fetch user's answers from Firestore */
  const getChapter1Activity4UserAnswers = async (userId: string): Promise<{ [key: string]: number } | null> => {
    try {
      const userRef = doc(database, "Chapter1", "Activity4", "users", userId);
      const snapshot = await getDoc(userRef);
      return snapshot.exists() ? (snapshot.data() as { [key: string]: number }) : null;
    } catch (err) {
      console.error("Error getting Activity4 user answers:", err);
      return null;
    }
  };

  /** 🔄 Save user's answers to Firestore */
  const updateChapter1Activity4UserAnswers = async (userId: string, answers: { [key: string]: number }) => {
    try {
      const userRef = doc(database, "Chapter1", "Activity4", "users", userId);
      await setDoc(userRef, answers, { merge: true });
      console.log("Activity4 answers saved successfully!");
    } catch (err) {
      console.error("Error updating Activity4 answers:", err);
    }
  };

  if (pending || loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#54B363" />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <Text style={styles.subHeader}>
          Now that you understand procrastination types, let's explore which resonates with you.
        </Text>

        {Chapter1.RadioQuestionsActivity2_2.map((question, index) => {
          const radioProps: Chapter1RadioProps = {
            question: question.question,
            option1: question.options[0],
            option2: question.options[1],
            option3: question.options[2],
            correctOption: options[question.correctOptionIndex],
            correctText: getCorrectText(index),
            incorrectText: getIncorrectText(index),
            hint: question.hint,
            onAnswer: (_, selectedOptionIndex) => handleAnswer(index, selectedOptionIndex),
          };

          return <Chapter1Radio key={index} {...radioProps} />;
        })}

        <View style={styles.submitButton}>
          <PrimaryButton title="Submit" onPress={handleSubmit} />
          {loading && <ActivityIndicator size="small" color="blue" />}
        </View>
      </ScrollView>

      <YStack style={styles.navigationButtonContainer} marginBottom="$2">
        <ChapterNavigationButton
          prev="/(app)/chapter1/content/activity3"
          next={() => {
            if (!user) return;
            updateChapterProgress("chapter1", "activity4");
            updateChapter1Progress(user.uid, "5_Activity4_Questions");
            router.push("/(app)/chapter1/content/activity5");
          }}
        />
      </YStack>
    </View>
  );
}

const getCorrectText = (index: number): string => {
  switch (index) {
    case 0:
      return "Good job! That is the correct one. Arousal procrastination often occurs because some individuals believe that the pressure that comes with imminent deadlines assists them in completing tasks productively. In Lynn’s case, she believes that the pressure of the impending deadline helps her to focus.";
    case 1:
      return "Good job! That is the correct one. Avoidant procrastination often happens because some individuals want to avoid negative emotions or situations associated with the tasks. In Tommy’s case, he procrastinated on his English essay because he perceived the class as boring.";
    case 2:
      return "Good job! That is the correct one. Avoidant procrastination often happens because some individuals want to avoid negative emotions or situations associated with the tasks. In Anna’s case, she procrastinated on seeking medical advice because of her anxiety about potential diagnoses.";
    case 3:
      return "Good job! That is the correct one. Avoidant procrastination often happens because some individuals want to avoid negative emotions or situations associated with the tasks. In Vincent’s case, he procrastinated on submitting his artwork because of his anxiety about potential criticism.";
    case 4:
      return "Good job! Decisional procrastinators often experience hesitation when making decisions about a task or behavior. In John’s case, his procrastination comes from the indecision about what action to take.";
    default:
      return "";
  }
};

const getIncorrectText = (index: number): string => {
  switch (index) {
    case 0:
      return "Not quite right! Avoidant procrastination often happens because some individuals want to avoid negative emotions or situations associated with the tasks. In Lynn’s case, she doesn’t seem to avoid her homework because of fear or negative feelings.";
    case 1:
      return "Not quite right! You are letting your challenging passengers control your journey, and you can't make progress towards your destination if you follow what your passengers want you to do.";
    case 2:
      return "Not quite right! Decisional procrastinators often experience hesitation when making decisions about a task or behavior. In Anna’s case, her procrastination is not because of indecision about what action to take, but because of her avoidance of potential negative outcomes.";
    case 3:
      return "Not quite right! Decisional procrastinators often experience hesitation when making decisions about a task or behavior. In Vincent’s case, his procrastination doesn’t come from indecision about what action to take, but comes from his avoidance of potential negative criticism.";
    case 4:
      return "Not quite right! Avoidant procrastination often happens because some individuals want to avoid negative emotions or situations associated with the tasks. In John’s case, his procrastination on declaring his college major doesn’t seem to be connected to difficult emotions.";
    default:
      return "";
  }
};

const styles = StyleSheet.create({
  container: {
    flex: 1, // Occupies the entire screen
    backgroundColor: "#FFFFFF", // Background color set to white
  },
  scrollContent: {
    padding: 16,
    paddingBottom: 100, // Space for fixed navigation buttons
  },
  header: {
    fontSize: 18,
    color: "#000000",
    marginBottom: 16,
    textAlign: "center",
  },
  subHeader: {
    fontSize: 18,
    color: "#000000",
    marginTop: 12,
    marginBottom: 30,
  },
  submitButton: {
    marginTop: 20,
    alignItems: "center",
  },
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  navigationButtonContainer: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    padding: 16,
    backgroundColor: "#FFFFFF", // Background matches the page
  },
});
