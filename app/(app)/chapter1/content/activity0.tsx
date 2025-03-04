// app/(app)/chapter1/content/activity0.tsx

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
import { updateChapter1Activity0, getChapter1Activity0, updateChapter1Progress} from "@/hooks/Chapter1Activity";
import { useRouter } from "expo-router";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { ChapterNavigationButton } from "@/components/ChapterNavigateButton";
import colors from "@/constants/colors";
import { YStack } from "tamagui";
import { PrimaryButton } from "@/components/CustomButton";

import { database } from "@/constants/firebaseConfig";
import { doc, getDoc, setDoc, updateDoc } from "firebase/firestore";
import { useChapterProgressContext } from "@/contexts/AuthContext";

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

export default function Activity0() {
  const router = useRouter();
  const { bottom } = useSafeAreaInsets();
  const { user, pending } = useAuth();

  const [data, setData] = useState<ValueItem[]>([]);
  const [top5, setTop5] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);


  const {updateChapterProgress, setCurrPage} = useChapterProgressContext();

  useEffect(() => {
    setCurrPage('activity0');
  }, [])

  useEffect(() => {
    // Prepare initial data for DraggableFlatList
    const formattedData = initialValues.map((item, index) => ({
      key: `item-${index}`,
      label: item,
    }));
    setData(formattedData);

    // Fetch top 5 ranking from Firestore
    fetchTop5();
  }, []);

  /**
   * 获取 `Chapter1/activity0` 排名前 5 的选择
   */
  const fetchTop5 = async () => {
    try {
      const rankingRef = doc(database, "Chapter1", "Activity0", "allranking", "scores"); // ✅ 直接访问 `allranking` 文档
      const snapshot = await getDoc(rankingRef);
  
      if (snapshot.exists()) {
        const value = snapshot.data() as Record<string, number>;
        const sorted = Object.entries(value)
          .sort((a, b) => b[1] - a[1]) // 按得分降序排列
          .slice(0, 5);

        const totalScore = sorted.reduce((acc, [_, val]) => acc + val, 0);
  
        const ranking = sorted
        .map(([key, val], index) => {
          const ratio = totalScore === 0 ? 0 : (val / totalScore) * 100;
          const ratioText = ratio.toFixed(2) + "%";
          return `${index + 1}. ${key} - ${ratioText}`;
        })
        .join("\n");

        setTop5(ranking);
      } else {
        setTop5("No data available.");
      }
    } catch (error: any) {
      console.error("Error fetching top 5:", error);
      console.error("Error Code:", error.code);
      console.error("Error Message:", error.message);
      console.error("Error Details:", JSON.stringify(error, null, 2));
    }
  };

  /**
   * 处理 DraggableFlatList 拖拽排序
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
      await updateAllRanking(sortedValues);
      await updateChapter1Activity0Ranking(sortedValues);
      await updateChapter1Progress(user.uid, "2_Activity1_0");
      Alert.alert("Success", "Data saved successfully!");
    } catch (error: any) {
      console.error("Error saving activity data:", error);
      console.error("Error Code:", error.code);
      console.error("Error Message:", error.message);
      console.error("Error Details:", JSON.stringify(error, null, 2));

      Alert.alert("Error", "Failed to save data.");
    } finally {
      setLoading(false);
    }
  };

  /**
   * 更新 `Chapter1/activity0` 统计数据
   */
  const updateChapter1Activity0Ranking = async (sortedValues: string[]) => {
    try {
      const activityRef = doc(database, "Chapter1", "Activity0");
      const snapshot = await getDoc(activityRef);
      const existingData = snapshot.exists() ? snapshot.data() : {};

      const updatedData: { [key: string]: number } = { ...existingData };
      sortedValues.forEach((value, index) => {
        updatedData[value] = (updatedData[value] || 0) + (10 - index);
      });

      await setDoc(activityRef, updatedData, { merge: true });
      fetchTop5(); // 更新 UI 显示
    } catch (error: any) {
      console.error("Error updating activity ranking:", error);
      console.error("Error Code:", error.code);
      console.error("Error Message:", error.message);
      console.error("Error Details:", JSON.stringify(error, null, 2));
    }
  };

  const updateAllRanking = async (sortedValues: string[]) => {
    try {
      const rankingRef = doc(database, "Chapter1", "Activity0", "allranking", "scores"); // ✅ 直接访问 `allranking` 文档
      const snapshot = await getDoc(rankingRef);
  
      // 初始化 `allranking`（如果不存在）
      let existingData: { [key: string]: number } = snapshot.exists() ? snapshot.data() : {};
  
      // 计算分数
      sortedValues.forEach((value, index) => {
        existingData[value] = (existingData[value] || 0) + (10 - index);
      });
  
      // 更新 `allranking`
      await setDoc(rankingRef, existingData, { merge: true });
  
      // 更新 UI 显示
      fetchTop5();
    } catch (error: any) {
      console.error("Error updating allranking:", error);
      console.error("Error Code:", error.code);
      console.error("Error Message:", error.message);
      console.error("Error Details:", JSON.stringify(error, null, 2));
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
            {`Having a clear understanding of what life values are most important to you is the first step of your procrastination journey!\nDrag and drop the following life values to rank them from 1 (most important) to 10 (least important). This activity will help you identify and focus on what you care about the most in your life.`}
            </Text>
          </YStack>
        )}
        ListFooterComponent={() => (
          <YStack padding="$2" space="$3">
            <View style={styles.submitButton}>
              <PrimaryButton title="Submit" onPress={onPressSubmit} />
              {loading && <ActivityIndicator size="small" color="#54B363" />}
            </View>

            <Text style={styles.top5Header}>Here are the top five most frequently selected life values by other users:</Text>
            <Text style={styles.top5Text}>{top5}</Text>

            <ChapterNavigationButton
              prev={"/(app)/chapter1/content/opening"}
              next={() => 
                
                {
                  updateChapterProgress("chapter1", "activity0");
                  router.push("/(app)/chapter1/content/activity1");}}
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