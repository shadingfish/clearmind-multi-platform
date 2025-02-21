import { RelativePathString, useRouter } from "expo-router";
import React, { useEffect, useState } from "react";
import { YStack, Text, Input } from "tamagui";
//import { useChapterProgressContext } from "@/contexts/AuthContext";
import { ChapterNavigationButton } from "@/components/ChapterNavigateButton";
import { useChapterProgressContext } from "@/contexts/AuthContext";
import colors from "@/constants/colors";
import { hasEmptyValues } from "@/constants/helper";
import { useToastController } from "@tamagui/toast";

type Activity3Questions = {
  answer1: string;
  answer2: string;
};

const Activity3 = () => {
  const router = useRouter();
  const toast = useToastController();

  const { updateChapterProgress, setCurrPage } = useChapterProgressContext();

  const [questions, setQuestions] = useState<Activity3Questions>({
    answer1: "",
    answer2: "",
  });

  const updateQuestion = (field: keyof Activity3Questions, value: string) => {
    setQuestions((prev) => {
      const updatedQuestions = { ...prev, [field]: value };
      return updatedQuestions;
    });
  };

  useEffect(() => {
    setCurrPage("activity3");
  }, []);

  return (
    <YStack margin={"$4"} gap={"$4"}>
      <Text fontSize={"$5"} lineHeight={20}>
        As we explored in part 2, Procrastination tendencies can bring many
        difficult passengers that come along for the ride, such as self-doubt,
        anxiety, and depression. Although it's common for challenging passengers
        (difficult emotions) to accompany us on our journey, identifying your
        passengers is the first step towards overcoming procrastination. What
        difficult thoughts and feelings might arise while you work on your goal
        this week?
      </Text>

      <Input
        unstyled
        placeholder={"My difficult thoughts and feelings are..."}
        borderColor={colors.border}
        borderWidth={3}
        borderRadius={7}
        size="$4"
        width={"100%"}
        alignSelf="center"
        value={questions.answer1}
        onChangeText={(text) => updateQuestion("answer1", text)}
      />

      <Text fontSize={"$5"} lineHeight={20}>
        Those challenging passengers can be pretty persuasive when trying to
        talk you out of doing things that truly matter to you. They could say
        things like, ”You're incapable of doing it,“ or ”Just give up this
        time.“ Let's write down some excuses your passengers might use to
        convince you to quit your goal for the week.
      </Text>

      <Input
        unstyled
        placeholder={"input here"}
        borderColor={colors.border}
        borderWidth={3}
        borderRadius={7}
        size="$4"
        width={"100%"}
        alignSelf="center"
        value={questions.answer2}
        onChangeText={(text) => updateQuestion("answer2", text)}
      />

      <ChapterNavigationButton
        prev={"/(app)/chapter4/content/activity2"}
        next={() => {
          if (hasEmptyValues(questions)) {
            toast.show("Empty Input");
          } else {
            updateChapterProgress("chapter4", "activity3");
            router.push(
              "/(app)/chapter4/content/activity4" as RelativePathString
            );
          }
        }}
      />
    </YStack>
  );
};

export default Activity3;
