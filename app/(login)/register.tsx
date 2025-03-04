// app/(login)/register.tsx

import React, { useState } from "react";
import { ScrollView, Dimensions, Alert, ActivityIndicator} from "react-native";
import { Button, Stack, YStack, Text, XStack } from "tamagui";
import { addUser, getUser, UserDataType } from "@/hooks/UserInfo";
import InputField from "../../components/InputField";
import { PrimaryButton } from "../../components/CustomButton";
import ModalScreen from "../modal";
import { LogoImage } from "@/components/LogoImage";
import colors from "@/constants/colors";
import { useFonts } from "expo-font";
import { useRouter } from "expo-router";
// import SelectField from "../../components/SelectField";
import { ref, set, get } from "firebase/database";
import { database } from "@/constants/firebaseConfig";
import RadioGroup from "../../components/RadioGroup";
import { DropdownComponent } from "@/components/Dropdown";
import { useAuth } from "@/hooks/useAuth";

const screenWidth = Dimensions.get("window").width;

export default function SignupScreen() {
  const router = useRouter();
  const { handleFirebaseRegister } = useAuth();
  const [loading, setLoading] = useState(false);

  type FormData = {
    username: string;
    password: string;
    fullName: string;
    email: string;
    question1: string;
    answer1: string;
    question2: string;
    answer2: string;
    hasTherapyExperience: string;
    therapyDetails: string;
    learningExpectation: string;
  };

  const [formData, setFormData] = useState<FormData>({
    username: "",
    password: "",
    fullName: "",
    email: "",
    question1: "",
    answer1: "",
    question2: "",
    answer2: "",
    hasTherapyExperience: "",
    therapyDetails: "",
    learningExpectation: "",
  });

  const [fontsLoaded] = useFonts({
    notoSans: require("assets/fonts/NotoSans-VariableFont_wdth,wght.ttf"),
  });

  if (!fontsLoaded) {
    return null;
  }

  // const [hasTherapyExperience, setHasTherapyExperience] = useState("");
  // const [therapyDetails, setTherapyDetails] = useState("");
  // const [learningExpectation, setLearningExpectation] = useState("");

  const [errors, setErrors] = useState<Partial<FormData>>({});
  const [modalVisible, setModalVisible] = useState(false);
  const [modalMessage, setModalMessage] = useState("");

  const updateFormData = (field: keyof FormData, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    setErrors((prev) => ({ ...prev, [field]: "" }));
  };

  const handleSubmit = async () => {
    if (loading) return;
    setLoading(true);
  
    try {
      const {
        username,
        password,
        fullName,
        email,
        question1,
        answer1,
        question2,
        answer2,
        hasTherapyExperience,
        therapyDetails,
        learningExpectation,
      } = formData;
  
      let newErrors: Partial<FormData> = {};
      if (!username) newErrors.username = "Username is required.";
      if (!password) newErrors.password = "Password is required.";
      if (!fullName) newErrors.fullName = "Full name is required.";
      if (!email) newErrors.email = "Email is required.";
      if (!answer1) newErrors.answer1 = "Answer for question 1 is required.";
      if (!answer2) newErrors.answer2 = "Answer for question 2 is required.";
      if (!hasTherapyExperience)
        newErrors.hasTherapyExperience = "Please select therapy experience.";
      if (!learningExpectation)
        newErrors.learningExpectation = "Please fill out learning expectations.";
      if (question1 === question2) {
        newErrors.answer1 = "Security questions must be different."
      }
      if (password.length < 6) {
        newErrors.password = "Password's length must be at least 6"
      }
  
  
      if (Object.keys(newErrors).length > 0) {
        setErrors(newErrors);
        alert("Please correct the highlighted errors.");
        setLoading(false);
        return;
      }
  
  
      const userData = {
        username,
        password,
        fullName,
        email,
        securityQuestions: [
          { question: question1, answer: answer1 },
          { question: question2, answer: answer2 },
        ],
        additionalInfo: {
          hasTherapyExperience,
          therapyDetails: hasTherapyExperience === "Yes" ? therapyDetails : "",
          learningExpectation,
        },
      };
  
      const user = await getUser(username, email);
      const usernameExists = user.some((u) => u.username === username.toLowerCase());
      const emailExists = user.some((u) => u.email === email.toLowerCase());
  
      if (!usernameExists && !emailExists) {
        const registerResult = await handleFirebaseRegister(email, password, username);
        await addUser(userData, registerResult.user!.uid);
        alert("Registration complete!");
        router.push("/");
      } else {
        if (usernameExists && emailExists) {
          Alert.alert("Registration Failed", "Both username and email already exist in database.");
        } else if (usernameExists) {
          Alert.alert("Registration Failed", "Username already exists in database.");
        } else if (emailExists) {
          Alert.alert("Registration Failed", "Email already exists in database.");
        }
      }
    } catch (error) {
      console.error("Registration Error:", error);
      Alert.alert("Registration Failed", "An unexpected error occurred.");
    } finally {
      setLoading(false);
    }
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
      automaticallyAdjustKeyboardInsets={true}
      contentContainerStyle={{
        flexGrow: 1,
        justifyContent: "center",
        alignItems: "center",
        padding: 16,
        width: screenWidth,
      }}
    >
      <LogoImage />
      <Text
        fontFamily="notoSans"
        fontSize="$8"
        fontWeight="bold"
        marginBottom="$4"
        color={colors.primary}
      >
        Create Your Account
      </Text>
      <YStack flex={1} alignItems="center" width="100%" gap="$2">
        <InputField
          id="email"
          label="Email"
          placeholder="Enter email"
          value={formData.email}
          error={errors.email}
          keyboardType="email-address"
          onChangeText={(text) => updateFormData("email", text)}
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
          id="username"
          label="Username"
          placeholder="Enter username"
          value={formData.username}
          error={errors.username}
          onChangeText={(text) => updateFormData("username", text)}
        />
        <InputField
          id="fullName"
          label="Full Name"
          placeholder="Enter your full name"
          value={formData.fullName}
          error={errors.fullName}
          onChangeText={(text) => updateFormData("fullName", text)}
        />
        <YStack alignSelf="center" width="80%" paddingTop="$5">
          <Text paddingBottom="$2">Security Question 1:</Text>
          <DropdownComponent
            items={secureQuestions.map((q) => ({ name: q }))}
            value={formData.question1}
            setValue={(value) => updateFormData("question1", value)}
          />
        </YStack>
        <InputField
          id="answer1"
          label="Answer for Question 1"
          placeholder="Enter answer"
          value={formData.answer1}
          error={errors.answer1}
          onChangeText={(text) => updateFormData("answer1", text)}
        />

        <YStack alignSelf="center" width="80%" paddingTop="$5">
          <Text paddingBottom="$2">Security Question 2:</Text>
          <DropdownComponent
            items={secureQuestions.map((q) => ({ name: q }))}
            value={formData.question2}
            setValue={(value) => updateFormData("question2", value)}
          />
        </YStack>
        <InputField
          id="answer2"
          label="Answer for Question 2"
          placeholder="Enter answer"
          value={formData.answer2}
          error={errors.answer2}
          onChangeText={(text) => updateFormData("answer2", text)}
        />
        <RadioGroup
          label="Have you practiced mental health therapy techniques (e.g., ACT or CBT)?"
          options={["Yes", "No"]}
          selectedValue={formData.hasTherapyExperience}
          onValueChange={(value) =>
            updateFormData("hasTherapyExperience", value)
          }
          error={errors.hasTherapyExperience}
        />
        {formData.hasTherapyExperience === "Yes" && (
          <InputField
            id="therapyDetails"
            label="Please provide details"
            placeholder="Enter details here..."
            value={formData.therapyDetails}
            onChangeText={(text) => updateFormData("therapyDetails", text)}
          />
        )}
        <InputField
          id="learningExpectation"
          label="What do you expect to learn from this app?"
          placeholder="Enter your answer here..."
          value={formData.learningExpectation}
          error={errors.learningExpectation}
          onChangeText={(text) => updateFormData("learningExpectation", text)}
        />
        <XStack gap="$8">
        {loading ? (
        <ActivityIndicator size="large" color={colors.primary} />
          ) : (
            <PrimaryButton size="$5" marginTop="$6" onPress={handleSubmit}>
              Submit
            </PrimaryButton>
          )}
          <Button
            size="$5"
            marginTop="$6"
            onPress={() => router.push("/")}
            borderRadius={30}
            fontSize={16}
          >
            Back
          </Button>
        </XStack>
        <ModalScreen
          visible={modalVisible}
          title="Notice"
          message={modalMessage}
          onClose={() => setModalVisible(false)}
        />
      </YStack>
    </ScrollView>
  );
}
