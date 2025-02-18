// app/chapter1/content/activity1.tsx

import React, { useState, useEffect, useCallback } from "react";
import {
  View,
  Text,
  Button,
  StyleSheet,
  Alert,
  ActivityIndicator,
  ScrollView,
  TextInput,
} from "react-native";
import { useAuth } from "@/hooks/useAuth";
import {
  updateChapter1Activity1,
  getChapter1Activity1UserInput,
  updateChapter1Progress,
} from "@/hooks/Chapter1Activity";
import { useRouter } from "expo-router";
import { ChapterNavigationButton } from "@/components/ChapterNavigateButton";
import { CheckboxWithLabel } from "@/components/CheckboxWithLabel";
import { PrimaryButton } from "@/components/CustomButton";
import { YStack } from "tamagui";
import { useChapterProgressContext } from "@/contexts/AuthContext";
//import { useAuthContext } from "@/contexts/AuthContext";

const checkboxOptions: string[] = [
  "Lack of Motivation",
  "Fear of Failure",
  "Perfectionism",
  "Task Difficulty",
  "Poor Time Management",
  "Lack of Clear Goals",
  "Distractions",
  "Low Self-Discipline",
  "Overwhelm",
  "Delayed Gratification",
  "Decision Paralysis",
  "Other",
];

export default function Activity1() {
  const router = useRouter();
  const { user, pending } = useAuth();
  
  // Auth Context 用于 UI 进度同步
  //const { userData, setUserData, currPage, setCurrPage } = useAuthContext();

  // 复选框状态
  const [checkboxes, setCheckboxes] = useState<string[]>([]);
  const [otherInput, setOtherInput] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const [existingSelections, setExistingSelections] = useState<string[]>([]);

  const {updateChapterProgress, setCurrPage} = useChapterProgressContext();

  useEffect(() => {
    setCurrPage('activity1');
  }, [])

  // 获取用户之前的选择
  useEffect(() => {
    if (user) {
      getChapter1Activity1UserInput(user.uid).then((data: string[] | null) => {
        if (data) {
          setExistingSelections(data);
          setCheckboxes(data.filter((item: string) => item !== "Other"));
          if (data.includes("Other")) {
            // 这里可以扩展 "Other" 的逻辑
          }
        }
      });
    }
  }, [user]);

  // 复选框状态切换
  const toggleCheckbox = (label: string) => {
    setCheckboxes((prev) => {
      if (prev.includes(label)) {
        return prev.filter((item: string) => item !== label);
      } else {
        return [...prev, label];
      }
    });
  };

  // 提交数据
  const handleSubmit = async () => {
    if (!user) {
      Alert.alert("Error", "User not authenticated.");
      return;
    }

    setLoading(true);
    let selections: string[] = [...checkboxes];

    if (checkboxes.includes("Other") && otherInput.trim() !== "") {
      selections = selections.map((item: string) =>
        item === "Other" ? otherInput.trim() : item
      );
    }

    try {
      await updateChapter1Activity1(user.uid, selections);
      await updateChapter1Progress(user.uid, "2_Activity1_1");
      Alert.alert("Success", "Data saved successfully.");
      router.push("/(app)/chapter1/content/activity2_1");
    } catch (error) {
      console.error("Error saving data: ", error);
      Alert.alert("Error", "Failed to save data.");
    } finally {
      setLoading(false);
    }
  };

  if (pending) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#54B363" />
      </View>
    );
  }

  return (
    <ScrollView style={styles.container}>
      <View style={styles.content}>
        <Text style={styles.header}>
          Reflect on whether an urge to procrastinate has ever sabotaged pursuing your values.
        </Text>

        <Text style={styles.subHeader}>
          Why did you procrastinate? If you have not procrastinated so far, consider why you might put off certain tasks.
        </Text>

        {checkboxOptions.map((label: string) => (
          <CheckboxWithLabel
            marginBottom="$2"
            marginTop="$2"
            key={label}
            label={label}
            checked={checkboxes.includes(label)}
            onPress={() => toggleCheckbox(label)}
          />
        ))}

        {checkboxes.includes("Other") && (
          <View style={styles.otherContainer}>
            <Text style={styles.label}>Please specify:</Text>
            <TextInput
              style={styles.input}
              placeholder="Input here"
              value={otherInput}
              onChangeText={setOtherInput}
            />
          </View>
        )}

        <View style={styles.submitButton}>
          <PrimaryButton title="Submit" onPress={handleSubmit} />
          {loading && <ActivityIndicator size="small" color="#54B363" />}
        </View>

        <ChapterNavigationButton
          prev={"/(app)/chapter1/content/activity0"}
          next={() => {
            if (!user) return;
            updateChapterProgress('chapter1', 'activity1');
            updateChapter1Progress(user.uid, "2_Activity1_1");
            router.push("/(app)/chapter1/content/activity2_1");
          }}
        />
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  content: {
    flex: 1,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  header: {
    fontSize: 18,
    color: "#000000",
    marginBottom: 16,
  },
  subHeader: {
    fontSize: 16,
    color: "#000000",
    marginBottom: 16,
  },
  submitButton: {
    marginTop: 16,
    alignSelf: "center",
    width: "50%",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 10,
  },
  otherContainer: {
    marginTop: 8,
    marginBottom: 16,
  },
  label: {
    fontSize: 16,
    color: "#000000",
    marginBottom: 4,
  },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 4,
    padding: 8,
    fontSize: 16,
  },
});