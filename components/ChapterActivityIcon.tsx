import { ChapterProgress } from "@/constants/data";
import { useToastController } from "@tamagui/toast";
import { RelativePathString, useRouter } from "expo-router";
import { XStack, Image, Text } from "tamagui";

export const ChapterItem: React.FC<{
  name: string;
  image: any;
  imageDone: any;
  //add chaptername
  chapterKey: string;
  activityKey: string; //opening, activity1, ..., summary
  progress: Record<string, Record<string, boolean>>; //instead just pass the chapterProgressData object
  route: RelativePathString;
}> = ({ name, image, imageDone, chapterKey, activityKey, progress, route }) => {
  const router = useRouter();
  const toast = useToastController();
  /* const chaptersArray = Object.keys(progress).map((key) => ({
    chapterKey: key,
    progress: progress[key],
  })); */

  /* const isPrevActivityFinished = (chapterKey: keyof ChapterProgress) => {
    const currentIndex = chaptersArray.findIndex(
      (chapter) => chapter.chapterKey === chapterKey
    );
    if (currentIndex > 0) {
      const prevChapter = chaptersArray[currentIndex - 1];
      return prevChapter.progress === "1";
    }
    return true;
  }; */

  /* const isPrevActivityFinished = () => {
    const chapter2Keys = Object.keys(progress[chapterKey]);
    const index = chapter2Keys.indexOf(activityKey);
    if (progress[chapterKey][activityKey]) {
      return true;
    }
    else {
      return false
    }
  }; */


  const onPress = () => {
    if (progress[chapterKey][activityKey] || activityKey == "opening") {
      router.push(route);
    } else {
      toast.show("Please complete previous content first!");
    }
  };
  return (
    <XStack alignItems="center" gap={"$2"} onPress={onPress}>
      <Image source={progress[chapterKey][activityKey] ? imageDone : image} />
      <Text fontSize={"$4"}>{name}</Text>
    </XStack>
  );
};
