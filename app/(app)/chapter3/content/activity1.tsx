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
import { RelativePathString, router } from "expo-router";
import { ChapterNavigationButton } from "@/components/ChapterNavigateButton";
//import { useChapterProgressContext } from "@/contexts/AuthContext";
import { useToastController } from "@tamagui/toast";
import { hasEmptyValues } from "@/constants/helper";
import { useChapterProgressContext } from "@/contexts/AuthContext";
import { getChapter3Activity1, setChapter3Activity1, updateChapter3Progress } from "@/hooks/Chapter3Activity";
import { useAuth } from "@/hooks/useAuth";

export type Activity1Questions = {
    p2_recentProcrastination: string;
    p2_feeling: string;
    p2_because: string;
  };

const Activity1 = () => {
    const { user, pending } = useAuth();
    const toast = useToastController();

    const [questions, setQuestions] = useState<Activity1Questions>({
        p2_recentProcrastination: "",
        p2_feeling: "",
        p2_because: "",
      });

      useEffect(() => {
        if (user) {
          getChapter3Activity1(user.uid)
            .then((snapshot) => {
              if (snapshot.exists()) {
                const answer = snapshot.data();
                for (const [key, value] of Object.entries(answer)) {
                  updateQuestion(key as keyof Activity1Questions, value as string);
                }
              }
            })
            .catch((err) => console.log("Error get chapter 3 activity1:", err));
        }
      }, [pending]);

    const updateQuestion = (field: keyof Activity1Questions, value: string) => {
        setQuestions((prev) => {
            const updatedQuestions = { ...prev, [field]: value };


    
            return updatedQuestions;
        });

    };



    const {updateChapterProgress, setCurrPage} = useChapterProgressContext();

    useEffect(() => {
        setCurrPage('activity1');
    }, [])


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
                    placeholder={"[your procrastination episode]"}
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
                            placeholder={"[name of the emotion]"}
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
                            placeholder={"[the event triggered this emotion]"}
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
                next={() => {if (hasEmptyValues(questions)) {
                    toast.show("Empty Input");
                  } else {
                    updateChapterProgress("chapter3", "activity1");
                    updateChapter3Progress(user!.uid, "1_activity1");
                    setChapter3Activity1(user!.uid, questions);
                    router.push("/(app)/chapter3/content/activity2" as RelativePathString);
                  }
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