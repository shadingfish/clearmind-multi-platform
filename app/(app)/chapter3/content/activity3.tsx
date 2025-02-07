import React, { useState, useEffect} from "react";
import { View, Image, SafeAreaView, ScrollView, Dimensions, StyleSheet, Text,Pressable, TextInput } from "react-native";
import { Label, RadioGroup, XStack, YStack, Theme } from 'tamagui'
import type { SizeTokens } from 'tamagui'
const { width } = Dimensions.get('window');
const { height } = Dimensions.get('window');
import { RadioButton } from 'react-native-paper';
import * as Progress from "react-native-progress";
import { Ionicons } from '@expo/vector-icons';
import { ChapterNavigationButton } from "@/components/ChapterNavigateButton";
import { router } from "expo-router";
import { useChapterProgressContext } from "@/contexts/AuthContext";
import { useChapter3Context } from "@/contexts/Chapter3Context";
import { useToastController } from "@tamagui/toast";
import { hasEmptyValues } from "@/constants/helper";

type Activity3Questions = {
    whichPaths: Set<string>;
  };

const Activity3 = () => {
    const toast = useToastController();

    const {chapterData, updateChapterData} = useChapter3Context();

    const [questions, setQuestions] = useState<Activity3Questions>(chapterData["activity3"] || {
        whichPaths: new Set<string>
      });

    //~~~JUST COPY PAST THIS INTO EACH ACTIVITY AND CHANGE THE CHAPTER AND TITLE ACCORDINGLY~~~
    const { updateChapterProgress } = useChapterProgressContext();

    useEffect(() => {
        updateChapterData("activity3", questions);
    }, [questions]);

    useEffect(() => {
        updateChapterProgress("chapter3", "activity3");
    }, []);
    //~~~END COPY PASTA~~~

    const handlePress = (pathName: string) => {
        setQuestions((prev) => {
            const updatedPaths = new Set(prev.whichPaths); 
            updatedPaths.add(pathName); 
    
            const updatedQuestions = { ...prev, whichPaths: updatedPaths }; 
    
            return updatedQuestions; 
        });

        if (pathName == "The 20 Breath Meditation") {
            router.push("/(app)/chapter3/content/activity3_1");
        }
        else if (pathName == "Relaxing Breathing") {
            router.push("/(app)/chapter3/content/activity3_2");
        }
        else if (pathName == "Mindful Daily Tasks") {
            router.push("/(app)/chapter3/content/activity3_3");
        }
        else if (pathName == "Leaves on a Stream") {
            router.push("/(app)/chapter3/content/activity3_4");
        }
        
    };

    return (
        <YStack margin={"$4"} gap={"$4"}>
            <View style={{width: '100%',}}>
                <Text style={{fontSize: 18}}>
                    In this activity, you'll explore various meditation techniques, 
                    including the 20 Breath Meditation, the Relaxing Breathing (4-7-8) technique, 
                    the Mindfulness in Everyday Tasks, and Leaves on a Steam exercise. 
                    Try them out and see which one you like the most.
                </Text>
                <Text style={{...styles.textBox, marginBottom: 10,}}>
                    You are required to try <Text style={{textDecorationLine: 'underline', fontWeight: "bold"}}>2 out of 4</Text> of these activities to unlock future content, 
                    but feel free to come back to try more. You can also look up more meditation techniques on your own.
                    Remember, each technique helps you relax in its own way, so pick the one that feels right for
                    you.
                </Text>
                <View style={{flexDirection: 'row', alignItems: 'center', justifyContent: 'center', }}>
                    <Pressable style={styles.box} onPress={() => handlePress("The 20 Breath Meditation")}>
                        <View style={styles.circle}>
                            {   questions.whichPaths.has("The 20 Breath Meditation") ?
                                <Image source={require('@/assets/images/icon_20breath.png')} style={{width: 60, height: 60, }}/> :
                                <Text style={{fontWeight: "bold", fontSize: 50, color: "grey"}}>?</Text> 
                            }
                        </View>
                        <Text style={{color: "grey"}}>The 20 Breath Meditation</Text>
                    </Pressable>
                    <Pressable style={styles.box} onPress={() => handlePress("Relaxing Breathing")}>
                        <View style={styles.circle}>
                            {   questions.whichPaths.has("Relaxing Breathing") ?
                                <Image source={require('@/assets/images/icon_478.png')} style={{width: 60, height: 60, }}/> :
                                <Text style={{fontWeight: "bold", fontSize: 50, color: "grey"}}>?</Text> 
                            }
                        </View>
                        <Text style={{color: "grey"}}>Relaxing Breathing</Text>
                    </Pressable>
                </View>
                <View style={{flexDirection: 'row', alignItems: 'center', justifyContent: 'center', marginTop: '2%' }}>
                    <Pressable style={styles.box} onPress={() => handlePress("Mindful Daily Tasks")}>
                        <View style={styles.circle}>
                            {   questions.whichPaths.has("Mindful Daily Tasks") ?
                                <Image source={require('@/assets/images/icon_everyday.png')} style={{width: 60, height: 60, }}/> :
                                <Text style={{fontWeight: "bold", fontSize: 50, color: "grey"}}>?</Text> 
                            }
                        </View>
                        <Text style={{color: "grey"}}>Mindful Daily Tasks</Text>
                    </Pressable>
                    <Pressable style={styles.box} onPress={() => handlePress("Leaves on a Stream")}>
                        <View style={styles.circle}>
                            {   questions.whichPaths.has("Leaves on a Stream") ?
                                <Image source={require('@/assets/images/icon_stream.png')} style={{width: 60, height: 60, }}/> :
                                <Text style={{fontWeight: "bold", fontSize: 50, color: "grey"}}>?</Text> 
                            }
                        </View>
                        <Text style={{color: "grey"}}>Leaves on a Stream</Text>
                    </Pressable>
                </View>

                <View style={{height: 40}}></View>
                
                <ChapterNavigationButton
                prev={"/(app)/chapter3/content/activity2"}
                next={() => {
                    if (questions.whichPaths.size < 2) {
                        toast.show("Missing Activities");
                      } else {
                    router.push("/(app)/chapter3/content/activity4");}
                }}
            />

            </View>
        </YStack>
    );
  }
  
  const styles = StyleSheet.create({
    textBox: {
        marginTop: '5%',
        fontSize: 18,
    },
    box: {
        shadowColor: '#000', // Shadow color for iOS
        shadowOffset: { width: 0, height: 4 }, // Shadow position for iOS
        shadowOpacity: 0.2, // Shadow opacity for iOS
        shadowRadius: 5, // Shadow blur radius for iOS
        borderRadius: 5,
        alignItems: 'center',
        justifyContent: 'center',
        marginHorizontal: '1%',
        //paddingHorizontal: '5%',
        width: '50%',
        backgroundColor: "#FFF"
    },
    circle:  {
        width: 70, // Circle diameter
        height: 70, // Circle diameter
        borderRadius: 35, // Half of the width/height for a perfect circle
        justifyContent: 'center',
        alignItems: 'center',
        margin: 10,
        backgroundColor: "#90EE90",
        shadowColor: '#000', // Shadow color for iOS
        shadowOffset: { width: 0, height: 4 }, // Shadow position for iOS
        shadowOpacity: 0.1, // Shadow opacity for iOS
        shadowRadius: 5, // Shadow blur radius for iOS
    },
  });

  export default Activity3;