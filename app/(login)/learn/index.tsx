import React, { useEffect, useState } from "react";
import { Dimensions } from "react-native";
import { Alert } from "react-native";
import { useFonts } from "expo-font";
import { RelativePathString, useNavigation, useRouter } from "expo-router";
import { Button, Input, YStack, XStack, Stack, Text } from "tamagui";
import { LogoImage } from "@/components/LogoImage";
import colors from "@/constants/colors";
import { useToastController } from "@tamagui/toast";

const screenWidth = Dimensions.get("window").width;

export default function Page1() {
  const navigation = useNavigation();
  const router = useRouter();

  // useEffect(() => {
  //   navigation.setOptions({
  //     headerLeft: () => (
  //       <Button
  //         onPress={() => {
  //           console.log("re");
  //           router.replace("/(login)");
  //         }}
  //       >
  //         <Text>Help</Text>
  //       </Button>
  //     ),
  //   });
  // }, [navigation]);

  return (
    <YStack flex={1}>
      <Text>Hi</Text>
      <Button onPress={() => router.push("/(login)")}>Test</Button>
    </YStack>
  );
}
