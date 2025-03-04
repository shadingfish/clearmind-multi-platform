
import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  Image,
  StyleSheet,
  Dimensions,
  FlatList,
} from "react-native";
import { useRouter } from "expo-router";
import { auth } from "@/constants/firebaseConfig";
import { doc, getDoc } from "firebase/firestore";
import { database } from "@/constants/firebaseConfig";
import { useAuth } from "@/hooks/useAuth";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { XStack } from "tamagui";
import AntDesign from '@expo/vector-icons/AntDesign';
import { LineChart } from "react-native-svg-charts";


const { width } = Dimensions.get("window");

// Import images
const images = {
    forget: require("@/assets/images/timeliness_forget.png"),
    no: require("@/assets/images/timeliness_no.png"),
    past: require("@/assets/images/timeliness_past.png"),
    pending: require("@/assets/images/timeliness_pending.png"),
    yes: require("@/assets/images/timeliness_yes.png"),
    yes1: require("@/assets/images/timeliness_yes1.png"),
    yes2: require("@/assets/images/timeliness_yes2.png"),
    yes3: require("@/assets/images/timeliness_yes3.png"),
    yes4: require("@/assets/images/timeliness_yes4.png"),
    yes5: require("@/assets/images/timeliness_yes5.png"),
};

export default function ProfileScreen() {
  const router = useRouter();
  const { top } = useSafeAreaInsets();
  const [userData, setUserData] = useState({
    completionWeekly: 0,
    avgScore: 10.2
  });

  const [selectedChart, setSelectedChart] = useState("Both");

  // Placeholder task completion data
  const [taskCompletion, setTaskCompletion] = useState([
    { date: "10/03", status: "past" },
    { date: "10/04", status: "pending" },
    { date: "10/05", status: "yes" },
    { date: "10/06", status: "yes1" },
    { date: "10/07", status: "no" },
    { date: "10/08", status: "yes2" },
    { date: "10/09", status: "yes5" },
  ]);

  // Dummy data for the chart
  const data = [20, 45, 28, 80, 99, 43, 50];

  useEffect(() => {
    const fetchUserData = async () => {
      const user = auth.currentUser;
      if (user) {
        const userRef = doc(database, "users", user.uid);
        const snapshot = await getDoc(userRef);
        if (snapshot.exists()) {
          const data = snapshot.data();
          setUserData({
            completionWeekly: 0,
            avgScore: 10.2
          });
        }
      }
    };
    fetchUserData();
  }, []);

  return (
<View style={{ flex: 1, paddingTop: top, backgroundColor: "#54B363" }}>
  {/* avatar + name */}
  <View style={styles.topSection}>
    <Text style={styles.name}>Goal Tracker</Text>
    <TouchableOpacity onPress={() => router.back()} style={{marginLeft: 30}}>
          <AntDesign name="pluscircleo" size={28} color="white" />
    </TouchableOpacity>
  </View>

  <View style={styles.checkSection}>
    <View style={styles.subSection}>
    <TouchableOpacity style={styles.minibutton} onPress={() => router.push("/(app)/profile/settings")}>
        <Text style={styles.buttonText}>Read book</Text>
    </TouchableOpacity>
    <Text style={styles.headText}>Timeliness this week</Text>
            {/* Task Completion Grid */}
    <FlatList
        data={taskCompletion}
        horizontal
        keyExtractor={(item) => item.date}
        style={{ flexGrow: 0 }}
        contentContainerStyle={styles.gridContainer}
        renderItem={({ item }) => (
            <View style={styles.taskItem}>
                <Image source={images[item.status]} style={styles.taskImage} />
                <Text style={styles.taskDate}>{item.date}</Text>
            </View>
        )}
    />
    <XStack style={styles.completionScore}>
      {/* Username + Email card */}
      <View style={styles.card}>
        <Text>Completion this week</Text>
        <Text style={styles.statsText}>{userData.completionWeekly * 100}%</Text>
      </View>

      {/* signed in card */}
      <View style={styles.card}>
        <Text>Average Timeliness Score</Text>
        <Text style={styles.statsText}>{userData.avgScore}</Text>
      </View>
    </XStack>
    </View>

    <View style={styles.divider} />

    <View style={styles.subSection}>
    <Text style={styles.headText}>Weekly Timeliness/Completion overtime</Text>
        {/* Toggle Button Group */}
        <View style={styles.buttonGroup}>
          {["Completion", "Both", "Timeliness"].map((option) => (
            <TouchableOpacity
              key={option}
              style={[
                styles.subbutton,
                selectedChart === option && styles.selectedButton,
              ]}
              onPress={() => setSelectedChart(option)}
            >
              <Text
                style={[
                  styles.subbuttonText,
                  selectedChart === option && styles.selectedButtonText,
                ]}
              >
                {option}
              </Text>
            </TouchableOpacity>
          ))}
        </View>

        {/* Placeholder Chart */}
        <LineChart
          style={{ height: 200, width: "100%", marginTop: 10 }}
          data={data}
          svg={{ stroke: "rgb(134, 65, 244)" }}
          contentInset={{ top: 20, bottom: 20 }}
        />
    </View>
  </View>
</View>
  );
}

