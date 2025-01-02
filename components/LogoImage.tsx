// components/LogoImage.tsx

import React from "react";
import { Image, Stack, Text } from "tamagui";
import colors from "../constants/colors";
import { useFonts } from "expo-font";

export default function LogoImage() {
  const [fontsLoaded] = useFonts({
    delius: require("../assets/fonts/delius_swash_caps.ttf"),
  });
  return (
    <Stack 
    alignItems="center" 
    position="relative"
    >
      {/* Logo */}
      <Image
        source={require("../assets/images/clearmind_icon.png")}
        width="100%"
        height="auto"
        aspectRatio={2}
        objectFit="contain"
      />
      {/* Title */}
      <Text fontSize="$10" fontWeight="bold" fontFamily="delius" color={colors.primary}>
        ClearMind
      </Text>
    </Stack>
  );
}