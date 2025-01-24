// components/InputField.tsx

import React, { useState } from "react";
import { Input, YStack, Label, Text } from "tamagui";
import colors from "@/constants/colors";
import {View} from "react-native";

type InputFieldProps = {
  id: string;
  label?: string;
  placeholder: string;
  value: string;
  error?: string;
  onChangeText: (text: string) => void;
  secureTextEntry?: boolean;
  keyboardType?: "default" | "email-address" | "numeric" | "phone-pad";
};

const InputField: React.FC<InputFieldProps> = ({
  id,
  label,
  placeholder,
  value,
  error,
  onChangeText,
  secureTextEntry = false,
  keyboardType = "default",
}) => {
  const [isFocused, setIsFocused] = useState(false);

  return (
    <YStack gap="$0" width="80%">
      {label ? <Label htmlFor={id}>{label}</Label> : <View/>}
      <Input
        flex={1}
        width="100%" 
        id={id}
        placeholder={placeholder}
        value={value}
        onChangeText={onChangeText}
        secureTextEntry={secureTextEntry}
        keyboardType={keyboardType}
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
        borderColor={
          isFocused
            ? colors.primary
            : error
            ? "$red10"
            : "transparent"
        }
        borderWidth={isFocused || error ? 2 : 0}
        padding="$2"
        borderRadius="$2"
      />
      {error && <Text color="$red10">{error}</Text>}
    </YStack>
  );
};

export default InputField;