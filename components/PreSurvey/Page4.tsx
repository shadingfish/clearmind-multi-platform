import React, { useState, useEffect} from "react";
import { View, Image, SafeAreaView, ScrollView, Dimensions, StyleSheet, Text,Pressable, TextInput } from "react-native";
import { Label, RadioGroup, XStack, YStack } from 'tamagui'
import type { SizeTokens } from 'tamagui'
const { width } = Dimensions.get('window');
const { height } = Dimensions.get('window');
import { RadioButton } from 'react-native-paper';
import * as Progress from "react-native-progress";

export default function Page4() {
    const [ques11, setQues11] = useState("");
    const [ques12, setQues12] = useState("");
    const [ques13, setQues13] = useState("");
    const [ques14, setQues14] = useState("");
    const [ques15, setQues15] = useState("");

    const windowWidth = Dimensions.get("window").width;
    const windowHeight = Dimensions.get("window").height;

    const options = ['1', '2', '3', '4', '5']

    useEffect(() => {
        console.log('ques11:', ques11)
        console.log('ques12:', ques12)
        console.log('ques13:', ques13)
        console.log('ques14:', ques14)
        console.log('ques15:', ques15)
    }, [ques11, ques12, ques13, ques14, ques15]); // Dependency array, this effect runs when "count" changes

    return (

        <SafeAreaView style={styles.container}>
            <View style={{flex: 1, margin: '5%', justifyContent: 'space-between'}}>
                <View>
                    <View style={{ justifyContent: "center", alignItems: "center" }}>
                        <Text style={{ fontSize: 20, fontWeight: "bold" }}>
                        ClearMind Pre-Survey
                        </Text>
                        <Progress.Bar
                            style={{marginTop: '5%'}}
                            progress={4 / 11}
                            width={windowWidth * 0.8}
                            height={5}
                            color="#1EB688"
                            unfilledColor="#D3D3D3"
                            borderColor="#D3D3D3"
                        />
                    </View>
                    <Text
                        style={{
                        marginTop: "5%",
                        fontSize: 16,
                        fontWeight: "bold",
                        color: "#808080",
                        }}
                    >
                        How much do you, yourself agree to the following statements?
                    </Text>
                    <Text
                        style={{
                        fontSize: 16,
                        fontWeight: "bold",
                        color: "#808080",
                        }}
                    >
                        1 = Strongly Disagree; 5 = Strongly Agree
                    </Text>

                    <Text
                        style={styles.textQuestion}
                    >
                        11. Tests are meant to be studied for just the night before.
                    </Text>

                    <View>
                        <View style={{...styles.radioGroup}}>
                            {options.map((option, index) => (
                            <View style={styles.radioButton}>
                                <RadioButton.Android
                                key={option}
                                value={option}
                                status={ques11 === option ? 'checked' : 'unchecked'}
                                onPress={() => setQues11(option)} // Set the selected gender
                                color="#1EB688"
                                />
                                <Text style={styles.radioLabel}>
                                    {option}
                                </Text>
                            </View>
                            ))}
                        </View>
                    </View>

                <Text
                    style={styles.textQuestion}
                >
                    12. I feel prepared well in advance for most tests.
                </Text>

                <View>
                        <View style={{...styles.radioGroup}}>
                            {options.map((option, index) => (
                            <View style={styles.radioButton}>
                                <RadioButton.Android
                                key={option}
                                value={option}
                                status={ques12 === option ? 'checked' : 'unchecked'}
                                onPress={() => setQues12(option)} // Set the selected gender
                                color="#1EB688"
                                />
                                <Text style={styles.radioLabel}>
                                    {option}
                                </Text>
                            </View>
                            ))}
                        </View>
                </View>

                <Text
                    style={styles.textQuestion}
                >
                    13. "Cramming" and last minute studying is the best way that I study for a big test.
                </Text>

                <View>
                        <View style={{...styles.radioGroup}}>
                            {options.map((option, index) => (
                            <View style={styles.radioButton}>
                                <RadioButton.Android
                                key={option}
                                value={option}
                                status={ques13 === option ? 'checked' : 'unchecked'}
                                onPress={() => setQues13(option)} // Set the selected gender
                                color="#1EB688"
                                />
                                <Text style={styles.radioLabel}>
                                    {option}
                                </Text>
                            </View>
                            ))}
                        </View>
                </View>

                <Text
                    style={styles.textQuestion}
                >
                    14. I allocate time so I don't have to "cram" at the end of the semester.
                </Text>

                <View>
                        <View style={{...styles.radioGroup}}>
                            {options.map((option, index) => (
                            <View style={styles.radioButton}>
                                <RadioButton.Android
                                key={option}
                                value={option}
                                status={ques14 === option ? 'checked' : 'unchecked'}
                                onPress={() => setQues14(option)} // Set the selected gender
                                color="#1EB688"
                                />
                                <Text style={styles.radioLabel}>
                                    {option}
                                </Text>
                            </View>
                            ))}
                        </View>
                </View>

                <Text
                    style={styles.textQuestion}
                >
                    15. I only study the night before exams.
                </Text>

                <View>
                        <View style={{...styles.radioGroup}}>
                            {options.map((option, index) => (
                            <View style={styles.radioButton}>
                                <RadioButton.Android
                                key={option}
                                value={option}
                                status={ques15 === option ? 'checked' : 'unchecked'}
                                onPress={() => setQues15(option)} // Set the selected gender
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
    )

};

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
        marginLeft: '5%'
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