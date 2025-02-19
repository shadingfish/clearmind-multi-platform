import colors from "@/constants/colors";
import AntDesign from "@expo/vector-icons/AntDesign";
import { RelativePathString, useRouter } from "expo-router";
import { Button, View, XStack } from "tamagui";

interface ChapterNavigationButtonProps {
  prev?: string;
  next?: () => void;
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
        onPress={() => router.push(prev as RelativePathString)}
      >
        <View marginHorizontal={"$3"} marginRight={"$5"}>
          <AntDesign name="doubleleft" size={20} color="white" />
        </View>
      </Button>

      {/* Conditionally render next button */}
      {next && (
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
      )}
    </XStack>
  );
};
