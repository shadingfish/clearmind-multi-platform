// components/BackgroundImage.tsx

// import React from "react";
// import { View } from "react-native";
// import DarkGreen from "../assets/images/dark_green.svg";
// import MediumGreen from "../assets/images/medium_green.svg";
// import LightGreen from "../assets/images/light_green.svg";

// export default function BackgroundImage() {
//   return (
//     <View style={{ position: "absolute", bottom: 0, width: "100%" }}>
//       <DarkGreen width="100%" height={100} />
//       <MediumGreen width="100%" height={100} style={{ marginTop: -10 }} />
//       <LightGreen width="100%" height={100} style={{ marginTop: -10 }} />
//     </View>
//   );
// }
import React, { useState, useEffect} from "react";
import { View, Image, SafeAreaView, ScrollView, StyleSheet, Text,Pressable, TextInput } from "react-native";

export default function Page1() {
    const [age, setAge] = useState("");
    const [major, setMajor] = useState("");

    return (
      <SafeAreaView style={styles.container}>
        <View>
          <View style={{ justifyContent: "center", alignItems: "center" }}>
            <Text style={{ fontSize: 20, fontWeight: "bold" }}>
              ClearMind Pre-Survey
            </Text>
          </View>
          <Text
            style={{
              marginTop: "5%",
              fontSize: 16,
              fontWeight: "bold",
              color: "#808080",
            }}
          >
            This Survey takes approximately 10 minutes to complete.
          </Text>

          <Text
            style={styles.textQuestion}
          >
            What's your age?
          </Text>

          <TextInput
            style={styles.textInputLine}
            placeholder="Type here"
            placeholderTextColor="#aaa"
            onChangeText={(value) => setAge(value)} 
            value={age} 
            maxLength={3}
        />

        <Text
            style={styles.textQuestion}
          >
            What's your major?
          </Text>

          <TextInput
            style={styles.textInputLine}
            placeholder="Type here"
            placeholderTextColor="#aaa"
            onChangeText={(value) => setMajor(value)} 
            value={major} 
            maxLength={50}
        />


        </View>
        <View style={{flexDirection: "row", justifyContent: "space-between", padding: '5%'}}>
            <Pressable>
                <Text>BACK</Text>
            </Pressable>
            <Pressable>
                <Text>NEXT</Text>
            </Pressable>
        </View>
      </SafeAreaView>
    );
  }
  
  const styles = StyleSheet.create({
    container: {
      flex: 1, // Make the SafeAreaView fill the screen
      margin: "5%",
      justifyContent: "space-between", // Space out children vertically
    },
    textInputLine: {
        marginTop: '3%',
        borderBottomWidth: 1,
        borderBottomColor: '#808080',
        fontSize: 16,
        paddingVertical: 5,
        width: '100%',
    },
    textQuestion: {
        marginTop: "5%",
        fontSize: 16,
        color: "#808080",
    }
  });