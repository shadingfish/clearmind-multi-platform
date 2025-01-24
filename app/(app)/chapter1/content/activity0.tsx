// app/chapter1/content/activity0.tsx

import React, { useRef, useState, useEffect, useCallback } from "react";
import { View, Text, Button, StyleSheet, Alert, ActivityIndicator } from "react-native";
import DraggableFlatList, { RenderItemParams } from "react-native-draggable-flatlist";
import { useAuth } from "@/hooks/useAuth";
import {
  updateChapter1Activity0,
  updateChapter1Progress,
} from "@/hooks/Chapter1Activity";
import { useRouter } from "expo-router";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { ChapterNavigationButton } from "@/components/ChapterNavigateButton";
import colors from "@/constants/colors";
import { database } from "@/constants/firebaseConfig";
import { push, set, ref, onValue } from "firebase/database";
import { ScrollView, YStack } from "tamagui";
import { PrimaryButton } from "@/components/CustomButton";

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

interface ActivityData {
  openTime_ms: number;
  closeTime_ms: number;
  duration: number;
  openTime_str: string;
  closeTime_str: string;
}

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

  const pageOpenTimeRef = useRef<number>(0);
  const pageCloseTimeRef = useRef<number>(0);

  useEffect(() => {
    pageOpenTimeRef.current = Date.now();

    const formattedData = initialValues.map((item, index) => ({
      key: `item-${index}`,
      label: item,
    }));
    setData(formattedData);

    fetchTop5();

    return () => {
      pageCloseTimeRef.current = Date.now();
      const duration = pageCloseTimeRef.current - pageOpenTimeRef.current;
      if (duration > 2000) {
        sendTimeStampsToFirebase();
      }
    };
  }, []);

  const fetchTop5 = () => {
    const activityRef = ref(database, "Chapter1/activity0");
    onValue(activityRef, (snapshot) => {
      const value = snapshot.val() as Record<string, number> | null;

      if (value) {
        const sorted = Object.entries(value)
          .sort((a, b) => b[1] - a[1])
          .slice(0, 5);
        const ranking = sorted
          .map(([key, val], index) => `${index + 1}. ${key} - ${val}`)
          .join("\n");
        setTop5(ranking);
      } else {
        setTop5("No data available.");
      }
    });
  };

  const renderItem = useCallback(
    ({ item, drag, isActive }: RenderItemParams<ValueItem>) => {
      return (
        <View
          style={[
            styles.itemContainer,
            { backgroundColor: isActive ? "#f0f0f0" : "#ffffff" },
          ]}
        >
          <Text style={styles.itemText}>{item.label}</Text>
          <Button title="Drag" onPress={drag} color={colors.headerBackground} />
        </View>
      );
    },
    []
  );

  const onPressSubmit = () => {
    if (!user) {
      Alert.alert("Error", "User not authenticated.");
      return;
    }

    setLoading(true);
    const sortedValues = data.map((item) => item.label);

    updateChapter1Activity0(user.uid, sortedValues)
      .then(() => {
        Alert.alert("Success", "Data saved successfully.");
      })
      .catch((error) => {
        console.error("Error saving data: ", error);
        Alert.alert("Error", "Failed to save data.");
      })
      .finally(() => {
        setLoading(false);
      });

    updateChapter1Activity0Hashmap(sortedValues);
  };

  const updateChapter1Activity0Hashmap = async (sortedValues: string[]) => {
    if (!user) return;

    const updateData: { [key: string]: number } = {};

    sortedValues.forEach((value, index) => {
      updateData[value] = 10 - index;
    });

    await updateChapter1Activity0(user.uid, updateData);
  };

  const sendTimeStampsToFirebase = () => {
    if (!user) return;

    const duration = pageCloseTimeRef.current - pageOpenTimeRef.current;

    const activityData: ActivityData = {
      openTime_ms: pageOpenTimeRef.current,
      closeTime_ms: pageCloseTimeRef.current,
      duration,
      openTime_str: new Date(pageOpenTimeRef.current).toString(),
      closeTime_str: new Date(pageCloseTimeRef.current).toString(),
    };

    const activityRef = ref(
      database,
      `userActivity/${user.uid}/Chapter1_Activity0`
    );

    const newActivityRef = push(activityRef);

    set(newActivityRef, activityData)
      .then(() => {
        console.log("Activity time recorded successfully");
      })
      .catch((error: Error) => {
        console.error("Failed to record activity time: ", error);
      });
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
      <YStack>
      <Text style={styles.header}>
        Having a clear understanding of what life values are most important to you
        is the first step of your procrastination journey!
        {"\n\n"}Drag and drop the following life values to rank them from 1
        (most important) to 10 (least important). This activity will help you
        identify and focus on what you care about the most in your life.
      </Text>

      <DraggableFlatList
        data={data}
        renderItem={renderItem}
        keyExtractor={(item) => item.key}
        onDragEnd={({ data }) => setData(data)}
      />

      <View style={styles.submitButton}>
        < PrimaryButton title="Submit" onPress={onPressSubmit}>
        </PrimaryButton>

        {loading && <ActivityIndicator size="small" color="#54B363" />}
      </View>

      <YStack marginBottom="$5">
      <Text style={styles.top5Header}>
        Here are the top 5 common answers provided by other users, in case you
        are interested:
      </Text>
      <Text style={styles.top5Text}>{top5}</Text>
      </YStack>

      <ChapterNavigationButton
        prev={"/(app)/chapter1/content/opening"}
        next={() => {
          if (!user) return;
          updateChapter1Progress(user.uid, "2_Activity1_0");
          router.push("/(app)/chapter1/content/activity1");
        }}
      />

      <View style={styles.bottomSpacer} />
      </YStack>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
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
  itemContainer: {
    flexDirection: "row",
    padding: 16,
    marginVertical: 4,
    backgroundColor: "#ffffff",
    borderRadius: 8,
    alignItems: "center",
    justifyContent: "space-between",
    elevation: 2, // Android shadow
    shadowColor: "#000", // iOS shadow
    shadowOffset: { width: 0, height: 1 }, // iOS shadow
    shadowOpacity: 0.3, // iOS shadow
    shadowRadius: 1, // iOS shadow
  },
  itemText: {
    fontSize: 16,
    color: "#000000",
    flex: 1,
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
  top5Header: {
    fontSize: 18,
    color: "#000000",
    marginTop: 24,
    marginBottom: 8,
  },
  top5Text: {
    fontSize: 16,
    color: "#000000",
  },
  bottomSpacer: {
    height: 60, // To ensure content is above the navigation buttons
  },
});