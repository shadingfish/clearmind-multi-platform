import colors from "@/constants/colors";
import { Button, View, XStack } from "tamagui";
import AntDesign from "@expo/vector-icons/AntDesign";
import { RelativePathString, useRouter } from "expo-router";
import { updateChapter2Progress } from "@/hooks/UserActivity";

interface ChapterNavigationButtonProps {
  prev: string;
  next: string;
  username: string;
  progress_index: string;
  canGoNext?: boolean;
  failAction?: () => void;
}

export const ChapterNavigationButton: React.FC<
  ChapterNavigationButtonProps
> = ({
  prev,
  next,
  username,
  progress_index,
  canGoNext = true,
  failAction = () => {},
}) => {
  const router = useRouter();
  const onPressNext = () => {
    try {
      if (canGoNext) {
        router.push(next as RelativePathString);
        updateChapter2Progress(username, progress_index);
      } else {
        failAction();
        console.log("here");
      }
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <XStack justifyContent="space-between">
      <Button
        unstyled
        backgroundColor={colors.headerBackground}
        borderRadius={3}
        justifyContent="center"
        alignItems="center"
        height={"$3"}
        onPress={() => router.push(prev as RelativePathString)}
      >
        <View marginHorizontal={"$3"} marginRight={"$5"}>
          <AntDesign name="doubleleft" size={20} color="white" />
        </View>
      </Button>

      <Button
        unstyled
        backgroundColor={colors.headerBackground}
        borderRadius={3}
        justifyContent="center"
        alignItems="center"
        height={"$3"}
        onPress={onPressNext}
      >
        <View marginHorizontal={"$3"} marginLeft={"$5"}>
          <AntDesign name="doubleright" size={20} color="white" />
        </View>
      </Button>
    </XStack>
  );
};
