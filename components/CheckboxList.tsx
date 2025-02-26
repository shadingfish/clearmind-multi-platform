import { Check as CheckIcon } from "@tamagui/lucide-icons";
import { useEffect, useState } from "react";
import {
  Checkbox,
  CheckboxProps,
  CheckedState,
  Text,
  View,
  XStack,
  YStack,
} from "tamagui";

interface Option {
  id: string;
  label: string;
}

interface CheckboxListProps {
  value: string[];
  onChange: (val: string[]) => void;
}

const options: Option[] = [
  { id: "option1", label: "Part 1 - Discovery" },
  { id: "option2", label: "Part 2 - Understanding" },
  { id: "option3", label: "Part 3 - Practice" },
  { id: "option4", label: "Part 4 - Determination" },
];

export default function CheckboxList({ value, onChange }: CheckboxListProps) {
  const handleSelectionChange = (checked: CheckedState, label: string) => {
    const isChecked = checked === true;
    const newSelection = isChecked
      ? [...value, label]
      : value.filter((item) => item !== label);

    onChange(newSelection);
  };

  const CheckboxWithLabel = ({
    size,
    label,
    ...checkboxProps
  }: CheckboxProps & { label?: string }) => {
    return (
      <XStack
        width={300}
        alignItems="center"
        gap="$3"
        onPress={() => handleSelectionChange(!value.includes(label!), label!)}
      >
        <Checkbox
          size={size}
          backgroundColor={"transparent"}
          borderColor={"black"}
          {...checkboxProps}
        >
          <Checkbox.Indicator>
            <CheckIcon />
          </Checkbox.Indicator>
        </Checkbox>

        <Text fontSize={"$4"}>{label}</Text>
      </XStack>
    );
  };

  return (
    <YStack marginLeft={"$5"} gap={"$2"}>
      {options.map((option, i) => (
        <View key={i}>
          <CheckboxWithLabel
            size={"$3"}
            key={option.id}
            label={option.label}
            checked={value.includes(option.label)}
            onCheckedChange={(checked) =>
              handleSelectionChange(checked, option.label)
            }
          />
        </View>
      ))}
    </YStack>
  );
}
