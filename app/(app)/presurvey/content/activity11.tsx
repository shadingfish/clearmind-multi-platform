import React, { useState, useEffect} from "react";
import { View, Image, SafeAreaView, ScrollView, Dimensions, StyleSheet, Text,Pressable, TextInput } from "react-native";
import { Label, RadioGroup, XStack, YStack } from 'tamagui'
import type { SizeTokens } from 'tamagui'
const { width } = Dimensions.get('window');
const { height } = Dimensions.get('window');
import { RadioButton } from 'react-native-paper';
import * as Progress from "react-native-progress";
import { useToastController } from "@tamagui/toast";
import { ChapterNavigationButton } from "@/components/ChapterNavigateButton";
import { hasEmptyValues } from "@/constants/helper";
import { router, RelativePathString } from "expo-router";

const Activity11 = () =>{
    const toast = useToastController();
    const [ques47, setQues47] = useState<string>("");
    const [ques48, setQues48] = useState<string>("");
    const [ques49, setQues49] = useState<string>("");
    const [ques50, setQues50] = useState<string>("");
    const [ques51, setQues51] = useState<string>("");
    const [data, setData] = useState<{[key: string]: any}>({});

    const windowWidth = Dimensions.get("window").width;
    const windowHeight = Dimensions.get("window").height;

    const options = ['1', '2', '3', '4']

    useEffect(() => {

        setData((prevData) => ({
            ...prevData, 
            ques47: ques47, 
            ques48: ques48,
            ques49: ques49,
            ques50: ques50,
            ques51: ques51,
          }));
    
          console.log('data:', data);
    }, [ques47, ques48, ques49, ques50, ques51]); // Dependency array, this effect runs when "count" changes

    return (
        <YStack margin={"$4"} gap={"$4"}>
        <View style={{width: '100%',}}>
            <Text
                style={{
                fontSize: 16,
                fontWeight: "bold",
                color: "#808080",
                marginTop: 15,
                }}
            >
                The following questions ask how you have sought to cope with a hardship in your life. {"\n"}
                1 = 1 haven't been doing this at all; 2 = A little bit; 3 =
                A medium amount; 4 = I've been doing this a lot
            </Text>

            <Text
                style={styles.textQuestion}
            >
                47. I've been using alcohol or other drugs to help me get through it.
            </Text>

            <View>
                <View style={{...styles.radioGroup}}>
                    {options.map((option, index) => (
                    <View style={styles.radioButton}>
                        <RadioButton.Android
                        key={option}
                        value={option}
                        status={ques47 === option ? 'checked' : 'unchecked'}
                        onPress={() => setQues47(option)} // Set the selected gender
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
                48. I've been trying to see it in a different light, to make it seem more positive.
            </Text>

            <View>
                    <View style={{...styles.radioGroup}}>
                        {options.map((option, index) => (
                        <View style={styles.radioButton}>
                            <RadioButton.Android
                            key={option}
                            value={option}
                            status={ques48 === option ? 'checked' : 'unchecked'}
                            onPress={() => setQues48(option)} // Set the selected gender
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
                49. I've been criticizing myself.
            </Text>

            <View>
                    <View style={{...styles.radioGroup}}>
                        {options.map((option, index) => (
                        <View style={styles.radioButton}>
                            <RadioButton.Android
                            key={option}
                            value={option}
                            status={ques49 === option ? 'checked' : 'unchecked'}
                            onPress={() => setQues49(option)} // Set the selected gender
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
                50. I've been trying to come up with a strategy about what to do.
            </Text>

            <View>
                    <View style={{...styles.radioGroup}}>
                        {options.map((option, index) => (
                        <View style={styles.radioButton}>
                            <RadioButton.Android
                            key={option}
                            value={option}
                            status={ques50 === option ? 'checked' : 'unchecked'}
                            onPress={() => setQues50(option)} // Set the selected gender
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
                51. I've been getting comfort and understanding from someone.
            </Text>

            <View>
                <View style={{...styles.radioGroup}}>
                    {options.map((option, index) => (
                    <View style={styles.radioButton}>
                        <RadioButton.Android
                        key={option}
                        value={option}
                        status={ques51 === option ? 'checked' : 'unchecked'}
                        onPress={() => setQues51(option)} // Set the selected gender
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

        <ChapterNavigationButton
            prev={"/(app)/presurvey/content/activity10"}
            next={() => {if (hasEmptyValues(data)) {
                toast.show("Empty Input");
            } else {
                router.push("/(app)/presurvey/content/activity12" as RelativePathString);
            }
            }}
        />

        </YStack>
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
      justifyContent: 'center',
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

export default Activity11;