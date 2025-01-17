// app/(login)/_layout.tsx

import { GestureHandlerRootView } from "react-native-gesture-handler";
import { Drawer } from "expo-router/drawer";
import { View, Text, StyleSheet } from "react-native";
import { useNavigation, router } from "expo-router";
import { DrawerActions } from "@react-navigation/native";
import { Button } from "tamagui";

export default function RootLayout() {
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <Drawer
        screenOptions={({ navigation }) => ({
          drawerPosition: "right", // Set the drawer to open from the right
          drawerStyle: {
            width: "70%", // Drawer width
          },
          headerLeft: () => (
            <Button
              style={styles.headerRightContainer}
              onPress={() => {
                console.log("re");
                router.push("/(login)");
              }}
            >
              <Text style={styles.headerRightText}>Help</Text>
            </Button>
          ),
          headerRight: () => (
            <Button
              style={styles.headerLeftContainer}
              onPress={() => navigation.toggleDrawer()}
            >
              <Text style={styles.headerLeftText}>Menu</Text>
            </Button>
          ),
        })}
      >
        <Drawer.Screen
          name="index" // This is the name of the page and must match the url from root
          options={{
            drawerLabel: "Home",
            title: "Part 2",
          }}
        />

        <Drawer.Screen
          name="test" // This is the name of the page and must match the url from root
          options={{
            drawerLabel: "Home",
            title: "Part 2, abs",
          }}
        />
      </Drawer>
    </GestureHandlerRootView>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#f8f9fa",
  },
  contentText: {
    fontSize: 18,
    color: "#333",
  },
  headerRightContainer: {
    marginRight: 16,
  },
  headerRightText: {
    color: "black",
    fontSize: 16,
    fontWeight: "500",
  },
  headerLeftContainer: {
    marginLeft: 16,
  },
  headerLeftText: {
    color: "black",
    fontSize: 16,
    fontWeight: "500",
  },
});
