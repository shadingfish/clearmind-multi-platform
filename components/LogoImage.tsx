// components/LogoImage.tsx

import React from "react";
import { View, Image, Text, StyleSheet } from "react-native";

export default function LogoImage() {
  return (
    <View style={styles.container}>
      <Image
        source={require("../assets/images/clearmind_icon.png")}
        style={styles.logo}
      />
      <Text style={styles.title}>ClearMind</Text>
      {/* <Text style={styles.subtitle}>
        On-demand help for overcoming procrastination
      </Text> */}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    marginBottom: 16,
  },
  logo: {
    width: 96,
    height: 48,
  },
  title: {
    color: "#007F5F",
    fontSize: 24,
    fontWeight: "bold",
  },
});