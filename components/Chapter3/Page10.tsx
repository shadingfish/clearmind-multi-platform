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
import { Input, Label, RadioGroup, XStack, YStack } from 'tamagui'
import type { SizeTokens } from 'tamagui'
const { width } = Dimensions.get('window');
const { height } = Dimensions.get('window');
import { RadioButton } from 'react-native-paper';
import * as Progress from "react-native-progress";
import colors from "@/constants/colors";

interface CurrentPageComponentProps {
  data: {[key: string]: any},
  setData: React.Dispatch<React.SetStateAction<{[key: string]: any}>>,
  dataFilled: boolean,
  setDataFilled: React.Dispatch<React.SetStateAction<boolean>>
}

const Page10: React.FC<CurrentPageComponentProps> = ({ data, setData, dataFilled, setDataFilled }) => {
    const [summaryQues1, setSummaryQues1] = useState(data.summaryQues1 || "");
    const [summaryQues2, setSummaryQues2] = useState(data.summaryQues2 || "");
    const [summaryQues3, setSummaryQues3] = useState(data.summaryQues2 || "");

    useEffect(() => {
        console.log('dataisfilled beginning', dataFilled)

        setData((prevData) => ({
            ...prevData, 
            summaryQues1: summaryQues1, 
            summaryQues2: summaryQues2,
            summaryQues3: summaryQues3,
          }));
      
          // Optionally, you can check if all the fields are filled and update dataFilled
          const isFilled = summaryQues1 !== "" || summaryQues2 !== "" || summaryQues3 !== "";
          setDataFilled(isFilled);
    
          console.log('data:', data);
        
    }, [summaryQues1, summaryQues2, summaryQues3]); // Dependency array, this effect runs when "count" changes

    return (
        <ScrollView style={{width: '100%',height: '85%'}}>
            <Text style={{fontSize: 18,}}>
                In this part, we practiced some positive cognitive strategies, 
                such as breath meditation and Relaxing Breathing (4-7-8) Exercise, 
                which can be particularly helpful for those of us who tend to procrastinate. 
                These techniques can assist in making progress toward our goals even 
                when those challenging emotions arise.
            </Text>
            <Text style={styles.textBox}>
                We also discussed ten common cognitive distortions causing distorted perceptions, 
                negative emotions, and unhealthy mindsets.
                You can try out the techniques we
                recommended to change thinking patterns and adopt more positive mindsets.
            </Text>
            <Text style={styles.textBox}>
                Following questions will help you reflect on this part:
            </Text>
            <Text style={{fontSize: 16, color: "#636363", marginVertical: '5%'}}>
                1. Did you find specific strategies or techniques in this chapter 
                helpful for combating procrastination?
                If yes, outline these strategies and explain how you plan to incorporate them 
                into your future practices to improve your procrastination habits.
            </Text>
            <Input
                unstyled
                placeholder={"Input your answer for question1"}
                borderColor={colors.border}
                borderWidth={3}
                borderRadius={7}
                size="$4"
                width={"100%"}
                alignSelf="center"
                value={summaryQues1}
                onChangeText={setSummaryQues1}
                />
            <Text style={{fontSize: 16, color: "#636363", marginVertical: '5%'}}>
                2. What are some small actions you can take to manage any cognitive 
                distortion(s) you have, in order to pursue your value/goal?
            </Text>
            <Input
                unstyled
                placeholder={"Input your answer for question2"}
                borderColor={colors.border}
                borderWidth={3}
                borderRadius={7}
                size="$4"
                width={"100%"}
                alignSelf="center"
                value={summaryQues2}
                onChangeText={setSummaryQues2}
                />
            <Text style={{fontSize: 16, color: "#636363", marginVertical: '5%'}}>
                3. Rate the effectiveness of this part in managing your 
                procrastination tendencies on a scale of 1 to 5, where 1 represents 
                "not effective at all" and 5 represents "extremely effective."
            </Text>
            <View style={styles.radioGroup}>
                <View style={styles.radioButton}>
                    <RadioButton.Android
                        value="1"
                        status={summaryQues3 === '1' ? 
                                'checked' : 'unchecked'}
                        onPress={() => setSummaryQues3('1')}
                        color="#1EB688"
                    />
                    <Text style={styles.radioLabel}>
                        1
                    </Text>
                </View>

                <View style={{...styles.radioButton, marginLeft: '5%'}}>
                    <RadioButton.Android
                            value="2"
                            status={summaryQues3 === '2' ? 
                                    'checked' : 'unchecked'}
                            onPress={() => setSummaryQues3('2')}
                            color="#1EB688"
                        />
                    <Text style={styles.radioLabel}>
                        2
                    </Text>
                </View>

                <View style={{...styles.radioButton, marginLeft: '5%'}}>
                    <RadioButton.Android
                            value="3"
                            status={summaryQues3 === '3' ? 
                                    'checked' : 'unchecked'}
                            onPress={() => setSummaryQues3('3')}
                            color="#1EB688"
                        />
                    <Text style={styles.radioLabel}>
                        3
                    </Text>
                </View>

                <View style={{...styles.radioButton, marginLeft: '5%'}}>
                    <RadioButton.Android
                            value="4"
                            status={summaryQues3 === '4' ? 
                                    'checked' : 'unchecked'}
                            onPress={() => setSummaryQues3('4')}
                            color="#1EB688"
                        />
                    <Text style={styles.radioLabel}>
                        4
                    </Text>
                </View>

                <View style={{...styles.radioButton, marginLeft: '5%'}}>
                    <RadioButton.Android
                            value="5"
                            status={summaryQues3 === '5' ? 
                                    'checked' : 'unchecked'}
                            onPress={() => setSummaryQues3('5')}
                            color="#1EB688"
                        />
                    <Text style={styles.radioLabel}>
                        5
                    </Text>
                </View>

            </View>
        </ScrollView>
    );
  }
  
  const styles = StyleSheet.create({
    textBox: {
        marginTop: '5%',
        fontSize: 18,
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
  });

  export default Page10;