import React, { useEffect, useState, useRef } from "react";
import { View, Text, StyleSheet, ScrollView, Alert, ActivityIndicator } from "react-native";
import { useAuth } from "@/hooks/useAuth";
import { useRouter } from "expo-router";
import { YStack } from "tamagui";
//import { useAuthContext } from "@/contexts/AuthContext";

import RadioGroup from "@/components/RadioGroup"; 
import { PrimaryButton } from "@/components/CustomButton";
import { ChapterNavigationButton } from "@/components/ChapterNavigateButton";
import colors from "@/constants/colors";

import {
  getChapter1Activity3UserInput,
  updateChapter1Activity3,
  updateChapter1Progress,
} from "@/hooks/Chapter1Activity";
import { useChapterProgressContext } from "@/contexts/AuthContext";

/**
 * Chapter1 Activity3:
 * "How to Use the App" / "Time Management"
 */
export default function Activity3() {
  const router = useRouter();
  const { user, pending } = useAuth();
  

  const {updateChapterProgress, setCurrPage} = useChapterProgressContext();

  useEffect(() => {
    setCurrPage('activity3');
  }, [])

  const [frequency, setFrequency] = useState<string>("");
  const [timeCommit, setTimeCommit] = useState<string>("");

  const openTimeRef = useRef<number>(0);

  useEffect(() => {
    openTimeRef.current = Date.now();

    return () => {
      // 组件卸载时，根据需求计算停留时间
      const closeTime = Date.now();
      const duration = closeTime - openTimeRef.current;
      // 如果需要将该时长发送到 Firebase，可在这里调用相应函数
      // sendTimeStampsToFirebase(duration);
    };
  }, []);

  useEffect(() => {
    if (user) {
      getChapter1Activity3UserInput(user.uid).then((saved) => {
        if (saved) {
          setFrequency(saved.frequency || "");
          setTimeCommit(saved.timeCommit || "");
        }
      });
    }
  }, [user]);

  const handleNext = async () => {
    if (!frequency || !timeCommit) {
      Alert.alert("Incomplete", "Please answer both questions before proceeding.");
      return;
    }

    if (!user) {
      Alert.alert("Error", "User not authenticated.");
      return;
    }

    try {
      await updateChapter1Activity3(user.uid, {
        frequency,
        timeCommit,
      });
      await updateChapter1Progress(user.uid, "5_Time_Management");

      Alert.alert("Success", "Your preferences have been saved successfully.");

      updateChapterProgress("chapter1", "activity3");

      router.push("/(app)/chapter1/content/summary");
    } catch (error) {
      console.error("Error saving time management info:", error);
      Alert.alert("Error", "Failed to save your selections. Please try again.");
    }
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
      <ScrollView contentContainerStyle={styles.scrollContent}>

        <Text style={styles.paragraph}>
          This app will help you discover the cause of your procrastination behaviors and manage it,
          using Acceptance and Commitment Therapy (ACT) skills. If you want to learn more about ACT,
          check the “About ACT” page.
        </Text>

        {/* 段落2 */}
        <Text style={styles.paragraph}>
         There is really ONE thing we want you to do: engage with the app on a regular basis until completing the content! So tell us how regularly you want to use the app.
        </Text>

        {/* Question 1 */}
        <RadioGroup
          orientation="vertical"
          label="1. How frequently do you plan to use our app?"
          options={["A. Daily", "B. Once a week", "C. 2-3 times a week"]}
          selectedValue={frequency}
          onValueChange={(value) => setFrequency(value)}
        />

        {/* Question 2 */}
        <RadioGroup
          orientation="vertical"
          label="2. How much time are you willing to commit to each visit on our app?"
          options={[
            "A. Less than 10 minutes",
            "B. Less than 20 minutes",
            "C. Less than 30 minutes",
          ]}
          selectedValue={timeCommit}
          onValueChange={(value) => setTimeCommit(value)}
        />

        {!!frequency && !!timeCommit && (
          <Text style={styles.selectionText}>
            Your planned frequency to use the App is: {frequency}; 
            and for each visit, the time you plan to spend is: {timeCommit}.
          </Text>
        )}

        <Text style={styles.paragraph}>
          Based on your responses, we have enabled notifications to keep you on track of your study plan. 
          You can change your notification preferences by:
        </Text>
        <Text style={styles.paragraph}>
          1. Open [Clearmind] App on your device{"\n"}
          2. Navigate to “Settings” → “Notifications”{"\n"}
          3. Enable or disable notifications according to your preferences.
        </Text>

      </ScrollView>

      <YStack style={styles.navigationContainer}>
        <ChapterNavigationButton
          prev="/(app)/chapter1/content/activity2_2"
          next={handleNext}
        />
      </YStack>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFFFFF",
    position: "relative",
  },
  scrollContent: {
    padding: 16,
    paddingBottom: 60,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  title: {
    fontSize: 20,
    color: "#000",
    fontWeight: "bold",
    marginBottom: 16,
    textAlign: "center",
  },
  paragraph: {
    fontSize: 16,
    color: "#000",
    marginBottom: 16,
    lineHeight: 22,
  },
  selectionText: {
    fontSize: 16,
    color: "#000",
    marginVertical: 16,
    fontStyle: "italic",
  },
  submitContainer: {
    alignItems: "center",
    marginTop: 20,
  },
  navigationContainer: {
    position: "absolute",
    bottom: 0,
    width: "100%",
    alignSelf: "center",
    backgroundColor: "#fff",
    padding: 16,
  },
});