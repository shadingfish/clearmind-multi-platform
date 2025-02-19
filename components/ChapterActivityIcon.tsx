import { ChapterProgress } from "@/constants/data";
import { useToastController } from "@tamagui/toast";
import { RelativePathString, useRouter } from "expo-router";
import { XStack, Image, Text } from "tamagui";

export const ChapterItem: React.FC<{
  name: string;
  image: any;
  imageDone: any;
  progressIndex: keyof ChapterProgress;
  progress: ChapterProgress;
  route: RelativePathString;
}> = ({ name, image, imageDone, progressIndex, progress, route }) => {
  const router = useRouter();
  const toast = useToastController();
  const chaptersArray = Object.keys(progress)
    .sort()
    .map((key) => ({
      chapterKey: key,
      progress: progress[key],
    }));

  const isPrevActivityFinished = (chapterKey: keyof ChapterProgress) => {
    const currentIndex = chaptersArray.findIndex(
      (chapter) => chapter.chapterKey === chapterKey
    );
    console.log('isPrevActivityFinished', chapterKey, currentIndex);
    if (currentIndex > 0) {
      const prevChapter = chaptersArray[currentIndex - 1];
      return prevChapter.progress === "1";
    }
    return true;
  };

  const onPress = () => {
    if (isPrevActivityFinished(progressIndex)) {
      router.push(route);
    } else {
      toast.show("Please complete previous content first!");
    }
  };
  return (
    <XStack alignItems="center" gap={"$2"} onPress={onPress}>
      <Image source={progress[progressIndex] == "1" ? imageDone : image} />
      <Text fontSize={"$5"}>{name}</Text>
    </XStack>
  );
};
