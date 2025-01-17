import { Check as CheckIcon } from "@tamagui/lucide-icons";
import type { CheckboxProps } from "tamagui";
import { Checkbox, Text, XStack, YStack } from "tamagui";

export function CheckboxWithLabel({
  id,
  size,
  label,
  ...checkboxProps
}: CheckboxProps & { label?: string }) {
  return (
    <XStack alignItems="center" gap="$3">
      <Checkbox
        id={id}
        size={size}
        borderColor={"black"}
        backgroundColor="#ffffff"
        {...checkboxProps}
      >
        <Checkbox.Indicator>
          <CheckIcon />
        </Checkbox.Indicator>
      </Checkbox>

      <Text fontSize={"$5"}>{label}</Text>
    </XStack>
  );
}
