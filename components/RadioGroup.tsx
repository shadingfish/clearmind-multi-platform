// import React, { useState } from "react";
// import { Pressable } from "react-native";
// import { YStack, Text } from "tamagui";
// import colors from "@/constants/colors";

// type RadioGroupProps = {
//   options: string[]; // 选项数组
//   selectedValue: string; // 当前选中的值
//   onValueChange: (value: string) => void; // 值变化时的回调
// };

// const RadioGroup: React.FC<RadioGroupProps> = ({
//   options,
//   selectedValue,
//   onValueChange,
// }) => {
//   return (
//     <YStack gap="$2" width="80%">
//       {options.map((option, index) => (
//         <Pressable
//           key={index}
//           onPress={() => onValueChange(option)}
//           style={{
//             flexDirection: "row",
//             alignItems: "center",
//             paddingVertical: 8,
//           }}
//         >
//           {/* 圆形选框 */}
//           <YStack
//             width={24}
//             height={24}
//             borderRadius={12}
//             borderWidth={2}
//             borderColor={
//               selectedValue === option ? colors.primary : "#aaa"
//             }
//             alignItems="center"
//             justifyContent="center"
//             marginRight={8}
//           >
//             {selectedValue === option && (
//               <YStack
//                 width={12}
//                 height={12}
//                 borderRadius={6}
//                 backgroundColor={colors.primary}
//               />
//             )}
//           </YStack>
//           {/* 选项文本 */}
//           <Text color={selectedValue === option ? colors.primary : "#000"}>
//             {option}
//           </Text>
//         </Pressable>
//       ))}
//     </YStack>
//   );
// };

// export default RadioGroup;

import React from "react";
import { Pressable } from "react-native";
import { YStack, XStack, Text, Label } from "tamagui";
import colors from "@/constants/colors";

type RadioGroupProps = {
  label: string; // Label 文本
  options: string[]; // 选项数组
  selectedValue: string; // 当前选中的值
  onValueChange: (value: string) => void; // 值变化时的回调
};

const RadioGroup: React.FC<RadioGroupProps> = ({
  label,
  options,
  selectedValue,
  onValueChange,
}) => {
  return (
    <YStack gap="$0" width="80%">
      {/* Label */}
      <Label
        style={{
          textAlign: "left", // 左对齐
          lineHeight: 20, // 单倍行距
          maxWidth: "100%", // 防止超出屏幕宽度
        }}
      >
        {label}
      </Label>
      {/* Radios */}
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
            {/* 圆形选框 */}
            <YStack
              width={24}
              height={24}
              borderRadius={12}
              borderWidth={2}
              borderColor={
                selectedValue === option ? colors.primary : "#aaa"
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
            {/* 选项文本 */}
            <Text color={selectedValue === option ? colors.primary : "#000"}>
              {option}
            </Text>
          </Pressable>
        ))}
      </XStack>
    </YStack>
  );
};

export default RadioGroup;