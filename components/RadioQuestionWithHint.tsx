// app/components/RadioQuestionWithHint.tsx

import React, { useState } from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { RadioButton } from "react-native-paper";
import colors from "@/constants/colors";

export interface RadioQuestionProps {
  question: string;
  options: string[];
  correctOptionIndex: number; // Index of the correct option (0-based)
  hint?: string;
  onAnswer?: (isCorrect: boolean, selectedOption: string) => void;
}

const RadioQuestionWithHint: React.FC<RadioQuestionProps> = ({
  question,
  options,
  correctOptionIndex,
  hint,
  onAnswer,
}) => {
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);
  const [showHint, setShowHint] = useState<boolean>(false);
  const [feedback, setFeedback] = useState<string>("");
  const [feedbackColor, setFeedbackColor] = useState<string>(colors.incorrect);

  const handleSelection = (index: number) => {
    setSelectedIndex(index);
    const isCorrect = index === correctOptionIndex;

    if (isCorrect) {
      setFeedback("Good job! That is the correct answer.");
      setFeedbackColor(colors.correct);
    } else {
      setFeedback("Not quite right! Please try again.");
      setFeedbackColor(colors.incorrect);
    }

    if (onAnswer) {
      onAnswer(isCorrect, options[index]);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.questionText}>{question}</Text>

      {hint && (
        <TouchableOpacity
          style={styles.hintButton}
          onPress={() => setShowHint(!showHint)}
        >
          <Text style={styles.hintButtonText}>
            {showHint ? "Hide Hint" : "Show Hint"}
          </Text>
        </TouchableOpacity>
      )}

      {showHint && hint && (
        <View style={styles.hintContainer}>
          <Text style={styles.hintText}>{hint}</Text>
        </View>
      )}

      <RadioButton.Group
        onValueChange={(value) => handleSelection(Number(value))}
        value={selectedIndex !== null ? selectedIndex.toString() : ""}
      >
        {options.map((option, index) => (
          <View key={index} style={styles.optionContainer}>
            <RadioButton
              value={index.toString()}
              status={selectedIndex === index ? "checked" : "unchecked"}
              onPress={() => handleSelection(index)}
              color={colors.primary}
            />
            <Text style={styles.optionText}>{option}</Text>
          </View>
        ))}
      </RadioButton.Group>

      {feedback !== "" && (
        <Text style={[styles.feedbackText, { color: feedbackColor }]}>
          {feedback}
        </Text>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginVertical: 10,
    padding: 15,
    backgroundColor: "#FFFFFF",
    borderRadius: 5, // Slightly rounded corners
  },
  questionText: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 10,
    color: "#000000",
  },
  hintButton: {
    alignSelf: "flex-end",
    marginBottom: 10,
  },
  hintButtonText: {
    color: colors.hintColor,
    textDecorationLine: "underline",
  },
  hintContainer: {
    backgroundColor: "#F0F0F0",
    padding: 10,
    borderRadius: 5,
    marginBottom: 10,
  },
  hintText: {
    color: "#388e3c",
    fontSize: 14,
  },
  optionContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 5,
  },
  optionText: {
    fontSize: 14,
    color: "#000000",
  },
  feedbackText: {
    marginTop: 10,
    fontSize: 14,
    fontWeight: "bold",
  },
});

export default RadioQuestionWithHint;
