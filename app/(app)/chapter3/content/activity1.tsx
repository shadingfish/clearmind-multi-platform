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
import { Label, RadioGroup, XStack, YStack, Theme, Input } from 'tamagui'
import type { SizeTokens } from 'tamagui'
const { width } = Dimensions.get('window');
const { height } = Dimensions.get('window');
import { RadioButton } from 'react-native-paper';
import * as Progress from "react-native-progress";
import colors from "@/constants/colors";
import { router } from "expo-router";
import { ChapterNavigationButton } from "@/components/ChapterNavigateButton";
import { useChapterProgressContext } from "@/contexts/AuthContext";
import { useChapter3Context } from "@/contexts/Chapter3Context";

type Activity1Questions = {
    p2_recentProcrastination: string;
    p2_feeling: string;
    p2_because: string;
  };

const Activity1 = () => {
    //const [p2_recentProcrastination, setP2_recentProcrastination] = useState("");
    //const [p2_feeling, setP2_feeling] = useState("");
    //const [p2_because, setP2_Because] = useState("");

    const {chapterData, updateChapterData} = useChapter3Context();

    const [questions, setQuestions] = useState<Activity1Questions>(chapterData["activity1"] || {
        p2_recentProcrastination: "",
        p2_feeling: "",
        p2_because: "",
      });

    const updateQuestion = (field: keyof Activity1Questions, value: string) => {
        setQuestions((prev) => {
            const updatedQuestions = { ...prev, [field]: value };
    
            return updatedQuestions;
        });
    };

    //~~~JUST COPY PAST THIS INTO EACH ACTIVITY AND CHANGE THE CHAPTER AND TITLE ACCORDINGLY~~~
    const { updateChapterProgress } = useChapterProgressContext();

    useEffect(() => {
        updateChapterProgress("chapter3", "activity1");
    }, []);
    //~~~END COPY PASTA~~~

    //update Chapter Context

    useEffect(() => {
        updateChapterData("activity1", questions);
    }, [questions]);

    //end

    return (
        <YStack margin={"$4"} gap={"$4"}>
            <View style={{width: '100%',}}>
                <Text style={{fontSize: 18,}}>
                    When you feel any discomfort, or an urge to procrastinate, check the passengers on your bus at that moment. Give each of them a name and describe your experience of those emotions. What triggered these emotions, and how did they make you feel?
                </Text>
                <Text style={styles.textBox}>
                    Now as a practice, let's reflect on your own recent procrastination episode.
                </Text>
                <Text style={{...styles.textBox, marginBottom: '3%'}}>
                    Briefly describe your recent procrastination episode:
                </Text>

                <Input
                    unstyled
                    placeholder={"(your procrastination episode)"}
                    borderColor={colors.border}
                    borderWidth={3}
                    borderRadius={7}
                    size="$4"
                    width={"100%"}
                    alignSelf="center"
                    value={questions.p2_recentProcrastination}
                    onChangeText={(text) => updateQuestion("p2_recentProcrastination", text)}
                    />
                <Text style={styles.textBox}>
                    Enter the emotion you experiencing most strongly:
                </Text>
                <View style={{flexDirection: 'row', alignItems: 'center',}}>
                    <Text style={{...styles.textBox, marginRight: 20}}>I'm feeling: </Text>
                        <Input
                            unstyled
                            placeholder={"(name of the emotion)"}
                            borderColor={colors.border}
                            borderWidth={3}
                            borderRadius={7}
                            size="$4"
                            width={"50%"}
                            alignSelf="center"
                            value={questions.p2_feeling}
                            onChangeText={(text) => updateQuestion("p2_feeling", text)}
                            style={{marginTop: '5%'}}
                            />
                </View>
                <View style={{flexDirection: 'row', alignItems: 'center'}}>
                    <Text style={{...styles.textBox, marginRight: 20}}>because: </Text>
                    <Input
                            unstyled
                            placeholder={"(name of the emotion)"}
                            borderColor={colors.border}
                            borderWidth={3}
                            borderRadius={7}
                            size="$4"
                            width={"50%"}
                            alignSelf="center"
                            value={questions.p2_because}
                            onChangeText={(text) => updateQuestion("p2_because", text)}
                            style={{marginTop: '5%'}}
                            />
                </View>
                <Text style={{marginTop: '5%', fontSize: 16, color: "#636363"}}>
                    <Text style={{ fontWeight: "bold" }}>Example:</Text> I'm feeling <Text style={{ textDecorationLine: 'underline' }}>anxious</Text> because <Text style={{ textDecorationLine: 'underline' }}>I haven't yet started preparing for my final exam scheduled for tomorrow.</Text>
                </Text>
            </View>

            <ChapterNavigationButton
                prev={"/(app)/chapter3/content/opening"}
                next={() => {
                    router.push("/(app)/chapter3/content/activity2");
                }}
            />
            
        </YStack>
    );
  }
  
  const styles = StyleSheet.create({
    textBox: {
        marginTop: '5%',
        fontSize: 18,
    }
  });

  export default Activity1;