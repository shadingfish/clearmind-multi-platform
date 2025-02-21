import { RelativePathString, useRouter } from "expo-router";
import React, { useEffect } from "react";
import { StyleSheet, Text } from "react-native";
import { YStack } from "tamagui";
//import { useChapterProgressContext } from "@/contexts/AuthContext";
import { ChapterNavigationButton } from "@/components/ChapterNavigateButton";
import { useChapterProgressContext } from "@/contexts/AuthContext";

const Activity1 = () => {
  const router = useRouter();

  const { updateChapterProgress, setCurrPage } = useChapterProgressContext();

  useEffect(() => {
    setCurrPage("activity1");
  }, []);

  return (
    <YStack margin={"$4"} gap={"$4"}>
      <Text style={{ fontSize: 18 }}>
        While goal-setting is an essential strategy for addressing
        procrastination tendencies, science says it's not enough! When the
        process of goal-setting is combined with personal values, it is the most
        effective.
      </Text>
      <Text style={styles.textBox}>
        Thus, this part presents a fresh framework incorporating two essential
        components: goal setting and Acceptance and Commitment Therapy (ACT).
        These two elements work together. We'll begin with looking at the STAR
        framework for setting goals, then we'll explain how Acceptance and
        Commitment Therapy is also a crucial part of the process.
      </Text>

      <ChapterNavigationButton
        prev={"/(app)/chapter4/content/opening"}
        next={() => {
          updateChapterProgress("chapter4", "activity1");
          router.push(
            "/(app)/chapter4/content/activity2" as RelativePathString
          );
        }}
      />
    </YStack>
  );
};

const styles = StyleSheet.create({
  textBox: {
    marginTop: "5%",
    fontSize: 18,
    marginBottom: "5%",
  },
});

export default Activity1;
