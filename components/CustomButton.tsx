// components/CustomButton.tsx

import React from "react";
import { Button } from "tamagui";
import colors from "../constants/colors";

type CustomButtonProps = {
  title?: string; 
  onPress?: () => void; 
  size?: string;
  backgroundColor?: string;
  color?: string; 
  fontWeight?: string; 
  padding?: string,
  children?: React.ReactNode; 
  [key: string]: any; 
};

export const CustomButton: React.FC<CustomButtonProps> = ({
  title,
  onPress = () => {},
  size = "$4",
  backgroundColor = colors.primary,
  color = colors.secondary,
  fontWeight = "bold",
  padding,
  children,
  ...rest
}) => {
  return (
    <Button
      size={size}
      padding={padding}
      color={color}
      fontWeight={fontWeight}
      backgroundColor={backgroundColor}
      onPress={onPress}
      borderRadius={30}
      {...rest}
    >
      {children || title}
    </Button>
  );
};

export const PrimaryButton: React.FC<CustomButtonProps> = ({
  title,
  onPress,
  size,
  children,
  ...rest
}) => (
  <CustomButton
    title={title}
    onPress={onPress}
    size={size}
    fontWeight={"bold"}
    {...rest}
  >
    {children}
  </CustomButton>
);

export const SecondaryButton: React.FC<CustomButtonProps> = ({
  title,
  onPress,
  size,
  children,
  ...rest
}) => (
  <CustomButton
    title={title}
    onPress={onPress}
    size={size}
    backgroundColor="#6C757D"
    color="#FFFFFF"
    {...rest}
  >
    {children}
  </CustomButton>
);

export const DangerButton: React.FC<CustomButtonProps> = ({
  title,
  onPress,
  size,
  children,
  ...rest
}) => (
  <CustomButton
    title={title}
    onPress={onPress}
    size={size}
    backgroundColor="#DC3545"
    color="#FFFFFF"
    {...rest}
  >
    {children}
  </CustomButton>
);