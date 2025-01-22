import { useRouter } from "expo-router";
import React from "react";
import { Image, Text, XStack, YStack } from "tamagui";

export default function Page1() {
  const router = useRouter();

  const ChapterItem: React.FC<{
    name: string;
    image: any;
    imageDone: any;
    done: boolean;
    onPress: () => void;
  }> = ({ name, image, imageDone, done, onPress }) => {
    return (
      <XStack alignItems="center" gap={"$2"} onPress={onPress}>
        <Image source={done ? imageDone : image} />
        <Text fontSize={"$5"}>{name}</Text>
      </XStack>
    );
  };

  return (
    <YStack flex={1} marginHorizontal={"$7"} marginVertical={"$6"} gap={"$4"}>
      <ChapterItem
        name="OPENING"
        image={require("assets/images/icon_opening.png")}
        imageDone={require("assets/images/icon_opening_done.png")}
        done={false}
        onPress={() => router.push("/(login)/chapter2/content/opening")}
      />

      <ChapterItem
        name="YOUR CHALLENGING EMOTIONS"
        image={require("assets/images/icon_practice.png")}
        imageDone={require("assets/images/icon_practice_done.png")}
        done={false}
        onPress={() => {
          router.push("/(login)/chapter2/content/activity1");
        }}
      />

      <ChapterItem
        name="PASSENGERS ON THE BUS"
        image={require("assets/images/icon_text.png")}
        imageDone={require("assets/images/icon_text_done.png")}
        done={false}
        onPress={() => {
          router.push("/(login)/chapter2/content/activity2");
        }}
      />

      <ChapterItem
        name="EXAMPLE OF DRIVING THE BUS"
        image={require("assets/images/icon_practice.png")}
        imageDone={require("assets/images/icon_practice_done.png")}
        done={false}
        onPress={() => router.push("/(login)/chapter2/content/activity3")}
      />

      <ChapterItem
        name="IDENTIFY YOUR PASSENGERS"
        image={require("assets/images/icon_diagram.png")}
        imageDone={require("assets/images/icon_diagram_done.png")}
        done={false}
        onPress={() => router.push("/(login)/chapter2/content/activity4")}
      />

      <ChapterItem
        name="WILLINGNESS TO CARRY ON"
        image={require("assets/images/icon_practice.png")}
        imageDone={require("assets/images/icon_practice_done.png")}
        done={false}
        onPress={() => router.push("/(login)/chapter2/content/activity5")}
      />

      <ChapterItem
        name="SUMMARY"
        image={require("assets/images/icon_summary.png")}
        imageDone={require("assets/images/icon_summary_done.png")}
        done={false}
        onPress={() => router.push("/(login)/chapter2/content/summary")}
      />
    </YStack>
  );
}
