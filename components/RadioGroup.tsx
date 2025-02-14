// components/RadioGroup.tsx
import React from "react";
import { Pressable } from "react-native";
import { YStack, XStack, Text, Label } from "tamagui";
import colors from "@/constants/colors";

type RadioGroupProps = {
  label: string;
  options: string[];
  selectedValue: string;
  onValueChange: (value: string) => void;
  error?: string;

  /** 新增，用来控制横排或竖排 */
  orientation?: "horizontal" | "vertical";
};

const RadioGroup: React.FC<RadioGroupProps> = ({
  label,
  options,
  selectedValue,
  onValueChange,
  error,
  orientation = "horizontal", // 默认横排
}) => {
  return (
    <YStack paddingTop="$5" gap="$0" width="80%">
      {/* Label */}
      <Label
        style={{
          textAlign: "left",
          lineHeight: 20,
          maxWidth: "100%",
        }}
      >
        {label}
      </Label>

      {/* 根据 orientation 来决定使用 XStack 还是 YStack */}
      {orientation === "vertical" ? (
        <YStack gap="$0" marginTop="$0">
          {options.map((option, index) => (
            <Pressable
              key={index}
              onPress={() => onValueChange(option)}
              style={{
                flexDirection: "row",
                alignItems: "center",
                paddingVertical: 4,
              }}
            >
              <YStack
                width={24}
                height={24}
                borderRadius={12}
                borderWidth={2}
                borderColor={
                  selectedValue === option
                    ? colors.primary
                    : error
                    ? "$red10"
                    : "#aaa"
                }
                alignItems="center"
                justifyContent="center"
                marginRight={8}
              >
                {selectedValue === option && (
                  <YStack
                    width={12}
                    height={12}
                    borderRadius={6}
                    backgroundColor={colors.primary}
                  />
                )}
              </YStack>
              <Text
                color={selectedValue === option ? colors.primary : "#000"}
              >
                {option}
              </Text>
            </Pressable>
          ))}
        </YStack>
      ) : (
        // 横排
        <XStack gap="$2" marginTop="$0">
          {options.map((option, index) => (
            <Pressable
              key={index}
              onPress={() => onValueChange(option)}
              style={{
                flexDirection: "row",
                alignItems: "center",
                paddingVertical: 8,
              }}
            >
              <YStack
                width={24}
                height={24}
                borderRadius={12}
                borderWidth={2}
                borderColor={
                  selectedValue === option
                    ? colors.primary
                    : error
                    ? "$red10"
                    : "#aaa"
                }
                alignItems="center"
                justifyContent="center"
                marginRight={8}
              >
                {selectedValue === option && (
                  <YStack
                    width={12}
                    height={12}
                    borderRadius={6}
                    backgroundColor={colors.primary}
                  />
                )}
              </YStack>
              <Text
                color={selectedValue === option ? colors.primary : "#000"}
              >
                {option}
              </Text>
            </Pressable>
          ))}
        </XStack>
      )}

      {/* Error Message */}
      {error && <Text color="$red10">{error}</Text>}
    </YStack>
  );
};

export default RadioGroup;