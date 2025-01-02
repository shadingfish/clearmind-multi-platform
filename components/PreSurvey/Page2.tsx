import React, { useState, useEffect} from "react";
import { View, Image, SafeAreaView, ScrollView, Dimensions, StyleSheet, Text,Pressable, TextInput } from "react-native";
import { Label, RadioGroup, XStack, YStack } from 'tamagui'
import type { SizeTokens } from 'tamagui'
const { width } = Dimensions.get('window');
const { height } = Dimensions.get('window');
import { RadioButton } from 'react-native-paper';

export default function Page1() {
    const [ques1, setQues1] = useState("");
    const [ques2, setQues2] = useState("");
    const [ques3, setQues3] = useState("");
    const [ques4, setQues4] = useState("");
    const [ques5, setQues5] = useState("");

    const options = ['1', '2', '3', '4', '5']

    useEffect(() => {
        console.log('ques1:', ques1)
        console.log('ques2:', ques2)
        console.log('ques3:', ques3)
        console.log('ques4:', ques4)
        console.log('ques5:', ques5)
    }, [ques1, ques2, ques3, ques4, ques5]); // Dependency array, this effect runs when "count" changes

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
                        1. I usually allocate time to review and proofread my work.
                    </Text>

                    <View>
                        <View style={{...styles.radioGroup}}>
                            {options.map((option, index) => (
                            <View style={styles.radioButton}>
                                <RadioButton.Android
                                key={option}
                                value={option}
                                status={ques1 === option ? 'checked' : 'unchecked'}
                                onPress={() => setQues1(option)} // Set the selected gender
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
                    2. I put off projects until the last minute.
                </Text>

                <View>
                        <View style={{...styles.radioGroup}}>
                            {options.map((option, index) => (
                            <View style={styles.radioButton}>
                                <RadioButton.Android
                                key={option}
                                value={option}
                                status={ques2 === option ? 'checked' : 'unchecked'}
                                onPress={() => setQues2(option)} // Set the selected gender
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
                    3. I have found myself waiting until the day before to start a big project.
                </Text>

                <View>
                        <View style={{...styles.radioGroup}}>
                            {options.map((option, index) => (
                            <View style={styles.radioButton}>
                                <RadioButton.Android
                                key={option}
                                value={option}
                                status={ques3 === option ? 'checked' : 'unchecked'}
                                onPress={() => setQues3(option)} // Set the selected gender
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
                    4. I know I should work on school work, but I just don't do it.
                </Text>

                <View>
                        <View style={{...styles.radioGroup}}>
                            {options.map((option, index) => (
                            <View style={styles.radioButton}>
                                <RadioButton.Android
                                key={option}
                                value={option}
                                status={ques4 === option ? 'checked' : 'unchecked'}
                                onPress={() => setQues4(option)} // Set the selected gender
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
                    5. When working on schoolwork, I usually get distracted by other things.
                </Text>

                <View>
                        <View style={{...styles.radioGroup}}>
                            {options.map((option, index) => (
                            <View style={styles.radioButton}>
                                <RadioButton.Android
                                key={option}
                                value={option}
                                status={ques5 === option ? 'checked' : 'unchecked'}
                                onPress={() => setQues5(option)} // Set the selected gender
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