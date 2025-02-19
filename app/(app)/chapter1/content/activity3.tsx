// app/(app)/chapter1/content/activity3.tsx

import React, { useState, useEffect, useCallback } from "react";
import { View, Text, StyleSheet, ScrollView, ActivityIndicator } from "react-native";
import { useRouter } from "expo-router";
import { useAuth } from "@/hooks/useAuth";
import { updateChapter1Progress} from "@/hooks/Chapter1Activity";
import {ChapterNavigationButton} from "@/components/ChapterNavigateButton";
import { useChapter1Context } from "@/contexts/Chapter1Context";
import { useChapterProgressContext } from "@/contexts/AuthContext";
import colors from "@/constants/colors";
import { doc, getDoc, setDoc } from "firebase/firestore";
import { database } from "@/constants/firebaseConfig";
import { YStack } from "tamagui";

const Activity3 = () => {
  const router = useRouter();
  const { user, pending } = useAuth();
  const { chapterData, updateChapterData } = useChapter1Context();
  const { updateChapterProgress, setCurrPage } = useChapterProgressContext();
  const [loading, setLoading] = useState<boolean>(false);

  // 🔄 Load data from context or Firestore
  useEffect(() => {
    const loadUserInput = async () => {
      if (chapterData["activity3"]) {
        return;
      }

      if (user) {
        const data = await getChapter1Activity3UserInput(user.uid);
        if (data) {
          updateChapterData("activity3", data);
        }
      }
    };

    loadUserInput();
  }, [user, chapterData]);

  // ✅ Mark page visited
  useEffect(() => {
    updateChapterProgress("chapter1", "activity3");
    setCurrPage("Procrastination Tendencies");
    updateChapterData("activity3", { visited: true });
  }, []);

  /** 🔄 Fetch user data from Firestore */
  const getChapter1Activity3UserInput = async (userId: string): Promise<{ visited: boolean }> => {
    try {
      const activity3UserRef = doc(database, "Chapter1", "Activity3", "users", userId);
      const snapshot = await getDoc(activity3UserRef);

      if (snapshot.exists()) {
        return { visited: true };
      } else {
        return { visited: false };
      }
    } catch (err) {
      console.error("Error getting Chapter1 Activity3 user input:", err);
      return { visited: false };
    }
  };

  /** 🔄 Save user visit to Firestore */
  const updateChapter1Activity3 = async (userId: string) => {
    try {
      const activity3UserRef = doc(database, "Chapter1", "Activity3", "users", userId);
      await setDoc(activity3UserRef, { visited: true }, { merge: true });
      console.log("Chapter1 Activity3 updated successfully!");
    } catch (err) {
      console.error("Error updating Chapter1 Activity3:", err);
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
        <Text style={styles.description}>There are three primary types.</Text>

        <Text style={styles.subHeader}>Arousal Procrastination</Text>
        <Text style={styles.description}>
          Purposely delaying tasks until the last moment. People with arousal procrastination tend to use the time pressure of an approaching deadline to complete their work.
        </Text>

        <Text style={styles.subHeader}>Avoidant Procrastination</Text>
        <Text style={styles.description}>
          Delaying tasks to avoid some fears triggered by the tasks. People with avoidant procrastination tend to have fear of failure, challenges, or even additional responsibilities from success.
        </Text>

        <Text style={styles.subHeader}>Decisional Procrastination</Text>
        <Text style={styles.description}>
          Delaying decision-making. People tend to have decisional procrastination when they find the task complex, are afraid of potential conflicts with others, or desire to protect their self-esteem or self-confidence.
        </Text>

        <Text style={styles.footer}>Now let’s test your understanding of procrastination tendencies.</Text>
      </ScrollView>

      <YStack style={styles.navigationButtonContainer} marginBottom="$10">
        <ChapterNavigationButton
          prev="/(app)/chapter1/content/activity2"
          next={() => {
            if (!user) return;
            updateChapter1Progress(user.uid, "4_Activity3_Discover");
            updateChapter1Activity3(user.uid);
            router.push("/(app)/chapter1/content/activity4");
          }}
        />
      </YStack>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFFFFF",
  },
  scrollContent: {
    padding: 16,
    paddingBottom: 80,
  },
  header: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#000000",
    marginBottom: 16,
    textAlign: "center",
  },
  subHeader: {
    fontSize: 18,
    fontWeight: "600",
    color: "#000000",
    marginTop: 12,
    marginBottom: 6,
  },
  description: {
    fontSize: 16,
    color: "#000000",
    marginBottom: 12,
    textAlign: "justify",
  },
  footer: {
    fontSize: 16,
    color: "#000000",
    marginTop: 20,
    textAlign: "center",
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
    backgroundColor: "#FFFFFF",
  },
});

export default Activity3;