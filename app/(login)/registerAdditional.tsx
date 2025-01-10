// app/(login)/registerAdditional.tsx

import React, { useState } from "react";
import { ScrollView, Dimensions } from "react-native";
import { YStack, Stack, Text } from "tamagui";
import InputField from "../../components/InputField";
import RadioGroup from "../../components/RadioGroup";
import { PrimaryButton } from "../../components/CustomButton";
import { LogoImage } from "../../components/LogoImage";
import colors from "@/constants/colors";
import { useRouter, useLocalSearchParams } from "expo-router";
import { ref, update } from "firebase/database";
import { database } from "@/constants/firebaseConfig";

const screenWidth = Dimensions.get("window").width;

export default function AdditionalInfoScreen() {
  const router = useRouter();
  const [hasTherapyExperience, setHasTherapyExperience] = useState(""); 
  const [therapyDetails, setTherapyDetails] = useState(""); 
  const [learningExpectation, setLearningExpectation] = useState(""); 
  const { username } = useLocalSearchParams();

  const handleSubmit = () => {
    if (!hasTherapyExperience || !learningExpectation) {
      alert("Please complete all required fields.");
      return;
    }
  
    const additionalInfoRef = ref(database, `users/${username}/additionalInfo`);
  
    const additionalData = {
      hasTherapyExperience,
      therapyDetails: hasTherapyExperience === "Yes" ? therapyDetails : "",
      learningExpectation,
    };
  
    update(additionalInfoRef, additionalData)
      .then(() => {
        console.log("Additional information successfully saved.");
        alert("Thank you! Your information has been submitted.");
        router.push({
          pathname: "/",
        });
      })
      .catch((error) => {
        console.error("Error saving additional information: ", error);
        alert("Failed to save additional information. Please try again.");
      });
  };

  return (
    <ScrollView
      contentContainerStyle={{
        flexGrow: 1,
        justifyContent: "center",
        alignItems: "center",
        padding: 10,
        width: screenWidth,
      }}
    >
      {/* Logo and Title */}
      <LogoImage />
      <Text fontFamily="notoSans" fontSize="$8" fontWeight="bold" marginBottom="$0" color={colors.primary}>
        Additional Information
      </Text>

      {/* Form */}
      <YStack flex={1} alignItems="center" width="100%" justifyContent="center" marginTop="$0" gap="$6">
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
          Next
        </PrimaryButton>
      </YStack>
    </ScrollView>
  );
}
