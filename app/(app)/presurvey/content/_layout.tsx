// app/(app)/_layout.tsx

import colors from "@/constants/colors";
import Entypo from "@expo/vector-icons/Entypo";
import { Header } from "@react-navigation/elements";

import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import { RelativePathString, router, Stack } from "expo-router";
import { Dimensions, SafeAreaView, Text, View } from "react-native";

import { Button } from "tamagui";
import SidebarModal from "@/app/SidebarModal";
import { useRoute } from "@react-navigation/native";
import { useNavigation } from "@react-navigation/native";
import React, { useState } from "react";
import * as Progress from "react-native-progress";

export default function RootLayout() {
    
  const route = useRoute();
  const navigation = useNavigation();

  const windowWidth = Dimensions.get("window").width;
  const windowHeight = Dimensions.get("window").height;

  const [pagesCompleted, setPagesCompleted] = useState<number>(0); //or could be part of context! let's do that

  return (
    <>
    <Stack
      screenOptions={() => ({
        headerTintColor: "#FFFFFF",
        headerTitleStyle: {
          fontWeight: "bold", // Bold font
          fontSize: 19, // Font size
        },
        headerLeft: () => (
          <Button
            unstyled
            onPress={() => {
              router.replace("/(app)" as RelativePathString);
            }}
            style={{ marginLeft: 20 }}
          >
            <Entypo name="home" size={24} color="white" />
          </Button>
        ),
        header: () => (
          <SafeAreaView style={{ justifyContent: "center", alignItems: "center" }}>
            <Text style={{ fontSize: 20, fontWeight: "bold" }}>
              ClearMind Pre-Survey
            </Text>
            <Progress.Bar
              style={{ marginTop: '5%' }}
              progress={pagesCompleted / 14} //this needs to be updated on next probably, probably read from backend?
              width={windowWidth * 0.8}
              height={5}
              color="#1EB688"
              unfilledColor="#D3D3D3"
              borderColor="#D3D3D3"
            />
          </SafeAreaView>
        ),
      })}
    >
      <Stack.Screen
        name="activity1" // This is the name of the page and must match the url from root
      />
      <Stack.Screen
        name="activity2" // This is the name of the page and must match the url from root
      />
      <Stack.Screen
        name="activity3" // This is the name of the page and must match the url from root
      />
      <Stack.Screen
        name="activity4" // This is the name of the page and must match the url from root
      />
      <Stack.Screen
        name="activity5" // This is the name of the page and must match the url from root
      />
      <Stack.Screen
        name="activity6" // This is the name of the page and must match the url from root
      />
      <Stack.Screen
        name="activity7" // This is the name of the page and must match the url from root
      />
      <Stack.Screen
        name="activity8" // This is the name of the page and must match the url from root
      />
      <Stack.Screen
        name="activity9" // This is the name of the page and must match the url from root
      />
      <Stack.Screen
        name="activity10" // This is the name of the page and must match the url from root
      />
      <Stack.Screen
        name="activity11" // This is the name of the page and must match the url from root
      />
      <Stack.Screen
        name="activity12" // This is the name of the page and must match the url from root
      />
      <Stack.Screen
        name="activity13" // This is the name of the page and must match the url from root
      />
      <Stack.Screen
        name="activity14" // This is the name of the page and must match the url from root
      />

    </Stack>
    </>
  );
}
