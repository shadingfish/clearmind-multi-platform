import React, { useState } from "react";
import { ScrollView, Dimensions } from "react-native";
import { YStack, Label, Text } from "tamagui";
import InputField from "../../components/InputField";
import RadioGroup from "../../components/RadioGroup"; // 引入自定义的 RadioGroup
import { PrimaryButton } from "../../components/CustomButton";
import LogoImage from "../../components/LogoImage";
import colors from "@/constants/colors";
import { useRouter } from "expo-router";

const screenWidth = Dimensions.get("window").width;

export default function AdditionalInfoScreen() {
  const router = useRouter();
  const [hasTherapyExperience, setHasTherapyExperience] = useState(""); // Yes/No 选项
  const [therapyDetails, setTherapyDetails] = useState(""); // 详细信息
  const [learningExpectation, setLearningExpectation] = useState(""); // 学习期望

  const handleSubmit = () => {
    if (!hasTherapyExperience || !learningExpectation) {
      alert("Please complete all required fields.");
      return;
    }

    console.log("Submitted data:", {
      hasTherapyExperience,
      therapyDetails: hasTherapyExperience === "Yes" ? therapyDetails : "",
      learningExpectation,
    });

    router.push({
        pathname: "/",
      });
  };

  return (
    <ScrollView
      contentContainerStyle={{
        flexGrow: 1,
        justifyContent: "center",
        alignItems: "center",
        padding: 16,
        width: screenWidth,
      }}
    >
      {/* Logo and Title */}
      <LogoImage />
      <Text fontFamily="notoSans" fontSize="$8" fontWeight="bold" marginBottom="$4" color={colors.primary}>
        Additional Information
      </Text>

      {/* Form */}
      <YStack flex={1} alignItems="center" width="100%" justifyContent="center" marginTop="$4" gap="$2">
        {/* Therapy Experience */}
        <RadioGroup
          label="Have you practiced mental health therapy techniques (e.g., ACT or CBT)?"
          options={["Yes", "No"]}
          selectedValue={hasTherapyExperience}
          onValueChange={setHasTherapyExperience}
        />

        {/* Additional details for "Yes" */}
        {hasTherapyExperience === "Yes" && (
          <InputField
            id="therapyDetails"
            label="Please provide details"
            placeholder="Enter details here..."
            value={therapyDetails}
            onChangeText={(text) => setTherapyDetails(text)}
          />
        )}

        {/* Learning Expectation */}
        <InputField
          id="learningExpectation"
          label="What do you expect to learn from this app?"
          placeholder="Enter your answer here..."
          value={learningExpectation}
          onChangeText={(text) => setLearningExpectation(text)}
        />

        {/* Submit Button */}
        <PrimaryButton size="$5" marginTop="$6" onPress={handleSubmit}>
          Submit
        </PrimaryButton>
      </YStack>
    </ScrollView>
  );
}
