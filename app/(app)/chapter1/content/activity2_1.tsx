// app/(app)/chapter1/content/activity2_1.tsx

import React, { useState, useEffect, useCallback } from "react";
import { View, Text, StyleSheet, ScrollView, ActivityIndicator } from "react-native";
import { useRouter } from "expo-router";
import { useAuth } from "@/hooks/useAuth";
import { updateChapter1Progress} from "@/hooks/Chapter1Activity";
import {ChapterNavigationButton} from "@/components/ChapterNavigateButton";
import colors from "@/constants/colors";
import { YStack } from "tamagui";
import { useChapterProgressContext } from "@/contexts/AuthContext";
//import { useAuthContext } from "@/contexts/AuthContext";

const Activity2_1 = () => {
  const router = useRouter();
  const { user, pending } = useAuth();
  
  const {updateChapterProgress, setCurrPage} = useChapterProgressContext();

  useEffect(() => {
    setCurrPage('activity2_1');
  }, [])
  

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
        <Text style={styles.description}>
          There are three primary types.
        </Text>

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

        <Text style={styles.footer}>
          Now let’s test your understanding of procrastination tendencies.
        </Text>
      </ScrollView>

      <YStack style={styles.navigationButtonContainer} marginBottom="$10">
        <ChapterNavigationButton
          prev="/(app)/chapter1/content/activity1"
          next={() => {
            if (!user) return;
            updateChapterProgress("chapter1", "activity2_1");
            updateChapter1Progress(user.uid, "3_Activity1_2_Discover");
            router.push("/(app)/chapter1/content/activity2_2");
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

export default Activity2_1;