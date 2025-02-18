// app/chapter1/content/activity0.tsx

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
   * Initialize data: Load from context or default values
   */
  useEffect(() => {
    // Load saved ranking from context if exists
    if (chapterData["activity1"]?.sorted_values?.length) {
      const formattedData = chapterData["activity1"].sorted_values.map((item: string, index: number) => ({
        key: `item-${index}`,
        label: item,
      }));
      setData(formattedData);
    } else {
      // Use default initial values if no saved data
      let retrieved_data;
      if (user != null) {
        retrieved_data = getChapter1Activity0UserInput(user.uid);
        if (retrieved_data.length() <= 0) {
          retrieved_data = initialValues;
        }
      } else {
        retrieved_data = initialValues;
      }

      const formattedData = retrieved_data.map((item: string, index) => ({
        key: `item-${index}`,
        label: item,
      }));
      setData(formattedData);
    }

    // Fetch top 5 ranking from Firestore
    fetchTop5();
  }, [chapterData]);  // Re-run if context changes

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
    const updateChapter1Activity0Ranking = async (sortedValues: string[]) => {
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
    const updateChapter1Activity0 = async (
      userId: string,
      selection: string[] | { [key: string]: number }
    )  => {
      try {
        const activity0UserRef = doc(database, "Chapter1", "Activity0", "users", userId);
        await setDoc(activity0UserRef, { selection });
        console.log("Chapter1 Activity0 updated successfully!");
      } catch (err) {
        console.error("Error updating Chapter1 Activity0:", err);
      }
    }

    /** Get user's input of Chapter1 Activity1 */
    const getChapter1Activity0UserInput = async (userId: string) => {
      try {
        const activity0UserRef = doc(database, "Chapter1", "Activity0", "users", userId);
        const snapshot = await getDoc(activity0UserRef);
        if (snapshot.exists()) {
          const data = snapshot.data();
          
          // Ensure data.selection is an array before assigning
          const sortedValues: string[] = Array.isArray(data.selection) ? data.selection : [];
          
          return sortedValues;
        } else {
          return []; // Return empty array if no data exists
        }
      } catch (err) {
        console.error("Error getting Chapter1 Activity0 user input:", err);
      }
    }

  /**
   * 提交用户排序
   */
  const onPressSubmit = async () => {
    if (!user) {
      Alert.alert("Error", "User not authenticated.");
      return;
    }

    setLoading(true);
    const sortedValues = data.map((item) => item.label);

    try {
      // 存储用户排序数据
      await setDoc(doc(database, "Chapter1", "Activity0", "users", user.uid), {
        selection: sortedValues,
      });

      // 更新全局统计
      await updateQuestion("sorted_values", sortedValues);
      await updateChapter1Activity0Ranking(sortedValues);
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
              next={() => router.push("/(app)/chapter1/content/activity1")}
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