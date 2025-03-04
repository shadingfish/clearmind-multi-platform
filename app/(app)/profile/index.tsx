// app/(app)/profile/index.tsx

import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  Image,
  StyleSheet,
  Dimensions,
} from "react-native";
import { useRouter } from "expo-router";
import { auth } from "@/constants/firebaseConfig";
import { doc, getDoc } from "firebase/firestore";
import { database } from "@/constants/firebaseConfig";
import { useAuth } from "@/hooks/useAuth";
import { useSafeAreaInsets } from "react-native-safe-area-context";

const { width } = Dimensions.get("window");

export default function ProfileScreen() {
  const router = useRouter();
  const { handleFirebaseLogout, isSignedIn } = useAuth();
  const { top } = useSafeAreaInsets();
  const [userData, setUserData] = useState({
    username: "Loading...",
    email: "Loading...",
    fullName: "Loading...",
    signInDays: 0,
    avgTime: "0 mins",
    lastDayTime: "0 min",
  });

  const handleLogout = () => {
    console.log("current: " + isSignedIn)
    if (isSignedIn) {
      console.log("Signing out");
      handleFirebaseLogout();
      router.push(`/`)
    } else {
      console.log("No user is logged in.");
    }
  };

  useEffect(() => {
    const fetchUserData = async () => {
      const user = auth.currentUser;
      if (user) {
        const userRef = doc(database, "users", user.uid);
        const snapshot = await getDoc(userRef);
        if (snapshot.exists()) {
          const data = snapshot.data();
          setUserData({
            username: data.username,
            email: data.email,
            fullName: data.fullname,
            signInDays: data.signInDays || 0,
            avgTime: data.avgTime || "0 mins",
            lastDayTime: data.lastDayTime || "0 min",
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
    <Image source={require("@/assets/images/clearmind_icon.png")} style={styles.avatar} />
    <Text style={styles.name}>{userData.fullName}</Text>
  </View>

  {/* Profile Section (让它填充剩余空间) */}
  <View style={styles.profileSection}>
    <View style={styles.profileContent}>
      {/* Username + Email card */}
      <View style={styles.card}>
        <Text style={styles.infoText}>Username: {userData.username}</Text>
        <Text style={styles.infoText}>Email: {userData.email}</Text>
      </View>

      {/* signed in card */}
      <View style={styles.card}>
        <Text style={styles.statsText}>
          📅 Signed in <Text style={styles.bold}>{userData.signInDays} days</Text> this week. ({userData.avgTime}/avg.)
        </Text>
        <Text style={styles.statsText}>
          ⏳ Spent <Text style={styles.bold}>{userData.lastDayTime}</Text> yesterday.
        </Text>
      </View>
    </View>

    {/* 按钮区域 (固定在底部) */}
    <View style={styles.buttonContainer}>
      <TouchableOpacity style={styles.button} onPress={() => router.push("/(app)/profile/settings")}>
        <Text style={styles.buttonText}>SETTINGS</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.button}>
        <Text style={styles.buttonText}>PRIVACY & DISCLAIMER</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
        <Text style={styles.logoutText}>SIGN OUT</Text>
      </TouchableOpacity>
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
      marginRight: 15 // 头像和名字间距
    },
    name: { 
      fontSize: 24, 
      fontWeight: "bold", 
      color: "#fff" 
    },
    profileSection: { 
      flex: 1, 
      backgroundColor: "#FFFFFF", 
      paddingTop: 20, 
      borderTopLeftRadius: 30, 
      borderTopRightRadius: 30, 
      alignItems: "center",
      justifyContent: "space-between", // 让内容与按钮之间自动推开
      paddingBottom: 20 // 防止与屏幕底部贴得太紧
    },
    profileContent: { 
      width: "100%", 
      alignItems: "center" 
    },
    card: { 
      backgroundColor: "#fff", 
      padding: 15, 
      borderRadius: 10, 
      width: "90%", 
      marginBottom: 10, 
      shadowColor: "#000", // 阴影
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.1,
      shadowRadius: 4,
      elevation: 3, // Android 阴影
    },
    infoText: { 
      fontSize: 16, 
      color: "#333" 
    },
    statsText: { 
      fontSize: 16, 
      color: "#333", 
      marginBottom: 5 
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
    buttonText: { 
      color: "#fff", 
      fontSize: 16, 
      fontWeight: "bold" 
    },
    logoutButton: { 
      backgroundColor: "#FF3B30", 
      padding: 15, 
      borderRadius: 10, 
      width: "90%", 
      marginTop: 10, 
      alignItems: "center",
      shadowColor: "#000",
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.1,
      shadowRadius: 4,
      elevation: 3,
    },
    logoutText: { 
      color: "#fff", 
      fontSize: 16, 
      fontWeight: "bold" 
    },
  });