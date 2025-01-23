import { ChapterItem } from "@/components/ChapterActivityIcon";
import { Chapter2, ChapterProgress } from "@/constants/data";
import { auth } from "@/constants/firebaseConfig";
import {
  getChapter2Progress,
  initChapter2Progress,
} from "@/hooks/UserActivity";
import { RelativePathString } from "expo-router";
import React, { useEffect, useState } from "react";
import { View, YStack } from "tamagui";

export default function Chapter2Index() {
  const user = auth.currentUser;
  const [progress, setProgress] = useState<ChapterProgress>(
    Chapter2.EmptyProgress
  );

  useEffect(() => {
    if (user) {
      try {
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
      } catch (err) {
        console.log(err);
      }
    }
  }, [user]);

  return (
    <YStack flex={1} marginHorizontal={"$7"} marginVertical={"$6"} gap={"$4"}>
      {Chapter2.Activity.map((ele, i) => {
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
    </YStack>
  );
}
