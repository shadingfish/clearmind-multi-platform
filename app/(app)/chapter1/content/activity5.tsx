// app/(app)/chapter1/content/activity5.tsx

import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Alert,
  ActivityIndicator,
} from "react-native";
import { useAuth } from "@/hooks/useAuth";
import { useRouter } from "expo-router";
import { YStack } from "tamagui";
import RadioGroup from "@/components/RadioGroup"; 
import { ChapterNavigationButton } from "@/components/ChapterNavigateButton";
import { useChapter1Context } from "@/contexts/Chapter1Context";
import { doc, getDoc, setDoc } from "firebase/firestore";
import { database } from "@/constants/firebaseConfig";
import { updateChapter1Progress } from "@/hooks/Chapter1Activity";

// 定义 Activity5 数据结构
type Activity5Data = {
  frequency: string;
  timeCommit: string;
};

export default function Activity5() {
  const router = useRouter();
  const { user, pending } = useAuth();
  const { chapterData, updateChapterData } = useChapter1Context();

  // ✅ **优先从 Context 读取数据**
  const [activityData, setActivityData] = useState<Activity5Data>(
    chapterData["activity5"] || { frequency: "", timeCommit: "" }
  );

  const [loading, setLoading] = useState<boolean>(false);

  // ✅ **如果 Context 为空，则从 Firestore 获取数据**
  useEffect(() => {
    const loadUserInput = async () => {
      if (!chapterData["activity5"]?.frequency && user) {
        const data = await getChapter1Activity5UserInput(user.uid);
        if (data) {
          setActivityData(data);
          updateChapterData("activity5", data); // 🔄 **同步到 Context**
        }
      }
    };
    loadUserInput();
  }, [user]);

  // ✅ **当数据更新时，自动同步到 Context**
  useEffect(() => {
    updateChapterData("activity5", activityData);
  }, [activityData]);

  const handleSubmit = async () => {
    if (!activityData.frequency || !activityData.timeCommit) {
      Alert.alert("Incomplete", "Please answer both questions before proceeding.");
      return;
    }

    if (!user) {
      Alert.alert("Error", "User not authenticated.");
      return;
    }

    setLoading(true);
    try {
      await updateChapter1Activity5UserInput(user.uid, activityData);
      updateChapterData("activity5", activityData);
      updateChapter1Progress(user.uid, "6_Time_Management");
      Alert.alert("Success", "Your preferences have been saved successfully.");
      router.push("/(app)/chapter1/content/summary");
    } catch (error) {
      console.error("Error saving time management info:", error);
      Alert.alert("Error", "Failed to save your selections. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  if (pending || loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="blue" />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <Text style={styles.paragraph}>
          This app will help you discover the cause of your procrastination behaviors and manage it,
          using Acceptance and Commitment Therapy (ACT) skills.
        </Text>

        <Text style={styles.paragraph}>
          There is really one thing we want you to do: engage with the app on a regular basis until
          completing the content! So tell us how regularly you want to use the app.
        </Text>

        <RadioGroup
          orientation="vertical"
          label="1. How frequently do you plan to use our app?"
          options={["A. Daily", "B. Once a week", "C. 2-3 times a week"]}
          selectedValue={activityData.frequency}
          onValueChange={(value) => setActivityData((prev) => ({ ...prev, frequency: value }))}
        />

        <RadioGroup
          orientation="vertical"
          label="2. How much time are you willing to commit to each visit on our app?"
          options={[
            "A. Less than 10 minutes",
            "B. Less than 20 minutes",
            "C. Less than 30 minutes",
          ]}
          selectedValue={activityData.timeCommit}
          onValueChange={(value) => setActivityData((prev) => ({ ...prev, timeCommit: value }))}
        />

        {!!activityData.frequency && !!activityData.timeCommit && (
          <Text style={styles.selectionText}>
            Your planned frequency to use the App is: {activityData.frequency}; 
            and for each visit, the time you plan to spend is: {activityData.timeCommit}.
          </Text>
        )}
      </ScrollView>

      <YStack style={styles.navigationContainer}>
        <ChapterNavigationButton prev="/(app)/chapter1/content/activity4" next={handleSubmit} />
      </YStack>
    </View>
  );
}

// ✅ **获取用户数据**
const getChapter1Activity5UserInput = async (userId: string): Promise<Activity5Data | null> => {
  try {
    const userRef = doc(database, "Chapter1", "Activity5", "users", userId);
    const snapshot = await getDoc(userRef);
    return snapshot.exists() ? (snapshot.data() as Activity5Data) : null;
  } catch (err) {
    console.error("Error getting Chapter1 Activity5 user input:", err);
    return null;
  }
};

// ✅ **更新用户数据**
const updateChapter1Activity5UserInput = async (userId: string, data: Activity5Data) => {
  try {
    const userRef = doc(database, "Chapter1", "Activity5", "users", userId);
    await setDoc(userRef, data, { merge: true });
    console.log("Activity5 data saved successfully!");
  } catch (err) {
    console.error("Error updating Chapter1 Activity5:", err);
  }
};


// 样式定义
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFFFFF",
    position: "relative",
  },
  scrollContent: {
    padding: 16,
    paddingBottom: 60, // 给底部留空
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


// // ✅ **样式优化**
// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: "#FFFFFF",
//   },
//   scrollContent: {
//     padding: 16,
//   },
//   loadingContainer: {
//     flex: 1,
//     justifyContent: "center",
//     alignItems: "center",
//   },
//   paragraph: {
//     fontSize: 16,
//     marginBottom: 12,
//   },
//   selectionText: {
//     fontSize: 16,
//     marginTop: 10,
//     fontWeight: "bold",
//   },
//   navigationContainer: {
//     padding: 16,
//     backgroundColor: "#fff",
//   },
// });