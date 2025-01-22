// app/(login)/_layout.tsx

import colors from "@/constants/colors";
import Entypo from "@expo/vector-icons/Entypo";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import { router } from "expo-router";
import { Drawer } from "expo-router/drawer";
import { Text } from "react-native";
import { GestureHandlerRootView } from "react-native-gesture-handler";
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
          headerTintColor: "#FFFFFF",
          headerTitleStyle: {
            fontWeight: "bold", // Bold font
            fontSize: 19, // Font size
          },
          headerStyle: {
            backgroundColor: colors.headerBackground,
          },
          headerLeft: () => (
            <Button
              unstyled
              onPress={() => {
                router.dismissTo("/(login)/chapter2");
              }}
              style={{ marginLeft: 20 }}
            >
              <Entypo name="home" size={24} color="white" />
            </Button>
          ),
          headerRight: () => (
            <Button
              unstyled
              onPress={() => navigation.toggleDrawer()}
              style={{ marginRight: 20 }}
            >
              <MaterialIcons
                name="format-list-bulleted"
                size={24}
                color="white"
              />
            </Button>
          ),
        })}
      >
        <Drawer.Screen
          name="opening" // This is the name of the page and must match the url from root
          options={{
            drawerLabel: "Opening",
            title: "Part 2 Opening",
          }}
        />

        <Drawer.Screen
          name="activity1" // This is the name of the page and must match the url from root
          options={{
            drawerLabel: "Your Challenging Emotions",
            headerTitle: () => (
              <Text
                style={{
                  fontWeight: "bold", // Bold font
                  fontSize: 19,
                  color: "#FFFFFF",
                  width: "120%",
                  alignSelf: "center",
                }}
              >
                Identify and Describe Your Challenging Emotions
              </Text>
            ),
            headerStyle: {
              height: 125,
              backgroundColor: colors.headerBackground,
            },
          }}
        />

        <Drawer.Screen
          name="activity2" // This is the name of the page and must match the url from root
          options={{
            drawerLabel: "Passengers on the Bus",
            headerTitle: () => (
              <Text
                style={{
                  fontWeight: "bold", // Bold font
                  fontSize: 19,
                  color: "#FFFFFF",
                  alignSelf: "center",
                }}
              >
                Passengers on the Bus Metaphor
              </Text>
            ),
            headerStyle: {
              height: 120,
              backgroundColor: colors.headerBackground,
            },
          }}
        />

        <Drawer.Screen
          name="activity3" // This is the name of the page and must match the url from root
          options={{
            drawerLabel: "Examples of Driving the bus",
            headerTitle: () => (
              <Text
                style={{
                  fontWeight: "bold", // Bold font
                  fontSize: 19,
                  color: "#FFFFFF",
                  alignSelf: "center",
                }}
              >
                Examples of Driving The Bus
              </Text>
            ),
            headerStyle: {
              height: 120,
              backgroundColor: colors.headerBackground,
            },
          }}
        />

        <Drawer.Screen
          name="activity4" // This is the name of the page and must match the url from root
          options={{
            drawerLabel: "Identify Your Passengers",
            headerTitle: () => (
              <Text
                style={{
                  fontWeight: "bold", // Bold font
                  fontSize: 19,
                  color: "#FFFFFF",
                  alignSelf: "center",
                  width: "120%",
                }}
              >
                Identify Your Own Destination & Passengers
              </Text>
            ),
            headerStyle: {
              height: 120,
              backgroundColor: colors.headerBackground,
            },
          }}
        />

        <Drawer.Screen
          name="activity5" // This is the name of the page and must match the url from root
          options={{
            drawerLabel: "Willingness to Carry On",
            headerTitle: () => (
              <Text
                style={{
                  fontWeight: "bold", // Bold font
                  fontSize: 19,
                  color: "#FFFFFF",
                  alignSelf: "center",
                  width: "125%",
                }}
              >
                Allow Challenging Passengers Be on Your Bus
              </Text>
            ),
            headerStyle: {
              height: 120,
              backgroundColor: colors.headerBackground,
            },
          }}
        />

        <Drawer.Screen
          name="summary" // This is the name of the page and must match the url from root
          options={{
            drawerLabel: "Summary",
            title: "Part 2 Summary",
          }}
        />
      </Drawer>
    </GestureHandlerRootView>
  );
}
