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
      const activityRef = doc(database, "Chapter1", "Activity0");
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
      await updateChapter1Activity0Ranking(sortedValues);
      await updateChapter1Progress(user.uid, "2_Activity1_0");
      Alert.alert("Success", "Data saved successfully!");
    } catch (error) {
      console.error("Error saving activity data:", error);
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
    } catch (error) {
      console.error("Error updating activity ranking:", error);
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






// import React, { useRef, useState, useEffect, useCallback } from "react";
// import {
//   View,
//   Text,
//   Button,
//   StyleSheet,
//   Alert,
//   ActivityIndicator,
// } from "react-native";
// import DraggableFlatList, {
//   RenderItemParams,
// } from "react-native-draggable-flatlist";
// import { useAuth } from "@/hooks/useAuth";
// import {
//   updateChapter1Activity0,
//   updateChapter1Progress,
// } from "@/hooks/Chapter1Activity";
// import { useRouter } from "expo-router";
// import { useSafeAreaInsets } from "react-native-safe-area-context";
// import { ChapterNavigationButton } from "@/components/ChapterNavigateButton";
// import colors from "@/constants/colors";
// import { database } from "@/constants/firebaseConfig";
// import { push, set, ref, onValue } from "firebase/database";
// import { YStack } from "tamagui";
// import { PrimaryButton } from "@/components/CustomButton";

// /**
//  * Initial array of value items
//  */
// const initialValues = [
//   "Marriage or Intimate relationships",
//   "Family",
//   "Career",
//   "Health",
//   "Friendships",
//   "Personal Growth (such as Self-awareness and Reflection)",
//   "Financial Security",
//   "Leisure and Hobbies",
//   "Community Involvement",
//   "Spirituality or Religion",
// ];

// /**
//  * Interface for tracking user activity time
//  */
// interface ActivityData {
//   openTime_ms: number;
//   closeTime_ms: number;
//   duration: number;
//   openTime_str: string;
//   closeTime_str: string;
// }

// /**
//  * Item type for the DraggableFlatList
//  */
// type ValueItem = {
//   key: string;
//   label: string;
// };

// export default function Activity0() {
//   const router = useRouter();
//   const { bottom } = useSafeAreaInsets();
//   const { user, pending } = useAuth();

//   // State for DraggableFlatList data
//   const [data, setData] = useState<ValueItem[]>([]);
//   // Display for top 5 results from other users
//   const [top5, setTop5] = useState<string>("");
//   // Loading state for submit
//   const [loading, setLoading] = useState<boolean>(false);

//   // Page open/close tracking
//   const pageOpenTimeRef = useRef<number>(0);
//   const pageCloseTimeRef = useRef<number>(0);

//   useEffect(() => {
//     // Record page open time
//     pageOpenTimeRef.current = Date.now();

//     // Prepare initial data for DraggableFlatList
//     const formattedData = initialValues.map((item, index) => ({
//       key: `item-${index}`,
//       label: item,
//     }));
//     setData(formattedData);

//     // Fetch top 5 ranking from Firebase
//     fetchTop5();

//     // On component unmount or page leave, record time if > 2s
//     return () => {
//       pageCloseTimeRef.current = Date.now();
//       const duration = pageCloseTimeRef.current - pageOpenTimeRef.current;
//       if (duration > 2000) {
//         sendTimeStampsToFirebase();
//       }
//     };
//   }, []);

//   /**
//    * Fetch the aggregated ranking of value items from Firebase
//    */
//   const fetchTop5 = () => {
//     const activityRef = ref(database, "Chapter1/activity0");
//     onValue(activityRef, (snapshot) => {
//       const value = snapshot.val() as Record<string, number> | null;

//       if (value) {
//         const sorted = Object.entries(value)
//           .sort((a, b) => b[1] - a[1]) // descending by count
//           .slice(0, 5);
//         const ranking = sorted
//           .map(([key, val], index) => `${index + 1}. ${key} - ${val}`)
//           .join("\n");
//         setTop5(ranking);
//       } else {
//         setTop5("No data available.");
//       }
//     });
//   };

//   /**
//    * Render function for each draggable item
//    */
//   const renderItem = useCallback(
//     ({ item, drag, isActive }: RenderItemParams<ValueItem>) => {
//       return (
//         <View
//           style={[
//             styles.itemContainer,
//             { backgroundColor: isActive ? "#f0f0f0" : "#ffffff" },
//           ]}
//         >
//           <Text style={styles.itemText}>{item.label}</Text>
//           <Button title="Drag" onPress={drag} color={colors.headerBackground} />
//         </View>
//       );
//     },
//     []
//   );

//   /**
//    * Called when pressing the "Submit" button
//    */
//   const onPressSubmit = () => {
//     if (!user) {
//       Alert.alert("Error", "User not authenticated.");
//       return;
//     }

//     setLoading(true);
//     const sortedValues = data.map((item) => item.label);

//     // Save array of values
//     updateChapter1Activity0(user.uid, sortedValues)
//       .then(() => {
//         Alert.alert("Success", "Data saved successfully.");
//       })
//       .catch((error) => {
//         console.error("Error saving data: ", error);
//         Alert.alert("Error", "Failed to save data.");
//       })
//       .finally(() => {
//         setLoading(false);
//       });

//     // Save to the aggregated hashmap (ranking)
//     updateChapter1Activity0Hashmap(sortedValues);
//   };

//   /**
//    * Store user ranking with numeric weighting for each item
//    */
//   const updateChapter1Activity0Hashmap = async (sortedValues: string[]) => {
//     if (!user) return;

//     const updateData: { [key: string]: number } = {};
//     // Higher priority => higher weighting
//     sortedValues.forEach((value, index) => {
//       updateData[value] = 10 - index;
//     });

//     await updateChapter1Activity0(user.uid, updateData);
//   };

//   /**
//    * Record user activity time to Firebase
//    */
//   const sendTimeStampsToFirebase = () => {
//     if (!user) return;

//     const duration = pageCloseTimeRef.current - pageOpenTimeRef.current;

//     const activityData: ActivityData = {
//       openTime_ms: pageOpenTimeRef.current,
//       closeTime_ms: pageCloseTimeRef.current,
//       duration,
//       openTime_str: new Date(pageOpenTimeRef.current).toString(),
//       closeTime_str: new Date(pageCloseTimeRef.current).toString(),
//     };

//     const activityRef = ref(
//       database,
//       `userActivity/${user.uid}/Chapter1_Activity0`
//     );
//     const newActivityRef = push(activityRef);

//     set(newActivityRef, activityData)
//       .then(() => {
//         console.log("Activity time recorded successfully");
//       })
//       .catch((error: Error) => {
//         console.error("Failed to record activity time: ", error);
//       });
//   };

//   // Show loading screen if user data is still pending
//   if (pending) {
//     return (
//       <View style={styles.loadingContainer}>
//         <ActivityIndicator size="large" color="#54B363" />
//       </View>
//     );
//   }

//   /**
//    * The ListHeaderComponent will show top instructions
//    */
//   const renderListHeader = () => (
//     <YStack padding="$2">
//       <Text style={styles.header}>
//         Having a clear understanding of what life values are most important to you
//         is the first step of your procrastination journey!
//       </Text>
//       <Text style={[styles.header, { marginBottom: 20 }]}>
//         Drag and drop the following life values to rank them from 1 (most important)
//         to 10 (least important). This activity will help you identify and focus on
//         what you care about the most in your life.
//       </Text>
//     </YStack>
//   );

//   /**
//    * The ListFooterComponent will show the "Submit" button, 
//    * top-5 summary, and navigation
//    */
//   const renderListFooter = () => (
//     <YStack padding="$2" space="$3">
//       {/* Submit button */}
//       <View style={styles.submitButton}>
//         <PrimaryButton title="Submit" onPress={onPressSubmit} />
//         {loading && <ActivityIndicator size="small" color="#54B363" />}
//       </View>

//       {/* Top 5 from other users */}
//       <Text style={styles.top5Header}>
//         Here are the top 5 common answers provided by other users:
//       </Text>
//       <Text style={styles.top5Text}>{top5}</Text>

//       {/* Navigation buttons */}
//       <ChapterNavigationButton
//         prev={"/(app)/chapter1/content/opening"}
//         next={() => {
//           if (!user) return;
//           // Mark progress done
//           updateChapter1Progress(user.uid, "2_Activity1_0");
//           router.push("/(app)/chapter1/content/activity1");
//         }}
//       />

//       {/* Spacer at bottom */}
//       <View style={styles.bottomSpacer} />
//     </YStack>
//   );

//   return (
//     <YStack flex={1} style={styles.container}>
//       <DraggableFlatList
//         data={data}
//         renderItem={renderItem}
//         keyExtractor={(item) => item.key}
//         onDragEnd={({ data }) => setData(data)}
//         ListHeaderComponent={renderListHeader}
//         ListFooterComponent={renderListFooter}
//       />
//     </YStack>
//   );
// }

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     padding: 16,
//   },
//   loadingContainer: {
//     flex: 1,
//     justifyContent: "center",
//     alignItems: "center",
//   },
//   header: {
//     fontSize: 16,
//     color: "#000000",
//     lineHeight: 22,
//   },
//   itemContainer: {
//     flexDirection: "row",
//     padding: 16,
//     marginVertical: 4,
//     backgroundColor: "#ffffff",
//     borderRadius: 8,
//     alignItems: "center",
//     justifyContent: "space-between",
//     elevation: 2, // Android shadow
//     shadowColor: "#000", // iOS shadow
//     shadowOffset: { width: 0, height: 1 }, // iOS shadow
//     shadowOpacity: 0.3, // iOS shadow
//     shadowRadius: 1, // iOS shadow
//   },
//   itemText: {
//     fontSize: 16,
//     color: "#000000",
//     flex: 1,
//   },
//   submitButton: {
//     alignSelf: "center",
//     width: "50%",
//     flexDirection: "row",
//     alignItems: "center",
//     justifyContent: "center",
//     gap: 10,
//   },
//   top5Header: {
//     fontSize: 16,
//     color: "#000000",
//     marginTop: 12,
//     marginBottom: 8,
//     fontWeight: "bold",
//   },
//   top5Text: {
//     fontSize: 14,
//     color: "#000000",
//   },
//   bottomSpacer: {
//     height: 60, // leaves space for navigation or bottom safe area
//   },
// });