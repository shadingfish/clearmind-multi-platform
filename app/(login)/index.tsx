// app/screens/MainScreen.tsx
import React, { useState } from "react";
import { View, Alert } from "react-native";
import { CustomButton } from "../../components/CustomButton";
import { InputField } from "../../components/InputField";
import BackgroundImage from "../../components/BackgroundImage";
import { useAuth } from "../../hooks/useAuth";
import { XStack } from "tamagui";
import { router } from "expo-router";
import { LogoImage } from "@/components/LogoImage";

export default function MainScreen() {
  const { handleLogin } = useAuth();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  return (
    <View style={{ flex: 1, backgroundColor: "#F1FED7" }}>
      <BackgroundImage />
      <View
        style={{
          flex: 1,
          alignItems: "center",
          justifyContent: "center",
          paddingHorizontal: 16,
        }}
      >
        <LogoImage />
        <InputField
          placeholder="Username"
          value={username}
          onChangeText={setUsername}
        />
        <InputField
          placeholder="Password"
          value={password}
          onChangeText={setPassword}
          secureTextEntry
        />
        <CustomButton
          title="Sign In"
          onPress={() => handleLogin(username, password)}
        />
        <XStack paddingHorizontal="$10">
          <CustomButton
            title="Create Account"
            onPress={() => Alert.alert("Register")}
            variant="link"
          />
          <CustomButton
            title="Forgot Password?"
            onPress={() => router.push("/forgetPassword")}
            variant="link"
          />
        </XStack>
      </View>
    </View>
  );
}
