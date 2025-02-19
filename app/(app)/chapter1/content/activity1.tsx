// app/chapter1/content/activity1.tsx

import React, { useRef, useState, useEffect, useCallback } from "react";
import {
  View,
  Text,
  Button,
  StyleSheet,
  Alert,
  ActivityIndicator,
} from "react-native";
import DraggableFlatList, { RenderItemParams } from "react-native-draggable-flatlist";
import { useAuth } from "@/hooks/useAuth";
import { updateChapter1Progress } from "@/hooks/Chapter1Activity";
import { useRouter } from "expo-router";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { ChapterNavigationButton } from "@/components/ChapterNavigateButton";
import colors from "@/constants/colors";
import { YStack } from "tamagui";
import { PrimaryButton } from "@/components/CustomButton";

import { database } from "@/constants/firebaseConfig";

import { doc, getDoc, setDoc, updateDoc } from "firebase/firestore";
import { useChapterProgressContext } from "@/contexts/AuthContext";
import { useChapter1Context } from "@/contexts/Chapter1Context";
import { useToastController } from "@tamagui/toast";


type Activity1Questions = {
  sorted_values: string[];
};

/**
 * Initial array of value items
 */
const initialValues = [
  "Marriage or Intimate relationships",
  "Family",
  "Career",
  "Health",
  "Friendships",
  "Personal Growth (such as Self-awareness and Reflection)",
  "Financial Security",
  "Leisure and Hobbies",
  "Community Involvement",
  "Spirituality or Religion",
];

/**
 * Item type for the DraggableFlatList
 */
type ValueItem = {
  key: string;
  label: string;
};

