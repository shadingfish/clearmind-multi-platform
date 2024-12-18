// components/CustomButton.tsx

import React from "react";
import { Text, TouchableOpacity, StyleSheet } from "react-native";

interface ButtonProps {
  title: string;
  onPress: () => void;
  variant?: "solid" | "link";
}

export const CustomButton: React.FC<ButtonProps> = ({
  title,
  onPress,
  variant = "solid",
}) => {
  return (
    <TouchableOpacity
      onPress={onPress}
      style={[
        styles.button,
        variant === "solid" ? styles.solid : styles.link,
      ]}
    >
      <Text style={[styles.text, variant === "solid" ? styles.solidText : styles.linkText]}>
        {title}
      </Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    width: "100%",
    paddingVertical: 12,
    borderRadius: 8,
    marginVertical: 8,
  },
  solid: {
    backgroundColor: "#007F5F",
  },
  link: {
    backgroundColor: "transparent",
  },
  text: {
    textAlign: "center",
    fontSize: 16,
  },
  solidText: {
    color: "#FFFFFF",
  },
  linkText: {
    color: "#007F5F",
  },
});