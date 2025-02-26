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

const Activity9 = () =>{
    const toast = useToastController();
    const [ques37, setQues37] = useState<string>("");
    const [ques38, setQues38] = useState<string>("");
    const [ques39, setQues39] = useState<string>("");
    const [ques40, setQues40] = useState<string>("");
    const [ques41, setQues41] = useState<string>("");
    const [data, setData] = useState<{[key: string]: any}>({});

    const windowWidth = Dimensions.get("window").width;
    const windowHeight = Dimensions.get("window").height;

    const options = ['1', '2', '3', '4']

    useEffect(() => {

        setData((prevData) => ({
            ...prevData, 
            ques37: ques37, 
            ques38: ques38,
            ques39: ques39,
            ques40: ques40,
            ques41: ques41,
          }));
    
          console.log('data:', data);
    }, [ques37, ques38, ques39, ques40, ques41]); // Dependency array, this effect runs when "count" changes

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
                37. I've been turning to work or other activities to take my mind off things.
            </Text>

            <View>
                <View style={{...styles.radioGroup}}>
                    {options.map((option, index) => (
                    <View style={styles.radioButton}>
                        <RadioButton.Android
                        key={option}
                        value={option}
                        status={ques37 === option ? 'checked' : 'unchecked'}
                        onPress={() => setQues37(option)} // Set the selected gender
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
                38. I've been concentrating my efforts on doing something about the situation I'm in.
            </Text>

            <View>
                    <View style={{...styles.radioGroup}}>
                        {options.map((option, index) => (
                        <View style={styles.radioButton}>
                            <RadioButton.Android
                            key={option}
                            value={option}
                            status={ques38 === option ? 'checked' : 'unchecked'}
                            onPress={() => setQues38(option)} // Set the selected gender
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
                39. I've been saying to myself "this isn't real".
            </Text>

            <View>
                    <View style={{...styles.radioGroup}}>
                        {options.map((option, index) => (
                        <View style={styles.radioButton}>
                            <RadioButton.Android
                            key={option}
                            value={option}
                            status={ques39 === option ? 'checked' : 'unchecked'}
                            onPress={() => setQues39(option)} // Set the selected gender
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
                40. I've been using alcohol or other drugs to make myself feel better
            </Text>

            <View>
                    <View style={{...styles.radioGroup}}>
                        {options.map((option, index) => (
                        <View style={styles.radioButton}>
                            <RadioButton.Android
                            key={option}
                            value={option}
                            status={ques40 === option ? 'checked' : 'unchecked'}
                            onPress={() => setQues40(option)} // Set the selected gender
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
                41. I've been getting emotional support from others.
            </Text>

            <View>
                <View style={{...styles.radioGroup}}>
                    {options.map((option, index) => (
                    <View style={styles.radioButton}>
                        <RadioButton.Android
                        key={option}
                        value={option}
                        status={ques41 === option ? 'checked' : 'unchecked'}
                        onPress={() => setQues41(option)} // Set the selected gender
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
            prev={"/(app)/presurvey/content/activity8"}
            next={() => {if (hasEmptyValues(data)) {
                toast.show("Empty Input");
            } else {
                router.push("/(app)/presurvey/content/activity10" as RelativePathString);
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

export default Activity9;