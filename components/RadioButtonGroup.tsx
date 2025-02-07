import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { RadioButton } from "react-native-paper";

interface RadioButtonGroupProps {
  options: string[];
  question: string;
  setQuestion: (value: string) => void;
}

const RadioButtonGroup: React.FC<RadioButtonGroupProps> = ({
  options,
  question,
  setQuestion,
}) => {
  return (
    <View>
      <View style={styles.radioGroup}>
        {options.map((option, index) => (
          <View style={styles.radioButton} key={index}>
            <RadioButton.Android
              value={option}
              status={question === option ? "checked" : "unchecked"}
              onPress={() => setQuestion(option)} // useState
              color="#1EB688"
            />
            <Text style={styles.radioLabel}>{option}</Text>
          </View>
        ))}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  radioGroup: {
    flexDirection: "row", // change to column for vertical
    paddingHorizontal: "5%",
    marginTop: 5,
  },
  radioButton: {
    flexDirection: "row", // label is in line horizontally with button
    alignItems: "center",
    marginLeft: "5%",
  },
  radioLabel: {
    fontSize: 16,
    color: "#333",
  },
});

export default RadioButtonGroup;
