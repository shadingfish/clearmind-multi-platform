// app/modal.tsx

import { PrimaryButton } from "@/components/CustomButton";
import React, { ReactNode }  from "react";
import { Paragraph, Text, View, YStack } from "tamagui";

type ModalScreenProps = {
  visible: boolean;
  title: string;
  message: string;
  onClose: () => void;
  children?: ReactNode;
};

export default function ModalScreen({
  visible,
  title,
  message,
  onClose,
  children
}: ModalScreenProps) {
  if (!visible) return null;

  return (
    <View
      position="absolute"
      top={0}
      left={0}
      right={0}
      bottom={0}
      backgroundColor="rgba(0, 0, 0, 0.5)"
      alignItems="center"
      justifyContent="center"
      zIndex={10}
    >
      <YStack
        width="90%"
        maxWidth={400}
        backgroundColor="$background"
        padding="$4"
        borderRadius="$4"
        shadowColor="$shadowColor"
        shadowOpacity={0.2}
        shadowRadius={10}
      >
        <Text
          fontFamily="$body"
          fontSize="$8"
          fontWeight="bold"
          textAlign="center"
          marginBottom="$2"
        >
          {title}
        </Text>
        <Paragraph fontFamily="$body" textAlign="center" marginBottom="$4">
          {message}
        </Paragraph>
        {children}
        <PrimaryButton size="$4" alignSelf="center" onPress={onClose}>
          Close
        </PrimaryButton>
      </YStack>
    </View>
  );
}
