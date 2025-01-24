import { useAuth } from "@/hooks/useAuth";
import { useRootNavigationState, Redirect } from "expo-router";
import * as SplashScreen from "expo-splash-screen";
import { useCallback, useState } from "react";
import { View, Text } from "react-native";

// Keep the splash screen visible while we fetch resources
SplashScreen.preventAutoHideAsync();

// Set the animation options. This is optional.
SplashScreen.setOptions({
  duration: 1000,
  fade: true,
});

export default function App() {
  const { isSignedIn, pending } = useAuth();

  const onLayoutRootView = useCallback(() => {
    if (!pending) {
      SplashScreen.hide();
    }
  }, [pending]);

  if (pending) {
    return null;
  }

  return (
    <View
      style={{ flex: 1, alignItems: "center", justifyContent: "center" }}
      onLayout={onLayoutRootView}
    >
      {isSignedIn ? (
        <Redirect href={"/(app)"} />
      ) : (
        <Redirect href={"/(login)"} />
      )}
    </View>
  );
}

// // // app/index.tsx
// // //import MainScreen from "./screens/MainScreen";
// // import CurrPage from "../components/PreSurvey/CurrPage";
// import Chapter3Pages from "../components/Chapter3/Chapter3Pages"

// export default function Index() {
//   //return <MainScreen />;
//   //return <CurrPage/>;
//   return <Chapter3Pages/>;
// } 
