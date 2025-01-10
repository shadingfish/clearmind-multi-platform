import React, { useState, useEffect} from "react";
import { View, Image, SafeAreaView, ScrollView, Dimensions, StyleSheet, Text,Pressable, TextInput } from "react-native";
import { Label, RadioGroup, XStack, YStack } from 'tamagui'
import type { SizeTokens } from 'tamagui'
import { RadioButton } from 'react-native-paper';
import * as Progress from "react-native-progress";

export default function NewPage() {
    const page2Questions: { [key: string]: string } = {
        ques1: "1. I usually allocate time to review and proofread my work.",
        ques2: "2. I put off projects until the last minute.",
        ques3: "3. I have found myself waiting until the day before to start a big project.",
        ques4: "4. I know I should work on school work, but I just don't do it.",
        ques5: "5. When working on schoolwork, I usually get distracted by other things.",
      };

      const page3Questions: { [key: string]: string } = {
        ques1: "6. I waste a lot of time on unimportant things.",
        ques2: "7. I get distracted by other, more fun, things when I am supposed to work on schoolwork.",
        ques3: "8. I concentrate on school work instead of other distractions.",
        ques4: "9. I can't focus on school work or projects for more than an hour until I get distracted.",
        ques5: "10. My attention span for schoolwork is very short.",
      };


      const [page2Checked, setpage2Checked] = useState<{ [key: string] : string }>({
        "ques1": "",
        "ques2": "",
        "ques3": "",
        "ques4": "",
        "ques5": ""
      });

      const [page3Checked, setpage3Checked] = useState<{ [key: string] : string }>({
        "ques6": "",
        "ques7": "",
        "ques8": "",
        "ques9": "",
        "ques10": ""
      });

    

    const [currPageNum, setCurrPageNum] = useState(2);


    const page2_questionKeys = Object.keys(page2Questions); // ['ques1', 'ques2', 'ques3']
    const page3_questionKeys = Object.keys(page3Questions); // ['ques1', 'ques2', 'ques3']


    const handleChange = (key: string, value: string, setter: React.Dispatch<React.SetStateAction<{ [key: string] : string }>>) => {
        setter((prev) => ({
        ...prev,
        [key]: value,
        }));
    };

    const options = ['1', '2', '3', '4', '5']
    const options_text = "1 = Strongly Disagree; 5 = Strongly Agree"

    const pageSet: {[key: number]: [{ [key: string]: string }, { [key: string] : string }, React.Dispatch<React.SetStateAction<{ [key: string] : string }>>, string[], string[], string]} = {
        2: [page2Questions, page2Checked, setpage2Checked, page2_questionKeys, options, options_text], //constant questions, user answer, question keys, options list, options text
        3: [page3Questions, page3Checked, setpage3Checked, page3_questionKeys, options, options_text]
      }

    const windowWidth = Dimensions.get("window").width;
    const windowHeight = Dimensions.get("window").height;

    const handleNext = () => {
        const currPage = pageSet[currPageNum];
        const currPageChecked = currPage[1]; 
        //console.log(currPageChecked);
        const hasEmptyValues = Object.values(currPageChecked).some((value) => value === "");
        //console.log(hasEmptyValues);

        if (hasEmptyValues) {
            console.log("can't go to next")
        }
        else {
            let newPageNum = currPageNum + 1;
            setCurrPageNum(newPageNum); //at 11 we should handle Finish instead of handle Next
        }
    };

    useEffect(() => {
        console.log('page2checked', page2Checked)
        console.log('page3checked', page3Checked)
    }, [page2Checked, page3Checked]);

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
                            progress={currPageNum / 11}
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

                    {pageSet[currPageNum][3].map((ques, index) => (
                        <View>
                            <Text
                                style={styles.textQuestion}
                            >
                            {pageSet[currPageNum][0][ques]}
                            </Text>

                            <View>
                            <View style={{...styles.radioGroup}}>
                                {options.map((option, index) => (
                                <View style={styles.radioButton}>
                                    <RadioButton.Android
                                    key={option}
                                    value={option}
                                    status={pageSet[currPageNum][1][ques] === option ? 'checked' : 'unchecked'}
                                    onPress={() => handleChange(ques, option, pageSet[currPageNum][2])} // Set the selected gender
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
                    ))}
                </View>


                <View style={{alignItems: 'center', flexDirection: "row", justifyContent: "space-between", padding: '5%'}}>
                    <Pressable style={styles.navButtons}>
                        <Text style={{fontSize: 16}}>BACK</Text>
                    </Pressable>
                    <Pressable style={styles.navButtons} onPress={() => handleNext()}>
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