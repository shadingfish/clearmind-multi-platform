import { ReactNode } from "react";
import { Spinner, YStack } from "tamagui";

type LoadingOverlayProps = {
  children?: ReactNode;
};

export default function LoadingOverlay({ children }: LoadingOverlayProps) {
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
      {children}
    </YStack>
  );
}
