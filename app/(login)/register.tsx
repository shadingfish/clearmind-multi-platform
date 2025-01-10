// app/(login)/register.tsx

import React, { useState } from "react";
import { ScrollView, Dimensions } from "react-native";
import { Button, Input, Stack, YStack, Label, Text } from "tamagui";
import InputField from "../../components/InputField";
import { PrimaryButton } from "../../components/CustomButton";
import ModalScreen from "../modal";
import { LogoImage } from "../../components/LogoImage";
import colors from "@/constants/colors";
import { useFonts } from "expo-font";
import { useRouter } from "expo-router";
import SelectField from "../../components/SelectField";
import { ref, set, get, child } from "firebase/database";
import { database } from "@/constants/firebaseConfig";


const screenWidth = Dimensions.get("window").width;

export default function SignupScreen() {
    const router = useRouter();

    type FormData = {
      username: string;
      password: string;
      fullName: string;
      email: string;
      question1: string;
      answer1: string;
      question2: string;
      answer2: string;
    };
  
    type FormErrors = Partial<Record<keyof FormData, string>>;
  
    const [formData, setFormData] = useState<FormData>({
      username: "",
      password: "",
      fullName: "",
      email: "",
      question1: "",
      answer1: "",
      question2: "",
      answer2: "",
    });

    const [fontsLoaded] = useFonts({
        notoSans: require("../../assets/fonts/NotoSans-VariableFont_wdth,wght.ttf"),
      });
    
      if (!fontsLoaded) {
        return null;
      }
  
    const [errors, setErrors] = useState<FormErrors>({});
    const [modalVisible, setModalVisible] = useState(false);
    const [modalMessage, setModalMessage] = useState("");
  
    const updateFormData = (field: keyof FormData, value: string) => {
      setFormData((prev) => ({ ...prev, [field]: value }));
      setErrors((prev) => ({ ...prev, [field]: "" }));
    };
  
    const handleSubmit = () => {
      const { username, password, fullName, email, question1, answer1, question2, answer2 } = formData;
  
      let newErrors: FormErrors = {};
  
      if (!username) newErrors.username = "Username is required.";
      if (!password) newErrors.password = "Password is required.";
      if (!fullName) newErrors.fullName = "Full name is required.";
      if (!email) newErrors.email = "Email is required.";
      if (question1 === question2) newErrors.question2 = "Security questions must be different.";
      if (!answer1) newErrors.answer1 = "Answer for question 1 is required.";
      if (!answer2) newErrors.answer2 = "Answer for question 2 is required.";
  
      if (Object.keys(newErrors).length > 0) {
        setErrors(newErrors);
        setModalMessage("Please correct the highlighted errors.");
        setModalVisible(true);
        return;
      }
    
      const userRef = ref(database, `users/${username}`);
      get(userRef)
        .then((snapshot) => {
          if (snapshot.exists()) {
            console.error("Username already exists.");
            setModalMessage("Username already exists. Please choose a different one.");
            setModalVisible(true);
          } else {
            const userData = {
              username,
              password,
              fullName,
              email,
              securityQuestions: [
                { question: question1, answer: answer1 },
                { question: question2, answer: answer2 },
              ],
            };
    
            set(userRef, userData)
              .then(() => {
                console.log("User data successfully saved.");
                setModalMessage("Registration complete!");
                setModalVisible(true);
              })
              .catch((error) => {
                console.error("Error saving user data: ", error);
                setModalMessage("Failed to save user data. Please try again.");
                setModalVisible(true);
              });
          }
        })
        .catch((error) => {
          console.error("Error checking username existence: ", error);
          setModalMessage("An error occurred while checking username. Please try again.");
          setModalVisible(true);
        });
    };

    const secureQuestions = [
        "In what city were you born?",
        "What is the name of your pet?",
        "What high school did you attend?",
        "What College/University did you attend?",
        "What is your major in school?",
        "What was your first car?",
        "What was your favorite food?",
        "What is your favorite color?",
      ];
      
  
    return (
      <ScrollView
        contentContainerStyle={{
          flexGrow: 1,
          justifyContent: "center",
          alignItems: "center",
          padding: 16,
          width: screenWidth
        }}
      >
        <LogoImage />
        <Text fontFamily="notoSans" fontSize="$8" fontWeight="bold" marginBottom="$4" color={colors.primary}>
        Create Your Account
        </Text>
        <YStack flex={1} alignItems="center" width="100%" justifyContent="center" marginTop="$4" gap="$2">
            <InputField
              id="username"
              label="Username"
              placeholder="Enter username"
              value={formData.username}
              error={errors.username}
              onChangeText={(text) => updateFormData("username", text)}
            />
            <InputField
              id="password"
              label="Password"
              placeholder="Enter password"
              value={formData.password}
              error={errors.password}
              secureTextEntry
              onChangeText={(text) => updateFormData("password", text)}
            />
            <InputField
              id="fullName"
              label="Full Name"
              placeholder="Enter your full name"
              value={formData.fullName}
              error={errors.fullName}
              onChangeText={(text) => updateFormData("fullName", text)}
            />
            <InputField
              id="email"
              label="Email"
              placeholder="Enter email"
              value={formData.email}
              error={errors.email}
              keyboardType="email-address"
              onChangeText={(text) => updateFormData("email", text)}
            />
            {/* Question 1 */}
            <SelectField
                id="question1"
                label="Security Question 1"
                selectedValue={formData.question1}
                onValueChange={(value) => updateFormData("question1", value)}
                options={secureQuestions}
                error={errors.question1}
            />
            {/* Answer 1 */}
            <InputField
                id="answer1"
                label="Answer for Question 1"
                placeholder="Enter answer"
                value={formData.answer1}
                error={errors.answer1}
                onChangeText={(text) => updateFormData("answer1", text)}
            />
            {/* Question 2 */}
            <SelectField
                id="question2"
                label="Security Question 2"
                selectedValue={formData.question2}
                onValueChange={(value) => updateFormData("question2", value)}
                options={secureQuestions}
                error={errors.question2}
            />
            {/* Answer 2 */}
            <InputField
                id="answer2"
                label="Answer for Question 2"
                placeholder="Enter answer"
                value={formData.answer2}
                error={errors.answer2}
                onChangeText={(text) => updateFormData("answer2", text)}
            />
          <PrimaryButton size="$5" marginTop="$6" onPress={handleSubmit}>
            Submit
          </PrimaryButton>
  
          <ModalScreen
            visible={modalVisible}
            title="Notice"
            message={modalMessage}
            onClose={() => {
              setModalVisible(false);
              if (modalMessage === "Registration complete!") {
                router.push({
                  pathname: "/registerAdditional",
                  params: {
                    username: formData.username,
                    password: formData.password,
                    fullName: formData.fullName,
                    email: formData.email,
                  },
                });
              }
            }}
          />

        </YStack>
      </ScrollView>
    );
  }