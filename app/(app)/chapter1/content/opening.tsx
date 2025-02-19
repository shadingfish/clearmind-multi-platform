import { ChapterNavigationButton } from "@/components/ChapterNavigateButton";
import { useAuth } from "@/hooks/useAuth";
import { updateChapter1Progress } from "@/hooks/Chapter1Activity";
import { useRouter } from "expo-router";
import React, {useEffect}from "react";
import { Text, YStack } from "tamagui";
import { useChapterProgressContext } from "@/contexts/AuthContext";

export default function Opening() {
  const router = useRouter();
  const { user } = useAuth();
  
  const {updateChapterProgress, setCurrPage} = useChapterProgressContext();

  useEffect(() => {
    setCurrPage('opening');
  }, [])

  return (
    <YStack margin={"$4"} gap={"$4"}>
      <Text fontSize={"$5"} lineHeight={25}>
        In this chapter, you will:
        1. Identify your life values.
        2. Explore various kinds of procrastination and the underlying reasons behind procrastination behaviors.
        3. Be introduced to Acceptance and Commitment Therapy, which can help you manage procrastination tendencies.
      </Text>

      <ChapterNavigationButton
        prev={"/(app)/chapter1/content/chapter1"}
        next={() => {
          updateChapterProgress('chapter1', 'opening');
          updateChapter1Progress(user!.uid, "1_Opening");
          router.push("/(app)/chapter1/content/activity1");
        }}
      />
    </YStack>
  );
}
