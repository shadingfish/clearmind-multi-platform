// app/(login)/index.tsx
import React, { useState } from "react";
import { Check as CheckIcon } from "@tamagui/lucide-icons";

import { useRouter } from "expo-router";
import {
  Button,
  Input,
  YStack,
  Image,
  Text,
  ScrollView,
  View,
  Checkbox,
} from "tamagui";
import colors from "@/constants/colors";
import { ChapterNavigationButton } from "@/components/ChapterNavigateButton";
import { CheckboxWithLabel } from "@/components/CheckboxWithLabel";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { Dimensions } from "react-native";

const screenWidth = Dimensions.get("window").width;

export default function Activity4() {
  const router = useRouter();
  const { bottom } = useSafeAreaInsets();

  return (
    <ScrollView>
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
          source={require("../../../../assets/images/bus_diagram_new.png")}
          width="100%"
          height={screenWidth * (281 / 600) * 0.9}
        />

        <ChapterNavigationButton
          prev={() => {
            router.push("/(login)/chapter2/content/opening");
          }}
          next={() => {
            router.push("/(login)/chapter2/content/activity2");
          }}
        />
      </YStack>
    </ScrollView>
  );
}
