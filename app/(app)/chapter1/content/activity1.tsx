// app/chapter1/content/activity1.tsx

import React, { useState, useEffect, useCallback } from "react";
import {
  View,
  Text,
  Image,
  Button,
  StyleSheet,
  Alert,
  ActivityIndicator,
  ScrollView,
  TextInput,
} from "react-native";
import { useAuth } from "@/hooks/useAuth";
import {
  getChapter1Activity0UserInput,
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

  const { updateChapterProgress, setCurrPage } = useChapterProgressContext();

  const [topValue, setTopValue] = useState<string>("");
  const [textWhyValue, setTextWhyValue] = useState<string>("");
  const [textProcrastinate, setTextProcrastinate] = useState<string>("");
  const [checkboxes, setCheckboxes] = useState<string[]>([]);
  const [otherText, setOtherText] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    setCurrPage('activity1');
  }, [])

  // 获取用户之前的选择
  useEffect(() => {
    if (user) {
      getChapter1Activity0UserInput(user.uid).then((data) => {
        if (data && Array.isArray(data.selection) && data.selection.length > 0) {
          setTopValue(data.selection[0]);
        }
      });

      getChapter1Activity1UserInput(user.uid).then((data) => {
        if (data) {
          setTextWhyValue(data.textWhyValue || "");  
          setTextProcrastinate(data.textProcrastinate || ""); 
          setCheckboxes(Array.isArray(data.checkboxes) ? data.checkboxes : []); 
          setOtherText(data.otherText || ""); 
        }
      });
    }
  }, [user]);

  // 复选框状态切换
  const toggleCheckbox = (label: string) => {
    setCheckboxes((prev) =>
      prev.includes(label) ? prev.filter((item) => item !== label) : [...prev, label]
    );
  };


  const handleSubmit = async () => {
    if (!user) return Alert.alert("Error", "User not authenticated.");

    setLoading(true);
    await updateChapter1Activity1(user.uid, {
      topValue,
      textWhyValue,
      textProcrastinate,
      checkboxes,
      otherText: checkboxes.includes("Other") ? otherText : "",
    });

    await updateChapter1Progress(user.uid, "2_Activity1_1");
    setLoading(false);
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
      <Text style={styles.header}>You chose {topValue} as one of your top life values. Think about why those values are important and meaningful to you. Have you ever made any effort to pursue these values?</Text>
      <TextInput style={styles.input} value={textWhyValue} onChangeText={setTextWhyValue} />
      <Text style={styles.header}>Have you ever procrastinated on pursuing these values? If you have not, can you think of a situation where you would procrastinate?</Text>
      <TextInput style={styles.input} value={textProcrastinate} onChangeText={setTextProcrastinate} />
      {checkboxOptions.map((label) => (
        <CheckboxWithLabel marginBottom="$2" marginTop="$2" key={label} label={label} checked={checkboxes.includes(label)} onPress={() => toggleCheckbox(label)} />
      ))}
      {checkboxes.includes("Other") && <TextInput style={styles.input} value={otherText} onChangeText={setOtherText} />}

        <View style={styles.submitButton}>
          <PrimaryButton title="Submit" onPress={handleSubmit} />
          {loading && <ActivityIndicator size="small" color="#54B363" />}
        </View>

        <YStack marginTop="20">
        <Text style={styles.header}>Here are some common answers provided by other users:</Text>
        <Image source={require("@/assets/images/word_cloud.png")} style={styles.wordCloud} />
        </YStack>

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
    borderWidth: 2,
    borderColor: "#54B363",
    borderRadius: 4,
    padding: 8,
    fontSize: 16,
    marginBottom: 16
  },
  wordCloud: {
      width: 300,
      height: 200,
      alignSelf: "center",
      resizeMode: "contain",
    },
});