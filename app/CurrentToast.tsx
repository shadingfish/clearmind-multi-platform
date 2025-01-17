import colors from "@/constants/colors";
import { Toast, useToastController, useToastState } from "@tamagui/toast";
import { useFonts } from "expo-font";
import { Button, H4, XStack, YStack, isWeb, Image, ZStack } from "tamagui";

export function CurrentToast() {
  const currentToast = useToastState();
  // const [fontsLoaded] = useFonts({
  //   notoSans: require("../assets/fonts/NotoSans-VariableFont_wdth,wght.ttf"),
  // });

  // if (!fontsLoaded) {
  //   return null;
  // }

  if (!currentToast || currentToast.isHandledNatively) return null;

  return (
    <Toast
      key={currentToast.id}
      duration={currentToast.duration}
      viewportName={currentToast.viewportName}
      enterStyle={{ opacity: 0, scale: 0.5, y: -25 }}
      exitStyle={{ opacity: 0, scale: 1, y: -20 }}
      y={isWeb ? "$12" : 0}
      br="$6"
      // animation="quick"
    >
      <XStack
        ai="center"
        p="$3"
        gap="$3"
        backgroundColor={"#FFF"}
        borderRadius="$10"
        paddingHorizontal="$4"
        style={{
          shadowColor: "#000",
          shadowOffset: {
            width: 0,
            height: 2,
          },
          shadowOpacity: 0.25,
          shadowRadius: 3.84,
          elevation: 5,
        }}
      >
        <Image
          source={require("../assets/images/toast.png")}
          height={28}
          width={28}
        />
        <YStack gap={"$3"}>
          <Toast.Title fontSize={"$6"} fontWeight={900}>
            {currentToast.title}
          </Toast.Title>
          {!!currentToast.message && (
            <Toast.Description>{currentToast.message}</Toast.Description>
          )}
        </YStack>
      </XStack>
    </Toast>
  );
}

export function ToastControl() {
  const toast = useToastController();

  return (
    <YStack gap="$2" ai="center">
      <H4>Toast demo</H4>
      <XStack gap="$2" jc="center">
        <Button
          onPress={() => {
            toast.show("Successfully saved!", {
              message: "Don't worry, we've got your data.",
            });
          }}
        >
          Show
        </Button>
        <Button
          onPress={() => {
            toast.hide();
          }}
        >
          Hide
        </Button>
      </XStack>
    </YStack>
  );
}
