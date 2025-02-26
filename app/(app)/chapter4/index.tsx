import { ChapterItem } from "@/components/ChapterActivityIcon";
import { Chapter4, ChapterProgress } from "@/constants/data";
import { getChapter4Progress } from "@/hooks/Chapter4Activity";
//import { useChapterProgressContext } from "@/contexts/AuthContext";
/* import {
  getChapter2Progress,
  initChapter2Progress,
} from "@/hooks/Chapter2Activity"; */
import { useAuth } from "@/hooks/useAuth";
import { Link, RelativePathString } from "expo-router";
import React, { useEffect, useState } from "react";
import { Text, View, YStack } from "tamagui";

export default function Chapter4Index() {
  const { user, pending } = useAuth();
  const [finished, setFinished] = useState(false);
  const [progress, setProgress] = useState<ChapterProgress>(
    Chapter4.EmptyProgress
  );

  useEffect(() => {
    setFinished(Object.values(progress).every((value) => value === "1"));
  }, [progress]);

  useEffect(() => {
    if (user) {
      getChapter4Progress(user.uid)
        .then((res) => {
          if (res != null) {
            const curProgress = res;
            setProgress(curProgress);
            console.log("curProgress ch4", curProgress);
          } else {
            console.log("error no ch3 progress");
          }
        })
        .catch((err) => console.log(err));
    }
  }, [pending]);

  return (
    <YStack flex={1} marginHorizontal={"$7"} marginVertical={"$6"} gap={"$4"}>
      {Chapter4.Activity.map((ele, i) => {
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
          <Text fontSize={"$5"}>&#127881; You have finished all Part! </Text>
        </YStack>
      )}
    </YStack>
  );
}
