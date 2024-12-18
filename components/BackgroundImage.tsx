// components/BackgroundImage.tsx

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

import React from "react";
import { View, Image, StyleSheet } from "react-native";

export default function BackgroundImage() {
  return (
    <View style={styles.container}>
      <Image
        source={require("../assets/images/dark_green.png")}
        style={styles.image}
        resizeMode="cover"
      />
      <Image
        source={require("../assets/images/medium_green.png")}
        style={[styles.image, styles.imageOverlap]}
        resizeMode="cover"
      />
      <Image
        source={require("../assets/images/light_green.png")}
        style={[styles.image, styles.imageOverlap]}
        resizeMode="cover"
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    position: "absolute",
    bottom: 0,
    width: "100%",
  },
  image: {
    width: "100%",
    height: 100,
  },
  imageOverlap: {
    marginTop: -10,
  },
});