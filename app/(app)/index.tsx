// app/(app)/index.tsx

import React, { useEffect, useState } from "react";
import {
  View,
  ImageBackground,
  Text,
  TouchableOpacity,
  ScrollView,
  Dimensions,
  Image,
  StyleSheet
} from "react-native";
import { useRouter } from "expo-router";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { auth, database } from "@/constants/firebaseConfig";
import { doc, getDoc, setDoc} from "firebase/firestore";
import * as Progress from "react-native-progress"; 
import { Button } from "tamagui";
import { useAuth } from "@/hooks/useAuth"; 
import { useChapterProgressContext } from "@/contexts/AuthContext";

const { width } = Dimensions.get("window");

const chapters = ["presurvey", "chapter1", "chapter2", "chapter3", "chapter4", "postsurvey"] as const;

const validchap = ["presurvey", "chapter1", "chapter2", "chapter3", "chapter4"] as const;

type ChapterKey = typeof chapters[number];
type ChapterStatus = Record<ChapterKey, "0" | "1" | "2">;

const defaultChapterStatus: ChapterStatus = {
  presurvey: "2",
  chapter1: "0",
  chapter2: "0",
  chapter3: "0",
  chapter4: "0",
  postsurvey: "0",
};

async function getUserChapterProgress() {
  const user = auth.currentUser;
  if (!user) return null;

  const progressRef = doc(database, "ChapterProgress", user.uid);
  const snapshot = await getDoc(progressRef);

  if (snapshot.exists()) {
    return snapshot.data() as ChapterStatus;
  } else {
    console.log("No ChapterProgress found, initializing...");
    await setDoc(progressRef, defaultChapterStatus);
    return defaultChapterStatus;
  }
}

async function updateAllChapterProgress(userId: string, chapters: ChapterKey[]) {
  try {
    const progressRef = doc(database, "ChapterProgress", userId);
    const currentProgress = await getDoc(progressRef);

    let updatedStatus: ChapterStatus = { ...defaultChapterStatus };
    const currentData = currentProgress.exists() ? currentProgress.data() as ChapterStatus : defaultChapterStatus;

    let startIndex = chapters.findIndex(chap => currentData[chap] === "1"); 
    if (startIndex === -1) startIndex = 0;

    for (let i = startIndex; i < chapters.length; i++) {
      const chapterRef = doc(database, `Chapter${i + 1}`, "Progress", "users", userId);
      const chapterDoc = await getDoc(chapterRef);

      if (chapterDoc.exists()) {
        const chapterData = chapterDoc.data();
        const isFinished = Object.values(chapterData).every(val => val === "1");
        const status = isFinished ? "2" : Object.values(chapterData).some(val => val === "1") ? "1" : "0";

        updatedStatus[chapters[i]] = status;

        if (status !== "2") break;
      } else {
        updatedStatus[chapters[i]] = "0";
        break;
      }
    }

    await setDoc(progressRef, updatedStatus, { merge: true });
    console.log("Chapter progress updated successfully!");
    return updatedStatus;
  } catch (err) {
    console.error("Error updating chapter progress:", err);
  }
}