const styles = StyleSheet.create({
    topSection: { 
      flexDirection: "row", 
      alignItems: "center", 
      padding: 20, 
      justifyContent: "center" // 确保居中
    },
    avatar: { 
      width: 80, 
      height: 80, 
      borderRadius: 40, 
      backgroundColor: "#ddd", 
      marginRight: 15
    },
    name: { 
      fontSize: 24, 
      fontWeight: "bold", 
      color: "#fff" 
    },
    checkSection: { 
      flex: 1, 
      backgroundColor: "#FFFFFF", 
      paddingTop: 20, 
      borderTopLeftRadius: 30, 
      borderTopRightRadius: 30, 
      alignItems: "center",
      justifyContent: "flex-start",
      paddingBottom: 20 
    },
    subSection: { 
        backgroundColor: "#FFFFFF", 
        alignItems: "center",
        justifyContent: "flex-start",
        paddingBottom: 20 
      },
    completionScore: { 
        width: "100%", 
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        padding: 5
      },
    headText: { 
        fontSize: 18, 
        color: "#333", 
        textAlign: "center",
        alignSelf: "flex-start",
        fontWeight: "bold",
        padding: 10,
        textDecorationLine: "underline"
    },
    card: { 
        flex: 1,  
        backgroundColor: "#fff", 
        padding: 10, 
        margin: 5,
        borderRadius: 10, 
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 3,
        alignItems: "center",  
        justifyContent: "center",
    },
      cardText: {
        fontSize: 18,
        fontWeight: "bold",
        color: "#333",
        textAlign: "center",
      },
      statsText: { 
        fontSize: 20, 
        color: "#333", 
        margin: 5,
        textAlign: "center",
      },
    bold: { 
      fontWeight: "bold" 
    },
    buttonContainer: { 
      width: "100%", 
      alignItems: "center" 
    },
    button: { 
      backgroundColor: "#4CAF50", 
      padding: 15, 
      borderRadius: 10, 
      width: "90%", 
      marginBottom: 10, 
      alignItems: "center",
      shadowColor: "#000",
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.1,
      shadowRadius: 4,
      elevation: 3,
    },
    minibutton: { 
        backgroundColor: "#4CAF50", 
        padding: 10, 
        borderRadius: 10, 
        width: "90%", 
        alignItems: "center",
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 3,
      },
    buttonText: { 
      color: "#fff", 
      fontSize: 16, 
      fontWeight: "bold" 
    },
    divider: { width: "90%", alignSelf: "center", height: 1, backgroundColor: "#ddd"},
    gridContainer: {
        alignItems: "center",
        justifyContent: "center",
        paddingBottom: 5, 
      },
      taskItem: {
        alignItems: "center",
      },
      taskImage: {
        width: 50,
        height: 50,
      },
      taskDate: {
        fontSize: 12,
        color: "#666",
      },
      buttonGroup: {
        flexDirection: "row",
        justifyContent: "center",
        marginTop: 10,
        marginBottom: 10,
      },
      subbutton: {
        paddingVertical: 8,
        paddingHorizontal: 15,
        backgroundColor: "#E0E0E0",
        borderRadius: 5,
        marginHorizontal: 5,
      },
      selectedButton: {
        backgroundColor: "#4CAF50",
      },
      subbuttonText: {
        color: "#333",
        fontSize: 14,
      },
      selectedButtonText: {
        color: "#fff",
        fontWeight: "bold",
      },
  });