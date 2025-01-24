// app/(app)/index.tsx
import React, { useEffect, useState } from "react";

import { ChapterNavigationButton } from "@/components/ChapterNavigateButton";
import colors from "@/constants/colors";
import { hasEmptyValues } from "@/constants/helper";
import { useToastController } from "@tamagui/toast";
import { useRouter } from "expo-router";
import { Dimensions } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { Image, Input, ScrollView, Text, YStack, View } from "tamagui";
import { useAuth } from "@/hooks/useAuth";
import {
  getChapter2Activity2,
  setChapter2Activity2,
  updateChapter2Progress,
} from "@/hooks/Chapter2Activity";

const screenWidth = Dimensions.get("window").width;

const Activity4QuestionInput = ({
  placeholder,
  value,
  onChange,
}: {
  placeholder: string;
  value: string;
  onChange: (val: string) => void;
}) => (
  <Input
    unstyled
    placeholder={placeholder}
    placeholderTextColor={colors.placeholder}
    borderColor={colors.border}
    borderWidth={3}
    borderRadius={7}
    size="$4"
    width={"100%"}
    alignSelf="center"
    value={value}
    onChangeText={onChange}
  />
);

type Activity4Questions = {
  diagram_destination: string;
  diagram_passenger_A: string;
  diagram_passenger_B: string;
  diagram_passenger_C: string;
  diagram_persuasion: string;
};

export default function Activity4() {
  const router = useRouter();
  const { user, pending } = useAuth();
  const { bottom } = useSafeAreaInsets();

  const toast = useToastController();

  const [questions, setQuestions] = useState<Activity4Questions>({
    diagram_destination: "",
    diagram_passenger_A: "",
    diagram_passenger_B: "",
    diagram_passenger_C: "",
    diagram_persuasion: "",
  });

  const updateQuestion = (field: keyof Activity4Questions, value: string) => {
    setQuestions((prev) => ({ ...prev, [field]: value }));
  };

  useEffect(() => {
    if (user) {
      getChapter2Activity2(user.uid)
        .then((snapshot) => {
          if (snapshot.exists()) {
            const answer = snapshot.val();
            for (const [key, value] of Object.entries(answer)) {
              updateQuestion(key as keyof Activity4Questions, value as string);
            }
          }
        })
        .catch((err) => console.log("Error get chapter 2 activity2: " + err));
    }
  }, [pending]);

  return (
    <ScrollView automaticallyAdjustKeyboardInsets={true}>
      <YStack margin={"$4"} gap={"$4"} paddingBottom={bottom}>
        <Text fontSize={"$5"} lineHeight={20}>
          The destination here can be big, such as your top value mentioned in
          Part 1, or it can be any small goal toward your top value.
          [explanation of the difference between goal and value]
        </Text>

        <Text fontSize={"$5"} lineHeight={20}>
          Previous examples show how people can still drive to their
          destination, even with difficult passengers. Now, let’s think of your
          own goal (destination) and the possible challenging thoughts
          (challenging passengers) that may lead you to procrastinate toward the
          goal. Managing challenging passengers, which you will learn in Part 3,
          will be much clearer once you know who they are.
        </Text>

        <Text fontSize={"$5"} lineHeight={20}>
          Recognizing these passengers is the first step to overcome
          procrastination and stay on track towards your destination! Think of
          your destination and possible challenging passengers. It can be
          anything like “health”, or “getting homework done.”
        </Text>

        <Image
          source={require("assets/images/bus_diagram_new.png")}
          width="100%"
          height={screenWidth * (281 / 600) * 0.9}
        />

        <YStack gap={"$3"}>
          <Activity4QuestionInput
            placeholder="My Destination"
            value={questions.diagram_destination}
            onChange={(val) => updateQuestion("diagram_destination", val)}
          />

          <Activity4QuestionInput
            placeholder="Passenger A"
            value={questions.diagram_passenger_A}
            onChange={(val) => updateQuestion("diagram_passenger_A", val)}
          />

          <Activity4QuestionInput
            placeholder="Passenger B"
            value={questions.diagram_passenger_B}
            onChange={(val) => updateQuestion("diagram_passenger_B", val)}
          />

          <Activity4QuestionInput
            placeholder="Passenger C"
            value={questions.diagram_passenger_C}
            onChange={(val) => updateQuestion("diagram_passenger_C", val)}
          />
        </YStack>

        <Text fontSize={"$5"} lineHeight={20}>
          How do your passengers persuade you to give up on your goal?
        </Text>

        <Activity4QuestionInput
          placeholder="Passengers' persuasion"
          value={questions.diagram_persuasion}
          onChange={(val) => updateQuestion("diagram_persuasion", val)}
        />

        <ChapterNavigationButton
          prev={"/(app)/chapter2/content/activity3"}
          next={() => {
            if (hasEmptyValues(questions)) {
              toast.show("Empty Input");
            } else {
              setChapter2Activity2(user!.uid, questions);
              router.push("/(app)/chapter2/content/activity5");
              updateChapter2Progress(user!.uid, "6_Diagram");
            }
          }}
        />
      </YStack>
    </ScrollView>
  );
}
