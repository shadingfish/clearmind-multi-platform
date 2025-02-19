// app/(app)/index.tsx
import React, { useEffect, useState } from "react";

import { ChapterNavigationButton } from "@/components/ChapterNavigateButton";
import { useRouter } from "expo-router";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import YoutubePlayer from "react-native-youtube-iframe";
import { ScrollView, Text, View, YStack } from "tamagui";
import { useAuth } from "@/hooks/useAuth";
import { updateChapter2Progress } from "@/hooks/Chapter2Activity";
import { useChapterProgressContext } from "@/contexts/AuthContext";

export default function Activity2() {
  const router = useRouter();
  const { bottom } = useSafeAreaInsets();
  const [showMore, setShowMore] = useState(false);
  const { user, pending } = useAuth();

  const {updateChapterProgress, setCurrPage} = useChapterProgressContext();

  useEffect(() => {
    setCurrPage('activity2');
    updateChapterProgress("chapter2", "activity2");
  }, [])


  if (pending) {
    return null;
  }
  return (
    <ScrollView automaticallyAdjustKeyboardInsets={true}>
      <YStack margin={"$4"} gap={"$4"} paddingBottom={bottom}>
        <Text fontSize={"$5"} lineHeight={20}>
          If challenging thoughts you wrote earlier are causing you to
          procrastinate, good news! You can manage those challenging thoughts.
          Watch the video below:
        </Text>

        <YoutubePlayer height={200} videoId={"FlGY23jnnFA"} />

        <View
          alignSelf="center"
          borderRadius={20}
          borderWidth={1}
          padding={"$2"}
          paddingHorizontal={"$3"}
          onPress={() => {
            setShowMore(!showMore);
          }}
        >
          <Text fontWeight={showMore ? "bold" : 400} alignSelf="center">
            Can't play the video?
          </Text>
          {showMore && (
            <YStack gap={"$3"} marginTop={"$4"}>
              <Text>
                Imagine you are a bus driver, driving your bus along the path of
                life. Your bus is filled with diverse passengers, each
                representing your difficult thoughts, emotions, memories, and
                challenging sensations. Some of the passengers seem friendly,
                while others exude negativity such as anger or judgment. You
                also have passengers who are gripped by fear and carry sadness
                or shame, urging you to avoid taking risks or postpone making
                decisions.
              </Text>

              <Text>
                Your initial instinct may be to fight or ignore these
                challenging passengers, attempting to push them away or block
                them out. However, you soon realize that this approach doesn’t
                get you very far. Diverted attention prevents you from driving
                towards your destination, and you miss opportunities to interact
                with the friendly passengers on the bus.
              </Text>
              <Text>
                A more effective solution emerges. Instead of resisting or
                avoiding, you learn to accept, allow, and coexist with these
                passengers. You focus on driving towards your values and
                destination, regardless of the challenging passengers on board.
                While it's not ideal to have unpleasant passengers, you
                acknowledge their presence without judgment. The key is not to
                eliminate them but to create internal space and prevent them
                from controlling your journey. As you move forward, you may
                learn valuable lessons from these challenging passengers.
              </Text>
            </YStack>
          )}
        </View>

        <YStack>
          <Text>Note:</Text>
          <Text>
            Even if your passengers are loud and confrontational, it's essential
            to recognize that they can't physically harm you. Your main focus
            should always be on the direction of travel (towards your values),
            while being prepared for occasional disruptive behaviors from your
            passengers.
          </Text>
        </YStack>

        <ChapterNavigationButton
          prev={"/(app)/chapter2/content/activity1"}
          next={() => {
            updateChapterProgress('chapter2', 'activity2');
            router.push("/(app)/chapter2/content/activity3");
            //updateChapter2Progress(user!.uid, "3_Passengers_On_The_Bus");
          }}
        />
      </YStack>
    </ScrollView>
  );
}
