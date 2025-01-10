// components/LogoImage.tsx

import React from "react";
import { Image, Stack, Text } from "tamagui";
import { useFonts } from "expo-font";

interface LogoImageProps {
  size?: "sm" | "lg";
}

export const LogoImage: React.FC<LogoImageProps> = ({ size = "lg" }) => {
  const [fontsLoaded] = useFonts({
    delius: require("../assets/fonts/delius_swash_caps.ttf"),
  });
  return (
    <Stack alignItems="center" position="relative">
      {/* Logo */}
      <Image
        source={require("../assets/images/clearmind_icon.png")}
        width={size == "sm" ? "80%" : "100%"}
        height="auto"
        aspectRatio={2}
        objectFit="contain"
      />
      {/* Title */}
      <Text
        fontSize={size == "sm" ? "$9" : "$10"}
        fontWeight="bold"
        fontFamily="delius"
        color="$primary"
      >
        ClearMind
      </Text>
    </Stack>
  );
};
