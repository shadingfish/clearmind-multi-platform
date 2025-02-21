import React, { useState, useEffect } from "react";
import {
  View,
  Image,
  SafeAreaView,
  ScrollView,
  Dimensions,
  StyleSheet,
  Text,
  Pressable,
  TextInput,
} from "react-native";
import { Label, RadioGroup, XStack, YStack } from "tamagui";
import type { SizeTokens } from "tamagui";
const { width } = Dimensions.get("window");
const { height } = Dimensions.get("window");
import { RadioButton } from "react-native-paper";
import * as Progress from "react-native-progress";
import { RelativePathString, useRouter } from "expo-router";
//import { useChapterProgressContext } from "@/contexts/AuthContext";
import { ChapterNavigationButton } from "@/components/ChapterNavigateButton";
import { useChapterProgressContext } from "@/contexts/AuthContext";

const Opening = () => {
  const router = useRouter();

  const { updateChapterProgress, setCurrPage } = useChapterProgressContext();

  useEffect(() => {
    setCurrPage("opening");
  }, []);

  return (
    <YStack margin={"$4"} gap={"$4"}>
      <Text style={{ fontSize: 18 }}>
        In part three, we practiced some positive cognitive strategies, such as
        breath meditation and the Stop Breathe Believe practice, which are
        useful for overcoming procrastination. We discussed common cognitive
        distortions and the ways to shift to positive thinking. We've learned
        that changing our thinking patterns and embracing positive mindsets help
        us overcome the urge to procrastinate. In this section, we'll recap key
        concepts from previous chapters and introduce a new framework designed
        to help you manage procrastination on a daily basis.
      </Text>
      <Text style={styles.textBox}>
        In this section, we'll recap key concepts from previous parts and
        introduce a new framework designed to help you manage procrastination on
        a daily basis, ensuring you stay aligned with your priorities and goals.
      </Text>

      <ChapterNavigationButton
        prev={"/(app)/chapter4"}
        next={() => {
          updateChapterProgress("chapter4", "opening");
          router.push(
            "/(app)/chapter4/content/activity1" as RelativePathString
          );
        }}
      />
    </YStack>
  );
};

const styles = StyleSheet.create({
  textBox: {
    marginTop: "5%",
    fontSize: 18,
    marginBottom: "5%",
  },
});

export default Opening;
