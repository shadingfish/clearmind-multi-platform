import { ChapterNavigationButton } from "@/components/ChapterNavigateButton";
import { useAuth } from "@/hooks/useAuth";
import { updateChapter2Progress } from "@/hooks/Chapter2Activity";
import { useRouter } from "expo-router";
import React, { useEffect } from "react";
import { Text, YStack } from "tamagui";
import { useAuthContext } from "@/contexts/AuthContext";

export default function Opening() {
  const router = useRouter();
  const { user } = useAuth();

  //~~~JUST COPY PAST THIS INTO EACH ACTIVITY AND CHANGE THE CHAPTER AND TITLE ACCORDINGLY~~~
  const { userData, setUserData, currPage, setCurrPage } = useAuthContext();

  useEffect(() => {
    setUserData((prevUserData: Record<string, Record<string, boolean>>): Record<string, Record<string, boolean>> => ({
        ...prevUserData,
        "chapter2": {
            ...prevUserData.chapter2,
            "Opening": true
        }
    }));

    setCurrPage("Opening");
  }, []);
  //~~~END COPY PASTA~~~

  return (
    <YStack margin={"$4"} gap={"$4"}>
      <Text fontSize={"$5"} lineHeight={25}>
        In part one, we explored various types of procrastination and the
        underlying reasons behind procrastination behaviors. In this part, we’ll
        help you embrace some of the challenging emotions linked to your
        procrastination experiences.
      </Text>

      <ChapterNavigationButton
        prev={"/(app)/chapter2/content/chapter2"}
        next={() => {
          router.push("/(app)/chapter2/content/activity1");
          updateChapter2Progress(user!.uid, "1_Opening");
        }}
      />
    </YStack>
  );
}
