import { ChapterNavigationButton } from "@/components/ChapterNavigateButton";
import { useAuth } from "@/hooks/useAuth";
import { updateChapter2Progress } from "@/hooks/Chapter2Activity";
import { useRouter } from "expo-router";
import React from "react";
import { Text, YStack } from "tamagui";

export default function Opening() {
  const router = useRouter();
  const { user } = useAuth();

  return (
    <YStack margin={"$4"} gap={"$4"}>
      <Text fontSize={"$5"} lineHeight={25}>
        In part one, we explored various types of procrastination and the
        underlying reasons behind procrastination behaviors. In this part, we’ll
        help you embrace some of the challenging emotions linked to your
        procrastination experiences.
      </Text>

      <ChapterNavigationButton
        prev={"/(app)/chapter2/content/chapter2"}
        next={() => {
          router.push("/(app)/chapter2/content/activity1");
          updateChapter2Progress(user!.uid, "1_Opening");
        }}
      />
    </YStack>
  );
}
