import React, { useEffect, useState } from "react";
import { Dimensions } from "react-native";
import { Alert } from "react-native";
import { useFonts } from "expo-font";
import { RelativePathString, useNavigation, useRouter } from "expo-router";
import { Button, Input, YStack, XStack, Stack, Text, View } from "tamagui";
import { LogoImage } from "@/components/LogoImage";
import colors from "@/constants/colors";
import AntDesign from "@expo/vector-icons/AntDesign";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { ChapterNavigationButton } from "@/components/ChapterNavigateButton";

const screenWidth = Dimensions.get("window").width;

export default function Opening() {
  const router = useRouter();

  return (
    <YStack margin={"$4"} gap={"$4"}>
      <Text fontSize={"$5"} lineHeight={25}>
        In part one, we explored various types of procrastination and the
        underlying reasons behind procrastination behaviors. In this part, we’ll
        help you embrace some of the challenging emotions linked to your
        procrastination experiences.
      </Text>

      <ChapterNavigationButton
        prev={() => {
          router.dismissTo("/(login)/chapter2");
        }}
        next={() => {
          router.push("/(login)/chapter2/content/activity1");
        }}
      />
    </YStack>
  );
}
