import React, { useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import { Dropdown } from "react-native-element-dropdown";
import Feather from "@expo/vector-icons/Feather";
import colors from "@/constants/colors";

interface DropDownProps {
  items: { name: string }[];
}

export const DropdownComponent: React.FC<DropDownProps> = ({ items }) => {
  const [value, setValue] = useState("");
  const [isFocus, setIsFocus] = useState(false);

  // @ts-ignore
  const renderItem = (item) => {
    return (
      <View style={styles.item}>
        <Text style={styles.textItem}>{item.name}</Text>
        {item.name === value && (
          <Feather style={styles.icon} name="check" size={20} color="black" />
        )}
      </View>
    );
  };

  return (
    <Dropdown
      style={[styles.dropdown]}
      placeholderStyle={styles.placeholderStyle}
      selectedTextStyle={styles.selectedTextStyle}
      itemTextStyle={styles.itemTextStyle}
      containerStyle={styles.containerStyle}
      data={items}
      maxHeight={300}
      labelField="name"
      valueField="name"
      placeholder={!isFocus ? "Select question" : "..."}
      value={value}
      onFocus={() => setIsFocus(true)}
      onBlur={() => setIsFocus(false)}
      onChange={(item) => {
        setValue(item.name);
        setIsFocus(false);
      }}
      renderItem={renderItem}
    />
  );
};

const styles = StyleSheet.create({
  dropdown: {
    maxHeight: 60,
    borderRadius: 8,
    paddingHorizontal: 8,
    paddingVertical: 5,
    backgroundColor: colors.dropdownBackground,
  },
  placeholderStyle: {
    fontSize: 16,
    color: colors.primary,
    fontWeight: 600,
  },
  selectedTextStyle: {
    fontSize: 16,
    color: colors.primary,
    fontWeight: 600,
  },
  itemTextStyle: {
    fontSize: 16,
  },
  containerStyle: {
    borderRadius: 8,
  },
  icon: {
    marginRight: 5,
  },
  item: {
    paddingHorizontal: 10,
    paddingVertical: 9,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  textItem: {
    flex: 1,
    fontSize: 16,
  },
});
