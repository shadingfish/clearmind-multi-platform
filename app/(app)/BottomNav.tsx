import React, { useState } from "react";
import { View, TouchableOpacity, Image, Text, StyleSheet } from "react-native";
import { useRouter } from "expo-router";

const BottomNav = () => {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState("Learn");

  return (
    <View style={styles.bottomNav}>
      {[
        { name: "Learn", icon: require("@/assets/images/learn.png"), route: "/(app)" as const },
        { name: "Tracker", icon: require("@/assets/images/tracker.png"), route: "/(app)/tracker" as const },
        // { name: "Achieve", icon: require("@/assets/images/achievement.png"), route: "/(app)/achieve" as const },
        { name: "Profile", icon: require("@/assets/images/profile.png"), route: "/(app)/profile" as const },
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
  );
};

const styles = StyleSheet.create({
  bottomNav: {flexDirection: "row", backgroundColor: "#FFFFFF", height: 60, borderBottomLeftRadius: 30, borderBottomRightRadius: 30 },
  navButton: { flex: 1, alignItems: "center", padding: 10 },
  activeNavButton: { backgroundColor: "#54B363" },
  navIcon: { width: 28, height: 28, tintColor: "black" },
  activeNavIcon: { tintColor: "white" },
  navText: { fontSize: 14, color: "black" },
  activeNavText: { color: "white", fontWeight: "900" },
});

export default BottomNav;