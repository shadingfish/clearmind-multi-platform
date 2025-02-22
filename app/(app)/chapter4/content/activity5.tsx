import { RelativePathString, useRouter } from "expo-router";
import React, { useEffect, useState } from "react";
import { ScrollView, Text, View, YStack } from "tamagui";
//import { useChapterProgressContext } from "@/contexts/AuthContext";
import { ChapterNavigationButton } from "@/components/ChapterNavigateButton";
import { useChapterProgressContext } from "@/contexts/AuthContext";
import YoutubePlayer from "react-native-youtube-iframe";

const Activity5 = () => {
  const router = useRouter();
  const [showMore, setShowMore] = useState(false);

  const { updateChapterProgress, setCurrPage } = useChapterProgressContext();

  useEffect(() => {
    setCurrPage("activity5");
  }, []);

  return (
    <ScrollView automaticallyAdjustKeyboardInsets={true}>
      <YStack margin={"$4"} gap={"$4"}>
        <Text fontSize={"$5"} lineHeight={20}>
          Now you are officially ready to start using our Goal Tracker! Before
          you start, make sure to check out the tutorial video:
        </Text>

        <YoutubePlayer height={200} videoId={"PJHWVwoMQV8"} />

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
                Our app's tracker feature is designed to support your goal
                achievement. Utilizing the information gathered earlier, we've
                established a weekly goal spanning 7 days for you. It's
                essential to update your progress daily and click on the
                <Text fontWeight={"bold"}> self-check-in button</Text> once
                you've completed your daily goal. This allows you to record your
                progress and difficult emotions, as well as reflect on any
                cognitive strategies you’ve used to overcome procrastination.
              </Text>

              <Text>
                "You will then participate in the procrastination scale
                assessment to evaluate your procrastination tendencies for each
                day. Following the assessment, you'll be directed to the main
                page of our goal tracker feature.
              </Text>

              <Text>
                "At the top of the screen, you'll find the timeliness overview
                for the current week. Successfully checking in for your goal
                will turn your daily update sticker green with a check mark. If
                you don't have a daily goal, the sticker will remain gray. In
                the event that you forget to check in for a day, the sticker
                will turn red with an exclamation mark. Your weekly goal
                completion will be displayed below.
              </Text>

              <Text>
                "Don't worry if you miss a day; you have the flexibility to
                check in late. Our app is designed to accommodate occasional
                delays, ensuring you can maintain engagement with your goals.
                Once you complete your weekly goal, your weekly average score
                will be calculated and displayed at the bottom of the screen.
                This feature provides more insights into your historial
                timeliness and procrastination management skills development
                over time.
              </Text>

              <Text>
                "If you don't have a specific goal for a particular day, you are
                still welcome to engage with our app. In moments of anxiety or
                temptation to procrastinate, don't hesitate to revisit our
                course materials for guidance.";
              </Text>
            </YStack>
          )}
        </View>

        <Text fontSize={"$5"} lineHeight={20}>
          Now with your weekly goal set, remember to check in over the next
          seven days to update the tracker. We are looking forward to seeing
          your progress.
        </Text>

        <ChapterNavigationButton
          prev={"/(app)/chapter4"}
          next={() => {
            updateChapterProgress("chapter5", "Summary");
            router.push("/(app)/chapter4/" as RelativePathString);
          }}
        />
      </YStack>
    </ScrollView>
  );
};

export default Activity5;
