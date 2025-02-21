import { Check as CheckIcon } from "@tamagui/lucide-icons";
import { useState } from "react";
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
  id: string;
  onSelectionChange: (val: string[]) => void;
}

const options: Option[] = [
  { id: "option1", label: "Part 1 - Discovery" },
  { id: "option2", label: "Part 2 - Understanding" },
  { id: "option3", label: "Part 3 - Practice" },
  { id: "option4", label: "Part 4 - Determination" },
];

export default function CheckboxList({
  id,
  onSelectionChange,
}: CheckboxListProps) {
  const [selected, setSelected] = useState<string[]>([]);

  const handleSelectionChange = (checked: CheckedState, label: string) => {
    const isChecked = checked === true;
    const newSelection = isChecked
      ? [...selected, label]
      : selected.filter((item) => item !== label);

    setSelected(newSelection);
    if (onSelectionChange) {
      onSelectionChange(newSelection);
    }
  };

  const CheckboxWithLabel = ({
    id,
    size,
    label,
    ...checkboxProps
  }: CheckboxProps & { label?: string }) => {
    const checkboxId = `${label}-${id}`;
    return (
      <View>
        <XStack
          width={300}
          alignItems="center"
          gap="$3"
          onPress={() =>
            handleSelectionChange(!selected.includes(label!), label!)
          }
        >
          <Checkbox
            id={checkboxId}
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
      </View>
    );
  };

  return (
    <YStack marginLeft={"$5"} gap={"$2"}>
      {options.map((option) => (
        <CheckboxWithLabel
          id={id}
          size={"$3"}
          key={option.id}
          label={option.label}
          checked={selected.includes(option.label)}
          onCheckedChange={(checked) =>
            handleSelectionChange(checked, option.label)
          }
        />
      ))}
    </YStack>
  );
}
