// app/(app)/index.tsx
import React, { useEffect } from "react";

import { ChapterNavigationButton } from "@/components/ChapterNavigateButton";
import { useRouter } from "expo-router";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import YoutubePlayer from "react-native-youtube-iframe";
import { ScrollView, Text, YStack } from "tamagui";
import { useAuth } from "@/hooks/useAuth";
import { updateChapter2Progress } from "@/hooks/Chapter2Activity";
import { useChapterProgressContext } from "@/contexts/AuthContext";

export default function Activity5() {
  const router = useRouter();
  const { bottom } = useSafeAreaInsets();
  const { user, pending } = useAuth();

  const {updateChapterProgress, setCurrPage} = useChapterProgressContext();

  useEffect(() => {
    setCurrPage('activity5');
    updateChapterProgress("chapter2", "activity5");
  }, [])

  if (pending) {
    return null;
  }
  return (
    <ScrollView automaticallyAdjustKeyboardInsets={true}>
      <YStack margin={"$4"} gap={"$4"} paddingBottom={bottom}>
        <Text fontSize={"$5"} lineHeight={20}>
          Now what do we do with those challenging passengers? You can simply
          acknowledge their presence with kindness and curiosity but remain
          focused on your destination. They won't take control unless you allow
          them to. And sooner or later they will get off the bus.
        </Text>

        <Text fontSize={"$5"} lineHeight={20}>
          The “sushi train analogy” also describes how to deal with challenging
          emotions.
        </Text>

        <YoutubePlayer height={200} videoId={"tzUoXJVI0wo"} />

        <Text fontSize={"$5"} lineHeight={20}>
          So - if those challenging passengers tell you to put off some work you
          need to do (and they might trigger self-doubt, anxiety, depression,
          etc.), kindly let them be there but don’t let them actually make you
          procrastinate on your bus drive.
        </Text>

        <Text fontSize={"$5"} lineHeight={20}>
          How do we actually do that? You will learn some specific strategies in
          Part 3.
        </Text>

        <ChapterNavigationButton
          prev={"/(app)/chapter2/content/activity4"}
          next={() => {
            updateChapterProgress('chapter2', 'activity5');
            router.push("/(app)/chapter2/content/summary");
            //updateChapter2Progress(user!.uid, "7_Willingness_to_Carry_On");
          }}
        />
      </YStack>
    </ScrollView>
  );
}
