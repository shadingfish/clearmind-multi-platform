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
import { ChapterNavigationButton } from "@/components/ChapterNavigateButton";
import { router } from "expo-router";
//import { useChapterProgressContext } from "@/contexts/AuthContext";
import { hasEmptyValues } from "@/constants/helper";
import { useToastController } from "@tamagui/toast";
import { useChapterProgressContext } from "@/contexts/AuthContext";
import { getChapter3Summary, setChapter3Summary, updateChapter3Progress } from "@/hooks/Chapter3Activity";
import { useAuth } from "@/hooks/useAuth";

export type SummaryQuestions = {
    summaryQues1: string;
    summaryQues2: string;
    summaryQues3: string;
  };

const Summary = () => {
    const { user, pending } = useAuth();
    const toast = useToastController();

    const [questions, setQuestions] = useState<SummaryQuestions>({
        summaryQues1: "",
        summaryQues2: "",
        summaryQues3: "",
      });

      const {updateChapterProgress, setCurrPage} = useChapterProgressContext();

      useEffect(() => {
          setCurrPage('summary');
      }, [])

      useEffect(() => {
        if (user) {
          getChapter3Summary(user.uid)
            .then((snapshot) => {
              if (snapshot.exists()) {
                const answer = snapshot.data();
                for (const [key, value] of Object.entries(answer)) {
                  updateQuestion(key as keyof SummaryQuestions, value as string);
                }
              }
            })
            .catch((err) => console.log("Error get chapter 3 summary:", err));
        }
      }, [pending]);

    const updateQuestion = (field: keyof SummaryQuestions, value: string) => {
        console.log('value', value, 'field', field)
        setQuestions((prev) => {
            const updatedQuestions = { ...prev, [field]: value };   
            return updatedQuestions;
        });
    };
    
    return (
        <YStack margin={"$4"} gap={"$4"} flex={1}>
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
                1. Did you find any meditation techniques in this section 
                helpful for combating procrastination? If yes, describe these techniques 
                and explain how you plan to incorporate them into your daily practices to 
                improve your procrastination habits.
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
                value={questions.summaryQues1}
                onChangeText={(text) => updateQuestion("summaryQues1", text)}
                />
            <Text style={{fontSize: 16, color: "#636363", marginVertical: '5%'}}>
                2. What small actions can you take to manage any cognitive distortions 
                you experience to stay aligned with your values and goals?
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
                value={questions.summaryQues2}
                onChangeText={(text) => updateQuestion("summaryQues2", text)}
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
                        status={questions.summaryQues3 === '1' ? 
                                'checked' : 'unchecked'}
                        onPress={() => updateQuestion("summaryQues3", '1')}
                        color="#1EB688"
                    />
                    <Text style={styles.radioLabel}>
                        1
                    </Text>
                </View>

                <View style={{...styles.radioButton, marginLeft: '5%'}}>
                    <RadioButton.Android
                            value="2"
                            status={questions.summaryQues3 === '2' ? 
                                    'checked' : 'unchecked'}
                            onPress={() => updateQuestion("summaryQues3", '2')}
                            color="#1EB688"
                        />
                    <Text style={styles.radioLabel}>
                        2
                    </Text>
                </View>

                <View style={{...styles.radioButton, marginLeft: '5%'}}>
                    <RadioButton.Android
                            value="3"
                            status={questions.summaryQues3 === '3' ? 
                                    'checked' : 'unchecked'}
                            onPress={() => updateQuestion("summaryQues3", '3')}
                            color="#1EB688"
                        />
                    <Text style={styles.radioLabel}>
                        3
                    </Text>
                </View>

                <View style={{...styles.radioButton, marginLeft: '5%'}}>
                    <RadioButton.Android
                            value="4"
                            status={questions.summaryQues3 === '4' ? 
                                    'checked' : 'unchecked'}
                            onPress={() => updateQuestion("summaryQues3", '4')}
                            color="#1EB688"
                        />
                    <Text style={styles.radioLabel}>
                        4
                    </Text>
                </View>

                <View style={{...styles.radioButton, marginLeft: '5%'}}>
                    <RadioButton.Android
                            value="5"
                            status={questions.summaryQues3 === '5' ? 
                                    'checked' : 'unchecked'}
                            onPress={() => updateQuestion("summaryQues3", '5')}
                            color="#1EB688"
                        />
                    <Text style={styles.radioLabel}>
                        5
                    </Text>
                </View>

            </View>
        </ScrollView>

        <ChapterNavigationButton
                prev={"/(app)/chapter3/content/activity8"}
                next={() => {
                    if (hasEmptyValues(questions)) {
                        toast.show("Empty Input");
                    } else {
                    updateChapterProgress("chapter3", "summary");
                    updateChapter3Progress(user!.uid, "9_summary");
                    setChapter3Summary(user!.uid, questions);
                    router.push("/(app)/chapter3");}
                }}
            />

        </YStack>
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

  export default Summary;