// app/(login)/index.tsx
import React, { useEffect, useState } from "react";
import { useRouter } from "expo-router";
import {
  Button,
  Input,
  YStack,
  XStack,
  Stack,
  Text,
  ScrollView,
  View,
  Checkbox,
} from "tamagui";
import { ChapterNavigationButton } from "@/components/ChapterNavigateButton";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { Chapter2Radio, Chapter2RadioProps } from "@/components/Chapter2Radio";

const RadioQuestion: Chapter2RadioProps[] = [
  {
    question:
      "1. You have a challenging assignment that is due tomorrow, you should:",
    option1: "Put off studying and constantly check social media",
    option2: "Complete the assignment regardless of what your minds say",
    correctOption: "second",
    correctText:
      "You got it! Complete the assignment regardless of what your minds say is an example of driving with your passengers. You don’t let your passengers control your journey.",
    incorrectText:
      "Not quite right! You are letting your challenging passengers control your journey, and you can't make progress towards your destination if you follow what your passengers want you to do. ",
  },
  {
    question:
      "2. You find yourself at a crossroad, considering a significant change in your life: going to your dream college in a new city and you feel uncertain and fearful that you will be all on your own there. You should:",
    option1: "Embrace the uncertainty and fear and go to your dream school",
    option2: "Decline the offer letter and go to a local college",
    correctOption: "first",
    correctText:
      "You got it! Embracing the uncertainty and fear and going to your dream school is an example of driving with your passengers. You don’t let your passengers impede your goals.",
    incorrectText:
      "Not quite right! You are letting your challenging passengers control your journey, and you can't make progress towards your destination if you follow what your passengers want you to do.",
  },
  {
    question:
      "3. You failed a course that was required for your major and you have to retake it. You’ve been depressed recently. You should:",
    option1: "Ignore and suppress these emotions",
    option2:
      "Allow yourself to feel sad but open to seek support from friends and family",
    correctOption: "second",
    correctText:
      "You got it! Allowing yourself to feel sad but open to seek support from friends and family is an example of driving with your passengers towards your academic goal. You should allow the challenging passengers on the bus, but don’t let them impede you.",
    incorrectText:
      "Not quite right! Ignoring and suppressing your emotions is an example of throwing your passengers off the bus.You are letting your challenging passengers control your journey, and you can't make progress towards your destination if you follow what your passengers want you to do.",
  },
  {
    question:
      "4. You've always wanted to learn to play the guitar since you were young. However, once you started taking lessons, you realized it was more time-consuming and complicated than you thought. You should:",
    option1: "Give up on playing guitar",
    option2:
      "Embrace the learning process and don’t solely focus on the end result",
    correctOption: "second",
    correctText:
      "You got it! Embracing the learning process itself and not solely focusing on the end result is an example of driving with your passengers.You should allow the challenging passengers on the bus, but don’t let them impede your goals.",
    incorrectText:
      "Not quite right! Giving up on playing guitar halfway is an example of following what your passengers want you to do. You are letting your challenging passengers control your journey, and you can't make progress towards your destination if you follow what your passengers want you to do.",
  },
  {
    question:
      "5. Your doctor has advised you to lose weight and followed a healthier diet, but one day you find yourself craving junk food. You should:",
    option1: "Practice mindful eating and ask yourself if you're really hungry",
    option2: "Eat whatever you want and commit to the diet next time",
    correctOption: "first",
    correctText:
      "You got it! Practicing mindful eating and asking yourself whether you are really hungry or not is an example of driving with your passengers. You should allow the challenging passengers on the bus, but don’t let them impede your goals.",
    incorrectText:
      "Not quite right! Eating whatever you want and committing to the diet next time is an example of doing what your passengers told you to do.  You are letting your challenging passengers control your journey, and you can't make progress towards your destination if you follow what your passengers want you to do.",
  },
];

export default function Activity3() {
  const router = useRouter();
  const { bottom } = useSafeAreaInsets();

  return (
    <ScrollView>
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

        {RadioQuestion.map((ele, i) => (
          <Chapter2Radio id={i} {...ele} />
        ))}

        <ChapterNavigationButton
          prev={() => {
            router.push("/(login)/chapter2/content/activity2");
          }}
          next={() => {
            router.push("/(login)/chapter2/content/activity4");
          }}
        />
      </YStack>
    </ScrollView>
  );
}
