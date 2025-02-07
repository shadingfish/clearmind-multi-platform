// app/(app)/index.tsx
import { Chapter2Radio, Chapter2RadioProps } from "@/components/Chapter2Radio";
import { ChapterNavigationButton } from "@/components/ChapterNavigateButton";
import { Chapter2 } from "@/constants/data";
import { useAuth } from "@/hooks/useAuth";
//import { updateChapter2Progress } from "@/hooks/Chapter2Activity";
import { useRouter } from "expo-router";
import React, { useEffect } from "react";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { ScrollView, Text, View, YStack } from "tamagui";
import { useChapterProgressContext } from "@/contexts/AuthContext";

export default function Activity3() {
  const router = useRouter();
  const { bottom } = useSafeAreaInsets();
  const { user, pending } = useAuth();

  //~~~JUST COPY PAST THIS INTO EACH ACTIVITY AND CHANGE THE CHAPTER AND TITLE ACCORDINGLY~~~
  const { updateChapterProgress } = useChapterProgressContext();

  useEffect(() => {
    updateChapterProgress("chapter2", "activity3");
  }, []);
  //~~~END COPY PASTA~~~

  if (pending) {
    return null;
  }

  return (
    <ScrollView automaticallyAdjustKeyboardInsets={true}>
      <YStack margin={"$4"} gap={"$4"} paddingBottom={bottom} key={"root"}>
        <Text fontSize={"$5"} lineHeight={20} key={"text1"}>
          Here are some examples of how people might respond to difficult
          passengers. Choose the answer that best describes driving with your
          passengers while traveling towards your destination.
        </Text>

        <Text fontSize={"$5"} lineHeight={20} key={"text2"}>
          Hint: When you drive with your passengers, remember that you are the
          one steering the bus, not the passengers. Don’t let your passengers
          decide where the bus goes.
        </Text>

        <Text fontSize={"$5"} lineHeight={20} key={"text3"}>
          Which one is driving with your passengers?
        </Text>

        {Chapter2.RadioQuestion.map((ele, i) => {
          return (
            <View key={i}>
              <Chapter2Radio {...(ele as Chapter2RadioProps)} />
            </View>
          );
        })}

        <ChapterNavigationButton
          prev={"/(app)/chapter2/content/activity2"}
          next={() => {
            router.push("/(app)/chapter2/content/activity4");
            updateChapter2Progress(user!.uid, "4_Example");
          }}
        />
      </YStack>
    </ScrollView>
  );
}
