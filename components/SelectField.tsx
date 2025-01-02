import React, { useState } from "react";
import { Modal, TouchableOpacity, View, FlatList, Text } from "react-native";
import { YStack, Label } from "tamagui";
import colors from "@/constants/colors";

type SelectFieldProps = {
  id: string;
  label: string;
  selectedValue: string;
  onValueChange: (value: string) => void;
  options: string[];
  error?: string;
};

const SelectField: React.FC<SelectFieldProps> = ({
  id,
  label,
  selectedValue,
  onValueChange,
  options,
  error,
}) => {
  const [isModalVisible, setModalVisible] = useState(false);

  const handleSelect = (value: string) => {
    onValueChange(value);
    setModalVisible(false);
  };

  return (
    <YStack gap="$1" width="80%">
      <Label htmlFor={id}>{label}</Label>

      <TouchableOpacity
        onPress={() => setModalVisible(true)}
        style={{
          borderBottomWidth: 1,
          borderBottomColor: error ? "$red10" : colors.primary,
          paddingVertical: 10,
        }}
      >
        <Text style={{ color: selectedValue ? "#000" : "#aaa" }}>
          {selectedValue || "Select an option..."}
        </Text>
      </TouchableOpacity>

      {error && <Text style={{ color: "$red10", marginTop: 4 }}>{error}</Text>}

      <Modal
        visible={isModalVisible}
        animationType="slide"
        transparent={true}
        onRequestClose={() => setModalVisible(false)}
      >
        <View
          style={{
            flex: 1,
            justifyContent: "center",
            alignItems: "center",
            backgroundColor: "rgba(0, 0, 0, 0.5)",
          }}
        >
          <View
            style={{
              backgroundColor: "#fff",
              width: "80%",
              borderRadius: 8,
              padding: 16,
            }}
          >
            <Text
              style={{
                fontWeight: "bold",
                fontSize: 16,
                marginBottom: 16,
                textAlign: "center",
              }}
            >
              Select an Option
            </Text>

            <FlatList
              data={options}
              keyExtractor={(item, index) => index.toString()}
              renderItem={({ item }) => (
                <TouchableOpacity
                  onPress={() => handleSelect(item)}
                  style={{
                    paddingVertical: 12,
                    borderBottomWidth: 1,
                    borderBottomColor: "#eee",
                  }}
                >
                  <Text style={{ fontSize: 14, color: "#000" }}>{item}</Text>
                </TouchableOpacity>
              )}
            />

            <TouchableOpacity
              onPress={() => setModalVisible(false)}
              style={{
                marginTop: 16,
                padding: 10,
                alignSelf: "center",
              }}
            >
              <Text style={{ color: colors.primary }}>Cancel</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </YStack>
  );
};

export default SelectField;