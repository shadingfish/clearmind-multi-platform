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
import { View, Image, SafeAreaView, ScrollView, Dimensions, StyleSheet, Text,Pressable, TextInput } from "react-native";
import { Label, RadioGroup, XStack, YStack } from 'tamagui'
import type { SizeTokens } from 'tamagui'
const { width } = Dimensions.get('window');
const { height } = Dimensions.get('window');
import { RadioButton } from 'react-native-paper';

export default function Page1() {
    const [age, setAge] = useState("");
    const [major, setMajor] = useState("");

    const [gender, setGender] = useState("");
    const [yearsSchooling, setYearsSchooling] = useState("");

    const yearOptions = ["0-1 year", "1-2 years","2-3 years", "3-4 years", "4+ years"]

    useEffect(() => {
      console.log('age:', age)
      console.log('gender:', gender)
      console.log('major:', major)
      console.log('yearsSchooling:', yearsSchooling)
    }, [age, gender, major, yearsSchooling]); // Dependency array, this effect runs when "count" changes


    return (
      <SafeAreaView style={styles.container}>
        <View style={{flex: 1, margin: '5%', justifyContent: 'space-between'}}>
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
            This Survey takes approximately <Text style={{textDecorationLine: 'underline',}}>10 minutes</Text> to complete.
          </Text>

          <Text
            style={styles.textQuestion}
          >
            What's your age?
          </Text>

          <TextInput
            style={styles.textInputLine}
            placeholder="age"
            placeholderTextColor="#aaa"
            onChangeText={(value) => setAge(value)} 
            value={age} 
            maxLength={3}
        />

      <Text
        style={styles.textQuestion}
            >
          What's your gender?
      </Text>

      <View>
            <View style={styles.radioGroup}>
                <View style={styles.radioButton}>
                    <RadioButton.Android
                        value="Male"
                        status={gender === 'Male' ? 
                                'checked' : 'unchecked'}
                        onPress={() => setGender('Male')}
                        color="#1EB688"
                    />
                    <Text style={styles.radioLabel}>
                        Male
                    </Text>
                </View>

                <View style={{...styles.radioButton, marginLeft: '5%'}}>
                    <RadioButton.Android
                        value="Female"
                        status={gender === 'Female' ? 
                                 'checked' : 'unchecked'}
                        onPress={() => setGender('Female')}
                        color="#1EB688"
                    />
                    <Text style={styles.radioLabel}>
                        Female
                    </Text>
                </View>

                <View style={{...styles.radioButton, marginLeft: '5%'}}>
                    <RadioButton.Android
                        value="Other"
                        status={gender === 'Other' ? 
                                 'checked' : 'unchecked'}
                        onPress={() => setGender('Other')}
                        color="#1EB688"
                    />
                    <Text style={styles.radioLabel}>
                        Other
                    </Text>
                </View>
            </View>
        </View>

        

        <Text
            style={styles.textQuestion}
          >
            What's your major?
          </Text>

          <TextInput
            style={styles.textInputLine}
            placeholder="major"
            placeholderTextColor="#aaa"
            onChangeText={(value) => setMajor(value)} 
            value={major} 
            maxLength={50}
        />

        <Text
            style={styles.textQuestion}
          >
            Year at school? (Total number of years in Colleges/Universities after high school)
          </Text>

        <View>
            <View style={{...styles.radioGroup, flexDirection: 'column'}}>
                {yearOptions.map((option) => (
                  <View style={styles.radioButton}>
                    <RadioButton.Android
                      key={option}
                      value={option}
                      status={yearsSchooling === option ? 'checked' : 'unchecked'}
                      onPress={() => setYearsSchooling(option)} // Set the selected gender
                      color="#1EB688"
                    />
                    <Text style={styles.radioLabel}>
                          {option}
                      </Text>
                  </View>
                  ))}
            </View>
        </View>

        </View>

        {/* navigate and pass the current data as props once the navigation stack is set up */}

        <View style={{alignItems: 'center', flexDirection: "row", justifyContent: "space-between", padding: '5%'}}>
            <Pressable style={styles.navButtons}>
                <Text style={{fontSize: 16}}>BACK</Text>
            </Pressable>
            <Pressable style={styles.navButtons}>
                <Text style={{fontSize: 16}}>NEXT</Text>
            </Pressable>
        </View>
        </View>
      </SafeAreaView>
    );
  }
  
  const styles = StyleSheet.create({
    container: {
      //flex: 1, // Make the SafeAreaView fill the screen
      width: '100%',
      height: '100%',
      //margin: "5%",
      //justifyContent: "space-between", // Space out children vertically
      backgroundColor: "white"
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
    },
    radioGroup: {
      flexDirection: 'row',
      //alignItems: 'center',
      paddingHorizontal: '5%',
      marginTop: 5,
    },
    radioButton: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    radioLabel: {
        fontSize: 16,
        color: '#333',
    },
    navButtons: {
      backgroundColor: "#54B363",
      paddingHorizontal: '8%',
      paddingVertical: '3%',
      borderRadius: 5,
      alignItems: 'center',
      justifyContent: 'center'
    }
  });