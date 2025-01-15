import { Spinner, YStack } from "tamagui";

export default function LoadingOverlay() {
  return (
    <YStack
      position="absolute"
      top={0}
      left={0}
      right={0}
      bottom={0}
      justifyContent="center"
      alignItems="center"
      backgroundColor="rgba(0, 0, 0, 0.6)"
      zIndex={1000}
    >
      <Spinner size="large" color="$white2" />
    </YStack>
  );
}
