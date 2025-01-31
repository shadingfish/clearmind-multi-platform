// import React from "react";
// import { View } from "react-native";
// import DarkGreen from "../assets/images/dark_green.svg";
// import MediumGreen from "../assets/images/medium_green.svg";
// import LightGreen from "../assets/images/light_green.svg";

// export default function BackgroundImage() {
//   return (
//     <View style={{ position: "absolute", bottom: 0, width: "100%" }}>
//       <DarkGreen width="100%" height={100} />
//       <MediumGreen width="100%" height={100} style={{ marginTop: -10 }} />
//       <LightGreen width="100%" height={100} style={{ marginTop: -10 }} />
//     </View>
//   );
// }

// components/BackgroundImage.tsx
import React from "react";
import { StyleSheet, Image, Dimensions } from "react-native";
import { YStack } from "tamagui";

const { width: screenWidth } = Dimensions.get("window");

export default function BackgroundImage() {
  return (
    <YStack
      position="absolute"
      width="100%"
      height="100%"
      bottom={0}
      zIndex={-1}
      justifyContent="flex-end"
    >
      <Image
        source={require("../assets/images/light_green.png")}
        style={[styles.image, { zIndex: 3 }]}
      />
      <Image
        source={require("../assets/images/medium_green.png")}
        style={[styles.image, styles.imageOverlap, { zIndex: 2 }]}
      />
      <Image
        source={require("../assets/images/dark_green.png")}
        style={[
          styles.image,
          styles.imageOverlap,
          { bottom: styles.imageOverlap.bottom * 2, zIndex: 1 },
        ]}
      />
    </YStack>
  );
}

const styles = StyleSheet.create({
  image: {
    width: screenWidth,
    height: undefined,
    aspectRatio: 1,
    alignSelf: "flex-end",
    position: "absolute",
    bottom: 0,
  },
  imageOverlap: {
    bottom: 10,
  },
});
