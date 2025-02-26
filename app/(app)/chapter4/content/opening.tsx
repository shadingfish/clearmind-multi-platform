import { ChapterNavigationButton } from "@/components/ChapterNavigateButton";
import { useChapterProgressContext } from "@/contexts/AuthContext";
import { updateChapter4Progress } from "@/hooks/Chapter4Activity";
import { useAuth } from "@/hooks/useAuth";
import { RelativePathString, useRouter } from "expo-router";
import React, { useEffect } from "react";
import { StyleSheet, Text } from "react-native";
import { YStack } from "tamagui";

const Opening = () => {
  const router = useRouter();
  const { user, pending } = useAuth();

  const { updateChapterProgress, setCurrPage } = useChapterProgressContext();

  useEffect(() => {
    setCurrPage("opening");
  }, []);

  if (pending) {
    return null;
  }

  return (
    <YStack margin={"$4"} gap={"$4"}>
      <Text style={{ fontSize: 18 }}>
        In part three, we practiced some positive cognitive strategies, such as
        breath meditation and the Stop Breathe Believe practice, which are
        useful for overcoming procrastination. We discussed common cognitive
        distortions and the ways to shift to positive thinking. We’ve learned
        that changing our thinking patterns and embracing positive mindsets help
        us overcome the urge to procrastinate.
      </Text>
      <Text style={styles.textBox}>
        In this section, we'll recap key concepts from previous parts and
        introduce a new framework designed to help you manage procrastination on
        a daily basis, ensuring you stay aligned with your priorities and goals.
      </Text>

      <ChapterNavigationButton
        prev={"/(app)/chapter4"}
        next={() => {
          updateChapter4Progress(user!.uid, "1_Opening");
          updateChapterProgress("chapter4", "opening");
          router.push(
            "/(app)/chapter4/content/activity1" as RelativePathString
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

export default Opening;
