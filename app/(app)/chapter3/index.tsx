import { ChapterItem } from "@/components/ChapterActivityIcon";
import { Chapter3, ChapterProgress } from "@/constants/data";
import {
  getChapter2Progress,
  initChapter2Progress,
} from "@/hooks/Chapter2Activity";
import { useAuth } from "@/hooks/useAuth";
import { Link, RelativePathString } from "expo-router";
import React, { useEffect, useState } from "react";
import { Text, View, YStack } from "tamagui";

export default function Chapter3Index() {
  const { user, pending } = useAuth();
  const [finished, setFinished] = useState(false);
  const [progress, setProgress] = useState<ChapterProgress>(
    Chapter3.EmptyProgress
  );

  useEffect(() => {
    setFinished(Object.values(progress).every((value) => value === "1"));
  }, [progress]);

  /* useEffect(() => {
    if (user) {
      getChapter2Progress(user.uid)
        .then((snapshot) => {
          if (snapshot.exists()) {
            const curProgress = snapshot.val();
            delete curProgress["5_Identify_your_passengers"];
            setProgress(curProgress);
          } else {
            initChapter2Progress(user.uid);
          }
        })
        .catch((err) => console.log(err));
    }
  }, [pending]); */

  return (
    <YStack flex={1} marginHorizontal={"$7"} marginVertical={"$6"} gap={"$4"}>
      {Chapter3.Activity.map((ele, i) => {
        return (
          <View key={i}>
            <ChapterItem
              name={ele.name}
              image={ele.icon}
              imageDone={ele.icon_done}
              progressIndex={ele.progress_index as keyof ChapterProgress}
              progress={progress}
              route={ele.route as RelativePathString}
            />
          </View>
        );
      })}

      {finished && (
        <YStack
          alignSelf="center"
          borderWidth={1}
          borderRadius={"$10"}
          paddingHorizontal={"$3"}
          paddingVertical={"$2"}
          alignItems="center"
        >
          <Text fontSize={"$5"}>&#127881; You have finished this Part! </Text>
          <Text
            fontSize={"$5"}
            textDecorationLine="underline"
            color={"$blue11Light"}
          >
            <Link href={"/(app)/chapter3"}>Continue to the next part!</Link>
          </Text>
        </YStack>
      )}
    </YStack>
  );
}