export default function Activity1() {
  const router = useRouter();
  const { bottom } = useSafeAreaInsets();
  const { user, pending } = useAuth();
  const [data, setData] = useState<ValueItem[]>([]);
  const [top5, setTop5] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const toast = useToastController();
  const {chapterData, updateChapterData} = useChapter1Context();

  const [questions, setQuestions] = useState<Activity1Questions>(chapterData["activity1"] || {
      sorted_values: [""]
    });

  const updateQuestion = (field: keyof Activity1Questions, value: string[]) => {
      setQuestions((prev) => {
          const updatedQuestions = { ...prev, [field]: value };
          return updatedQuestions;
      });
  };

  //~~~JUST COPY PAST THIS INTO EACH ACTIVITY AND CHANGE THE CHAPTER AND TITLE ACCORDINGLY~~~
  const { updateChapterProgress } = useChapterProgressContext();

  useEffect(() => {
      updateChapterProgress("chapter1", "activity1");
  }, []);
  //~~~END COPY PASTA~~~

  //update Chapter Context
  useEffect(() => {
      updateChapterData("activity1", questions);
  }, [questions]);
  //end

  /**
   * Load user's saved input or use defaults
   */
  useEffect(() => {
    const loadUserInput = async () => {
      let retrievedData: string[] = [];

      // 1️⃣ Context
      if (chapterData["activity1"]?.sorted_values?.length) {
        retrievedData = chapterData["activity1"].sorted_values;
      } 
      // 2️⃣ Firestore
      else if (user) {
        const result = await getChapter1Activity1UserInput(user.uid);
        retrievedData = Array.isArray(result) && result.length > 0 ? result : initialValues;
      } 
      // 3️⃣ Default
      else {
        retrievedData = initialValues;
      }

      const formattedData = retrievedData.map((item, index) => ({
        key: `item-${index}`,
        label: item,
      }));
      setData(formattedData);
    };

    loadUserInput();
  }, [chapterData, user]);

  /**
   * 获取 `Chapter1/activity0` 排名前 5 的选择
   */
  const fetchTop5 = async () => {
    try {
      const activityRef = doc(database, "Chapter1", "Activity1");
      const snapshot = await getDoc(activityRef);

      if (snapshot.exists()) {
        const value = snapshot.data() as Record<string, number>;
        const sorted = Object.entries(value)
          .sort((a, b) => b[1] - a[1]) // 按选择次数降序排列
          .slice(0, 5);

        const ranking = sorted
          .map(([key, val], index) => `${index + 1}. ${key} - ${val}`)
          .join("\n");

        setTop5(ranking);
      } else {
        setTop5("No data available.");
      }
    } catch (err) {
      console.error("Error fetching top5 ranking:", err);
    }
  };

  /**
   * Process DraggableFlatList drag-ranking
   */
  const renderItem = useCallback(({ item, drag, isActive }: RenderItemParams<ValueItem>) => {
    return (
      <View style={[styles.itemContainer, { backgroundColor: isActive ? "#f0f0f0" : "#ffffff" }]}>
        <Text style={styles.itemText}>{item.label}</Text>
        <Button title="Drag" onPress={drag} color={colors.headerBackground} />
      </View>
    );
  }, []);

    /**
   * Update `Chapter1/activity1` statistics
   */
    const updateChapter1Activity1Ranking = async (sortedValues: string[]) => {
      try {
        const activityRef = doc(database, "Chapter1", "Activity1");
        const snapshot = await getDoc(activityRef);
        const existingData = snapshot.exists() ? snapshot.data() : {};

        const updatedData: { [key: string]: number } = { ...existingData };
        sortedValues.forEach((value, index) => {
          updatedData[value] = (updatedData[value] || 0) + (10 - index);
        });

        await setDoc(activityRef, updatedData, { merge: true });
        fetchTop5();
      } catch (error) {
        console.error("Error updating activity ranking:", error);
      }
    };

    /** Update Chapter1 Activity0 */
    const updateChapter1Activity1 = async (
      userId: string,
      selection: string[]
    )  => {
      try {
        const activity0UserRef = doc(database, "Chapter1", "Activity1", "users", userId);
        await setDoc(activity0UserRef, { selection }, { merge: true });
        console.log("Chapter1 Activity1 updated successfully!");
      } catch (err) {
        console.error("Error updating Chapter1 Activity1:", err);
      }
    }

    /** Get user's input of Chapter1 Activity1 */
    const getChapter1Activity1UserInput = async (userId: string) => {
      try {
        const activity1UserRef = doc(database, "Chapter1", "Activity1", "users", userId);
        const snapshot = await getDoc(activity1UserRef);

        if (snapshot.exists()) {
          const data = snapshot.data();
          console.log("Fetched Data:", data);

          if (data && Array.isArray(data.selection)) {
            return data.selection;
          } else {
            console.warn("Data format error: 'selection' is not an array.");
            return [];
          }
        } else {
          console.warn("No data found for user.");
          return [];
        }
      } catch (err) {
        console.error("Error getting Chapter1 Activity1 user input:", err);
        return [];
      }
    };

  /**
   * Submit user ranking
   */
  const onPressSubmit = async () => {
    if (!user) {
      Alert.alert("Error", "User not authenticated.");
      return;
    }

    setLoading(true);
    const sortedValues = data.map((item) => item.label);

    try {
      await updateQuestion("sorted_values", sortedValues);
      await updateChapterData("activity1", { sorted_values: sortedValues });
      await updateChapter1Activity1(user.uid, sortedValues);
      await updateChapter1Activity1Ranking(sortedValues);
      await updateChapter1Progress(user.uid, "2_Activity1");
      Alert.alert("Success", "Data saved successfully!");
    } catch (error) {
      console.error("Error saving activity data:", error);
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
    <YStack flex={1} style={styles.container}>
      <DraggableFlatList
        data={data}
        renderItem={renderItem}
        keyExtractor={(item) => item.key}
        onDragEnd={({ data }) => setData(data)}
        ListHeaderComponent={() => (
          <YStack padding="$2">
            <Text style={styles.header}>
              Drag and drop the values to rank them from most important (top) to least important (bottom).
            </Text>
          </YStack>
        )}
        ListFooterComponent={() => (
          <YStack padding="$2" space="$3">
            <View style={styles.submitButton}>
              <PrimaryButton title="Submit" onPress={onPressSubmit} />
              {loading && <ActivityIndicator size="small" color="#54B363" />}
            </View>

            <Text style={styles.top5Header}>Top 5 common answers from other users:</Text>
            <Text style={styles.top5Text}>{top5}</Text>

            <ChapterNavigationButton
              prev={"/(app)/chapter1/content/opening"}
              next={() => router.push("/(app)/chapter1/content/activity2")}
            />
          </YStack>
        )}
      />
    </YStack>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16 },
  loadingContainer: { flex: 1, justifyContent: "center", alignItems: "center" },
  header: { fontSize: 16, color: "#000", lineHeight: 22 },
  itemContainer: { flexDirection: "row", padding: 16, marginVertical: 4, backgroundColor: "#fff", borderRadius: 8 },
  itemText: { fontSize: 16, color: "#000", flex: 1 },
  submitButton: { alignSelf: "center", width: "50%", flexDirection: "row", alignItems: "center", justifyContent: "center", gap: 10 },
  top5Header: { fontSize: 16, color: "#000", marginTop: 12, marginBottom: 8, fontWeight: "bold" },
  top5Text: { fontSize: 14, color: "#000" },
});