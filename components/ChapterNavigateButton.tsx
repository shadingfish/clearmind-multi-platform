import colors from "@/constants/colors";
import { Button, View, XStack } from "tamagui";
import AntDesign from "@expo/vector-icons/AntDesign";
import { useRouter } from "expo-router";

interface ChapterNavigationButtonProps {
  prev: () => void;
  next: () => void;
}

export const ChapterNavigationButton: React.FC<
  ChapterNavigationButtonProps
> = ({ prev, next }) => {
  const router = useRouter();
  return (
    <XStack justifyContent="space-between">
      <Button
        unstyled
        backgroundColor={colors.headerBackground}
        borderRadius={3}
        justifyContent="center"
        alignItems="center"
        height={"$3"}
        onPress={prev}
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
        onPress={next}
      >
        <View marginHorizontal={"$3"} marginLeft={"$5"}>
          <AntDesign name="doubleright" size={20} color="white" />
        </View>
      </Button>
    </XStack>
  );
};
