// app/chapter1/content/activity2.tsx

import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  Alert,
  ActivityIndicator,
  ScrollView,
  TextInput,
} from "react-native";
import { useAuth } from "@/hooks/useAuth";
import { useRouter } from "expo-router";
import { ChapterNavigationButton } from "@/components/ChapterNavigateButton";
import { updateChapter1Progress } from "@/hooks/Chapter1Activity";
import { CheckboxWithLabel } from "@/components/CheckboxWithLabel";
import { PrimaryButton } from "@/components/CustomButton";
import { useChapter1Context } from "@/contexts/Chapter1Context";
import { useChapterProgressContext } from "@/contexts/AuthContext";
import { doc, getDoc, setDoc } from "firebase/firestore";
import { database } from "@/constants/firebaseConfig";


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

// Define question type
type Activity2Questions = {
  selections: string[];
  otherInput?: string;
};

export default function Activity2() {
  const router = useRouter();
  const { user, pending } = useAuth();
  const { updateChapterProgress } = useChapterProgressContext();
  const { chapterData, updateChapterData } = useChapter1Context();

  // Load initial state from context or default
  const [questions, setQuestions] = useState<Activity2Questions>(
    chapterData["activity2"] || {
      selections: [],
      otherInput: "",
    }
  );

  const [loading, setLoading] = useState<boolean>(false);

  // Sync with context
  useEffect(() => {
    updateChapterData("activity2", questions);
  }, [questions]);

  // Mark page visited
  useEffect(() => {
    updateChapterProgress("chapter1", "activity2");
  }, []);

  // Load previous selections from Firestore or context
  useEffect(() => {
    const loadUserInput = async () => {
      if (chapterData["activity2"]?.selections?.length) {
        setQuestions(chapterData["activity2"]);
      } else if (user) {
        const data = await getChapter1Activity2UserInput(user.uid);
        if (data) {
          setQuestions({
            selections: data.filter((item) => item !== "Other"),
            otherInput: data.includes("Other") ? data[data.length - 1] : "",
          });
        }
      }
    };
    loadUserInput();
  }, [user, chapterData]);

  /** Fetch user selections from Firestore */
  const getChapter1Activity2UserInput = async (
    userId: string
  ): Promise<string[]> => {
    try {
      const activity2UserRef = doc(
        database,
        "Chapter1",
        "Activity2",
        "users",
        userId
      );
      const snapshot = await getDoc(activity2UserRef);

      if (snapshot.exists()) {
        const data = snapshot.data();
        return Array.isArray(data.selections) ? data.selections : [];
      } else {
        return [];
      }
    } catch (err) {
      console.error("Error getting Chapter1 Activity2 user input:", err);
      return [];
    }
  };

  // Checkbox toggle handler
  const toggleCheckbox = (label: string) => {
    setQuestions((prev) => ({
      ...prev,
      selections: prev.selections.includes(label)
        ? prev.selections.filter((item) => item !== label)
        : [...prev.selections, label],
    }));
  };

  // Submit handler
  const handleSubmit = async () => {
    if (!user) {
      Alert.alert("Error", "User not authenticated.");
      return;
    }

    setLoading(true);

    let finalSelections = [...questions.selections];

    if (
      questions.selections.includes("Other") &&
      questions.otherInput?.trim()
    ) {
      // Replace "Other" with user input
      finalSelections = finalSelections.map((item) =>
        item === "Other" ? questions.otherInput!.trim() : item
      );
    }

    try {
      await updateChapter1Activity2(user.uid, finalSelections);
      updateChapterData("activity2", {
        selections: finalSelections,
        otherInput: questions.otherInput,
      });
      Alert.alert("Success", "Data saved successfully.");
    } catch (error) {
      console.error("Error saving data: ", error);
      Alert.alert("Error", "Failed to save data.");
    } finally {
      setLoading(false);
    }
  };

  /** Save user's selections to Firestore */
  const updateChapter1Activity2 = async (
    userId: string,
    selections: string[]
  ) => {
    try {
      const activity2UserRef = doc(
        database,
        "Chapter1",
        "Activity2",
        "users",
        userId
      );
      await setDoc(activity2UserRef, { selections }, { merge: true });
      console.log("Chapter1 Activity2 updated successfully!");
    } catch (err) {
      console.error("Error updating Chapter1 Activity2:", err);
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
          Reflect on whether an urge to procrastinate has ever sabotaged pursuing
          your values.
        </Text>

        <Text style={styles.subHeader}>
          Why did you procrastinate? If you have not procrastinated so far,
          consider why you might put off certain tasks.
        </Text>

        {checkboxOptions.map((label) => (
          <CheckboxWithLabel
            marginBottom="$2"
            marginTop="$2"
            key={label}
            label={label}
            checked={questions.selections.includes(label)}
            onPress={() => toggleCheckbox(label)}
          />
        ))}

        {questions.selections.includes("Other") && (
          <View style={styles.otherContainer}>
            <Text style={styles.label}>Please specify:</Text>
            <TextInput
              style={styles.input}
              placeholder="Input here"
              value={questions.otherInput}
              onChangeText={(text) =>
                setQuestions((prev) => ({ ...prev, otherInput: text }))
              }
            />
          </View>
        )}

        <View style={styles.submitButton}>
          <PrimaryButton title="Submit" onPress={handleSubmit} />
          {loading && <ActivityIndicator size="small" color="#54B363" />}
        </View>

        <ChapterNavigationButton
          prev={"/(app)/chapter1/content/activity1"}
          next={() => {
            if (!user) return;
            updateChapter1Progress(user.uid, "3_Activity2");
            router.push("/(app)/chapter1/content/activity3");
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