export default function HomePage() {
  const router = useRouter();
  const { top } = useSafeAreaInsets();
  const [username, setUsername] = useState("User");
  const [progress, setProgress] = useState(0);
  const [activeTab, setActiveTab] = useState("Learn"); 
  const { handleFirebaseLogout, isSignedIn, pending} = useAuth();

  const [statuses, setStatuses] = useState<ChapterStatus>({ ...defaultChapterStatus });

  useEffect(() => {
    console.log("User Signed In:", isSignedIn);
    if (pending) return;
    if (!isSignedIn) router.replace(`/(login)`);
  }, [isSignedIn, pending]);

  const {chap1Percent, chap2Percent, chap3Percent, chap4Percent} = useChapterProgressContext(); //you can use this for the chapter progress

  useEffect(() => {
    const fetchUserData = async () => {
      const user = auth.currentUser;
      if (user) {
        setUsername(user.displayName || "User");
        const progressData = await updateAllChapterProgress(user.uid, [...validchap]);
        if (progressData) {
          setStatuses(progressData);
          const completedChapters = validchap.filter(chap => progressData[chap] === "2").length;
          setProgress((completedChapters / validchap.length) * 100);
        }
      }
    };
    fetchUserData();
  }, []);

  const handleLogout = () => {
    console.log("current: " + isSignedIn)
    if (isSignedIn) {
      handleFirebaseLogout();
    } else {
      console.log("No user is logged in.");
    }
  };

  const chapterImages: Record<ChapterKey, Record<"0" | "1" | "2", any>> = {
    presurvey: {
      "0": require("@/assets/images/imgbutton_presurvey_0.png"),
      "1": require("@/assets/images/imgbutton_presurvey_1.png"),
      "2": require("@/assets/images/imgbutton_presurvey_2.png"),
    },
    chapter1: {
      "0": require("@/assets/images/imgbutton_chapter1_0.png"),
      "1": require("@/assets/images/imgbutton_chapter1_1.png"),
      "2": require("@/assets/images/imgbutton_chapter1_2.png"),
    },
    chapter2: {
      "0": require("@/assets/images/imgbutton_chapter2_0.png"),
      "1": require("@/assets/images/imgbutton_chapter2_1.png"),
      "2": require("@/assets/images/imgbutton_chapter2_2.png"),
    },
    chapter3: {
      "0": require("@/assets/images/imgbutton_chapter3_0.png"),
      "1": require("@/assets/images/imgbutton_chapter3_1.png"),
      "2": require("@/assets/images/imgbutton_chapter3_2.png"),
    },
    chapter4: {
      "0": require("@/assets/images/imgbutton_chapter4_0.png"),
      "1": require("@/assets/images/imgbutton_chapter4_1.png"),
      "2": require("@/assets/images/imgbutton_chapter4_2.png"),
    },
    postsurvey: {
      "0": require("@/assets/images/imgbutton_postsurvey_0.png"),
      "1": require("@/assets/images/imgbutton_postsurvey_1.png"),
      "2": require("@/assets/images/imgbutton_postsurvey_2.png"),
    },
  };

  return (
    
    <View style={{ flex: 1, paddingTop: top, backgroundColor: "#54B363" }}>
      {/* 顶部欢迎信息 & 进度环 */}
      <View style={styles.topSection}>
        <View style={styles.textContainer}>
          <Text style={styles.title}>Hi, {username}!</Text>
          <Text style={styles.subtitle}>
            Welcome to ClearMind Learn page. Let's see your challenge for today.
          </Text>
        </View>
        <View style={styles.progressContainer}>
          <Progress.Circle
            size={80}
            progress={progress / 100}
            showsText={true}
            color="#FFFFFF"
            borderWidth={8}
            unfilledColor="#76C893"
            borderColor="#54B363"
            formatText={() => `${Math.round(progress)}%`}
          />
        </View>
      </View>

      <View style={styles.chapterSection}>
        <ScrollView contentContainerStyle={{ paddingBottom: 80, alignItems: "center" }}>
          {validchap.map((chapter, index) => ( //add if presurvey, show modal
            <TouchableOpacity
              key={index}
              onPress={() => router.push(`/(app)/${chapter}`)}
              style={styles.chapterButton}
            >
              <ImageBackground
                source={chapterImages[chapter][statuses[chapter]]}
                style={styles.chapterImage}
                resizeMode="contain"
              />
            </TouchableOpacity>
          ))}
        </ScrollView>
          <View style={styles.logoutContainer}>
            <Button onPress={handleLogout} backgroundColor="#FF3B30">
              Logout
            </Button>
          </View>
      </View>

      <View style={styles.bottomNav}>
        {[
          { name: "Learn", icon: require("@/assets/images/learn.png"), route: "/(app)" as const},
          { name: "Tracker", icon: require("@/assets/images/tracker.png"), route: "/(app)/tracker"  as const},
          { name: "Achieve", icon: require("@/assets/images/achievement.png"), route: "/(app)/achieve"  as const},
          { name: "Profile", icon: require("@/assets/images/profile.png"), route: "/(app)/profile"  as const},
        ].map((tab, index) => (
          <TouchableOpacity
            key={index}
            style={[styles.navButton, activeTab === tab.name && styles.activeNavButton]}
            onPress={() => {
              setActiveTab(tab.name);
              router.push(tab.route);
            }}
          >
            <Image source={tab.icon} style={[styles.navIcon, activeTab === tab.name && styles.activeNavIcon]} />
            <Text style={[styles.navText, activeTab === tab.name && styles.activeNavText]}>{tab.name}</Text>
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );


}

const styles = StyleSheet.create({
  topSection: { flexDirection: "row", alignItems: "center", padding: 16 },
  textContainer: { flex: 7 },
  progressContainer: { flex: 3, alignItems: "center" },
  title: { fontSize: 24, color: "#FFFFFF", fontWeight: "bold" },
  subtitle: { fontSize: 14, color: "#FFFFFF", marginTop: 8 },
  chapterSection: { flex: 1, backgroundColor: "#FFFFFF", paddingTop: 20, borderTopLeftRadius: 30, borderTopRightRadius: 30},
  chapterButton: { width: width * 0.8, borderRadius: 10, shadowOpacity: 0.2, shadowRadius: 4 },
  chapterImage: { width: "100%", height: 120 },
  bottomNav: { flexDirection: "row", backgroundColor: "#FFFFFF", height: 60, marginBottom: 30, borderBottomLeftRadius: 30, borderBottomRightRadius: 30},
  navButton: { flex: 1, alignItems: "center", padding: 10 },
  activeNavButton: { backgroundColor: "#54B363" },
  navIcon: { width: 24, height: 24, tintColor: "black" },
  activeNavIcon: { tintColor: "white" },
  navText: { fontSize: 12, color: "black" },
  activeNavText: { color: "white", fontWeight: "900"},
  logoutContainer: { alignItems: "center", marginVertical: 10,},
});