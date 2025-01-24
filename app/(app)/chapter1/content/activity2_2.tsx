// app/(app)/chapter1/content/activity2_2.tsx

import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  Button,
  Alert,
  ActivityIndicator,
  ScrollView,
} from "react-native";
import { Chapter1 } from "@/constants/data";
import { useAuth } from "@/hooks/useAuth";
import {
  updateChapter1Activity2_2,
  getChapter1Activity2_2UserInput,
  updateChapter1Progress,
} from "@/hooks/Chapter1Activity";
import { useRouter } from "expo-router";
import { ChapterNavigationButton } from "@/components/ChapterNavigateButton";
import colors from "@/constants/colors";
import { Chapter1Radio, Chapter1RadioProps } from "@/components/Chapter1Radio"; 
import { PrimaryButton } from "@/components/CustomButton";
import { YStack } from "tamagui";

export default function Activity2_2() {
  const router = useRouter();
  const { user, pending } = useAuth();
  const [answers, setAnswers] = useState<{ [key: string]: number }>({});
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    if (user) {
      getChapter1Activity2_2UserInput(user.uid).then((data) => {
        if (data) {
          setAnswers(data);
        }
      });
    }
  }, [user]);

  const handleAnswer = (
    questionIndex: number,
    isCorrect: boolean,
    selectedOptionIndex: number
  ) => {
    setAnswers((prev) => ({
      ...prev,
      [questionIndex.toString()]: selectedOptionIndex,
    }));
  };

  const handleSubmit = () => {
    if (!user) {
      Alert.alert("Error", "User not authenticated.");
      return;
    }

    // Ensure all questions are answered
    const totalQuestions = Chapter1.RadioQuestionsActivity2_2.length;
    if (Object.keys(answers).length < totalQuestions) {
      Alert.alert("Incomplete", "Please answer all questions before submitting.");
      return;
    }

    setLoading(true);
    updateChapter1Activity2_2(user.uid, answers)
      .then(() => {
        Alert.alert("Success", "Your answers have been saved.");
        // Update progress
        updateChapter1Progress(user.uid, "4_Activity1_2_Questions");
        // Navigate to the summary or next activity
        router.push("/(app)/chapter1/content/summary");
      })
      .catch((error) => {
        console.error("Error saving answers:", error);
        Alert.alert("Error", "There was an error saving your answers. Please try again.");
      })
      .finally(() => {
        setLoading(false);
      });
  };

  if (pending) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color={colors.primary} />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      {/* Scrollable Content */}
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <Text style={styles.subHeader}>
          Now that you have a pretty good understanding about types of procrastination, let’s think about which one resonates with your own tendencies and style.
        </Text>

        {Chapter1.RadioQuestionsActivity2_2.map((question, index) => {
          const radioProps: Chapter1RadioProps = {
            question: question.question,
            option1: question.options[0],
            option2: question.options[1],
            option3: question.options[2],
            correctOption: (() => {
              switch (question.correctOptionIndex) {
                case 0:
                  return "first";
                case 1:
                  return "second";
                case 2:
                  return "third";
                default:
                  return "first";
              }
            })(),
            correctText: getCorrectText(index),
            incorrectText: getIncorrectText(index),
            hint: question.hint,
            onAnswer: (isCorrect, selectedOptionIndex) => handleAnswer(index, isCorrect, selectedOptionIndex),
          };

          return (
            <View key={index}>
              <Chapter1Radio {...radioProps} />
            </View>
          );
        })}

        <View style={styles.submitButton}>
          <PrimaryButton title="Submit" onPress={handleSubmit} ></PrimaryButton>
          {loading && <ActivityIndicator size="small" color={colors.primary} />}
        </View>
      </ScrollView>

      {/* Fixed Navigation Buttons at Bottom */}
      <YStack style={styles.navigationButtonContainer} marginBottom="$2">
        <ChapterNavigationButton
          prev="/(app)/chapter1/content/activity2_1" // Previous route
          next={() => {
            if (!user) return;
            updateChapter1Progress(user.uid, "4_Activity1_2_Questions");
            router.push("/(app)/chapter1/content/summary");
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
