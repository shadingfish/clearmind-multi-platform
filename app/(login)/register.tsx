// app/(app)/register.tsx

import { LogoImage } from "@/components/LogoImage";
import colors from "@/constants/colors";
import { useAuth } from "@/hooks/useAuth";
import { addUser, getUser, UserDataType } from "@/hooks/UserInfo";
import { useFonts } from "expo-font";
import { useRouter } from "expo-router";
import React, { useState } from "react";
import { Alert, Dimensions, ScrollView } from "react-native";
import { Button, Text, XStack, YStack } from "tamagui";
import { PrimaryButton } from "../../components/CustomButton";
import InputField from "../../components/InputField";
import RadioGroup from "../../components/RadioGroup";
import ModalScreen from "../modal";

const screenWidth = Dimensions.get("window").width;

export default function SignupScreen() {
  const router = useRouter();
  const { handleFirebaseRegister } = useAuth();

  const [formData, setFormData] = useState<UserDataType>({
    username: "",
    password: "",
    fullName: "",
    email: "",
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

  const [errors, setErrors] = useState<Partial<UserDataType>>({});
  const [modalVisible, setModalVisible] = useState(false);
  const [modalMessage, setModalMessage] = useState("");

  const updateFormData = (field: keyof UserDataType, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    setErrors((prev) => ({ ...prev, [field]: "" }));
  };

  const handleSubmit = async () => {
    const {
      username,
      password,
      fullName,
      email,
      hasTherapyExperience,
      therapyDetails,
      learningExpectation,
    } = formData;

    let newErrors: Partial<UserDataType> = {};
    if (!username) newErrors.username = "Username is required.";
    if (!password) newErrors.password = "Password is required.";
    if (!fullName) newErrors.fullName = "Full name is required.";
    if (!email) newErrors.email = "Email is required.";
    if (!hasTherapyExperience)
      newErrors.hasTherapyExperience = "Please select therapy experience.";
    if (!learningExpectation)
      newErrors.learningExpectation = "Please fill out learning expectations.";

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      setModalMessage("Please correct the highlighted errors.");
      setModalVisible(true);
      return;
    }

    const userData = {
      username,
      password,
      fullName,
      email,
      hasTherapyExperience,
      therapyDetails: hasTherapyExperience === "Yes" ? therapyDetails : "",
      learningExpectation,
    };

    const user = await getUser(username, email);
    const usernameExists = user.some(
      (user) => user.username === username.toLowerCase()
    );
    const emailExists = user.some((user) => user.email === email.toLowerCase());

    if (!usernameExists && !emailExists) {
      const registerResult = await handleFirebaseRegister(
        email,
        password,
        username
      );
      await addUser(userData, registerResult.user!.uid);
      alert("Registration complete!");
      router.push("/");
    } else {
      if (usernameExists && emailExists) {
        Alert.alert(
          "Registration Failed",
          "Both username and email already exist in database."
        );
        return;
      } else if (usernameExists) {
        Alert.alert(
          "Registration Failed",
          "Username already exists in database."
        );
        return;
      } else if (emailExists) {
        Alert.alert("Registration Failed", "Email already exists in database.");
        return;
      }
    }

    // const userRef = ref(database, `users/${username}`);

    // try {
    //   const snapshot = await get(userRef);
    //   if (snapshot.exists()) {
    //     // setModalMessage("Username already exists. Please choose a different one.");
    //     // setModalVisible(true);
    //     alert("Username already exists. Please choose a different one.");
    //     return;
    //   }

    //   const registerResult = await handleFirebaseRegister(email, password);
    //   if (!registerResult.success) {
    //     // setModalMessage("Failed to register Firebase account. Please try again.");
    //     // setModalVisible(true);
    //     console.log(registerResult.error);
    //     return;
    //   }

    //   await set(userRef, userData);
    //   alert("Registration complete!");
    //   router.push("/");
    // } catch (error) {
    //   setModalMessage("An unexpected error occurred. Please try again.");
    //   setModalVisible(true);
    // }
  };

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
          <PrimaryButton size="$5" marginTop="$6" onPress={handleSubmit}>
            Submit
          </PrimaryButton>
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
