import { RelativePathString, useRouter } from "expo-router";
import React, { useEffect, useState } from "react";
import { YStack, Text, Input } from "tamagui";
//import { useChapterProgressContext } from "@/contexts/AuthContext";
import { ChapterNavigationButton } from "@/components/ChapterNavigateButton";
import { useChapterProgressContext } from "@/contexts/AuthContext";
import colors from "@/constants/colors";
import { useToastController } from "@tamagui/toast";

const Activity4 = () => {
  const router = useRouter();
  const toast = useToastController();

  const [question, setQuestion] = useState("");

  const { updateChapterProgress, setCurrPage } = useChapterProgressContext();

  useEffect(() => {
    setCurrPage("activity4");
  }, []);

  return (
    <YStack margin={"$4"} gap={"$4"}>
      <Text fontSize={"$5"} lineHeight={20}>
        Keep in mind that you can allow difficult feelings to come and go
        without fighting and arguing with them. They only gain control if you
        permit it. Consider them like background noise, even if they seem loud
        at times.
      </Text>

      <Text fontSize={"$5"} lineHeight={20}>
        From our earlier discussions in parts 2 and 3, what strategies will you
        use to stay focused on your goal while traveling with your difficult
        passengers?
      </Text>

      <Input
        unstyled
        placeholder={"The strategy I would like to use ..."}
        borderColor={colors.border}
        borderWidth={3}
        borderRadius={7}
        size="$4"
        width={"100%"}
        alignSelf="center"
        value={question}
        onChangeText={setQuestion}
      />

      <ChapterNavigationButton
        prev={"/(app)/chapter4/content/activity3"}
        next={() => {
          if (question == "") {
            toast.show("Empty Input");
          } else {
            updateChapterProgress("chapter4", "activity4");
            router.push(
              "/(app)/chapter4/content/summary" as RelativePathString
            );
          }
        }}
      />
    </YStack>
  );
};

export default Activity4;
