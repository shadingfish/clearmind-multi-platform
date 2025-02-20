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
import { Label, RadioGroup, XStack, YStack, Theme } from 'tamagui'
import type { SizeTokens } from 'tamagui'
const { width } = Dimensions.get('window');
const { height } = Dimensions.get('window');
import { RadioButton } from 'react-native-paper';
import * as Progress from "react-native-progress";
import { Ionicons } from '@expo/vector-icons';
import CogDistortModal from './CogDistortModal';
import { ChapterNavigationButton } from "@/components/ChapterNavigateButton";
import { RelativePathString, router } from "expo-router";
//import { useChapterProgressContext } from "@/contexts/AuthContext";
import { useToastController } from "@tamagui/toast";
import { useChapterProgressContext } from "@/contexts/AuthContext";
import { useAuth } from "@/hooks/useAuth";
import { getChapter3Activity6, setChapter3Activity6, updateChapter3Progress } from "@/hooks/Chapter3Activity";

export type Activity6Questions = {
    whichCogDistPaths: Set<string>;
    hasCogDist: {[key: string]: boolean};
  };

const Activity6 = () => {
    const { user, pending } = useAuth();
    const [currTitle, setCurrTitle] = useState("");
    const toast = useToastController();

    const {updateChapterProgress, setCurrPage} = useChapterProgressContext();

    useEffect(() => {
        setCurrPage('activity6');
    }, [])

    const [questions, setQuestions] = useState<Activity6Questions>({
        whichCogDistPaths: new Set<string>,
        hasCogDist: {}, 
      });

      useEffect(() => {
        if (user) {
          getChapter3Activity6(user.uid)
            .then((snapshot) => {
              if (snapshot.exists()) {
                const answer = snapshot.data();
                console.log('answer', answer)
                setQuestions({
                    whichCogDistPaths: new Set(answer.whichCogDistPaths ?? []), // Convert array to Set
                    hasCogDist: answer.hasCogDist ?? {}, // Ensure hasCogDist is not undefined
                  });
              }
            })
            .catch((err) => console.log("Error get chapter 3 activity3:", err));
        }
      }, [pending]);

      useEffect(() => { //since it's longer, they can save their progress
        if (user && questions && questions.whichCogDistPaths.size > 0) {
            setChapter3Activity6(user!.uid, questions);
        }
      }, [user, questions])
    
    const [isModalVisible, setIsModalVisible] = useState(false);

    const openModal = () => setIsModalVisible(true);
    const closeModal = () => setIsModalVisible(false);

    const handlePress = (pathName: string) => {

        setQuestions((prev) => {
            const updatedPaths = new Set(prev.whichCogDistPaths); 
            updatedPaths.add(pathName); 
            const updatedQuestions = { ...prev, whichCogDistPaths: updatedPaths }; 
            return updatedQuestions; 
        });

        setCurrTitle(pathName);

        openModal();
    };

    return (
        <YStack margin={"$4"} gap={"$4"} flex={1}>
        <ScrollView style={{width: '100%', height: '100%'}}>
            <CogDistortModal isVisible={isModalVisible} onClose={closeModal} title={currTitle} setQuestions={setQuestions}/>
            <Text style={{fontSize: 18, marginVertical: '3%'}}>
                Now, let's talk about the ten most common cognitive distortions with examples:
            </Text>
            <View style={{width: '90%', justifyContent: 'center', marginLeft: '5%'}}>
            <View style={{flexDirection: 'row', alignItems: 'center', justifyContent: 'center', }}>
                <Pressable style={styles.box} onPress={() => handlePress("Mental Filtering")}>
                    <View style={styles.circle}>
                        {   questions.whichCogDistPaths.has("Mental Filtering") ?
                            (   questions.hasCogDist["Mental Filtering"] ?
                            <Image source={require('@/assets/images/distortion_mental_filtering_1.png')} style={{width: 50, height: 50, borderRadius: 25}} /> :
                            <Image source={require('@/assets/images/distortion_mental_filtering_2.png')} style={{width: 50, height: 50, borderRadius: 25}} /> 
                            )
                            :
                            <Text style={{fontWeight: "bold", fontSize: 50, color: "grey"}}>?</Text> 
                        }
                    </View>
                    <Text style={{color: "grey"}}>Mental Filtering</Text>
                </Pressable>
                <Pressable style={styles.box} onPress={() => handlePress("All-or-nothing thinking")}>
                    <View style={styles.circle}>
                        {   questions.whichCogDistPaths.has("All-or-nothing thinking") ?
                            (   questions.hasCogDist["All-or-nothing thinking"] ?
                                <Image source={require('@/assets/images/distortion_all_or_nothing_1.png')} style={{width: 50, height: 50, borderRadius: 25}} /> :
                                <Image source={require('@/assets/images/distortion_all_or_nothing_2.png')} style={{width: 50, height: 50, borderRadius: 25}} />
                            )
                            :
                            <Text style={{fontWeight: "bold", fontSize: 50, color: "grey"}}>?</Text> 
                        }
                    </View>
                    <Text style={{color: "grey"}}>All-or-nothing thinking</Text>
                </Pressable>
            </View>
            <View style={{flexDirection: 'row', alignItems: 'center', justifyContent: 'center', marginTop: '2%' }}>
                <Pressable style={styles.box} onPress={() => handlePress("Overgeneralization")}>
                    <View style={styles.circle}>
                        {   questions.whichCogDistPaths.has("Overgeneralization") ?
                            ( questions.hasCogDist["Overgeneralization"] ?
                                <Image source={require('@/assets/images/distortion_overgeneralization_1.png')} style={{width: 50, height: 50, borderRadius: 25}} /> :
                                <Image source={require('@/assets/images/distortion_overgeneralization_2.png')} style={{width: 50, height: 50, borderRadius: 25}} />
                            )
                            :
                            <Text style={{fontWeight: "bold", fontSize: 50, color: "grey"}}>?</Text> 
                        }
                    </View>
                    <Text style={{color: "grey"}}>Overgeneralization</Text>
                </Pressable>
                <Pressable style={styles.box} onPress={() => handlePress("Discounting the positive")}>
                    <View style={styles.circle}>
                        {   questions.whichCogDistPaths.has("Discounting the positive") ?
                            (   questions.hasCogDist["Discounting the positive"] ?
                            <Image source={require('@/assets/images/distortion_discounting_the_positive_1.png')} style={{width: 50, height: 50, borderRadius: 25}} /> :
                            <Image source={require('@/assets/images/distortion_discounting_the_positive_2.png')} style={{width: 50, height: 50, borderRadius: 25}} /> 
                            )
                            :
                            <Text style={{fontWeight: "bold", fontSize: 50, color: "grey"}}>?</Text> 
                        }
                    </View>
                    <Text style={{color: "grey"}}>Discounting the positive</Text>
                </Pressable>
            </View>
            <View style={{flexDirection: 'row', alignItems: 'center', justifyContent: 'center', marginTop: '2%' }}>
                <Pressable style={styles.box} onPress={() => handlePress("Jumping to Conclusions")}>
                    <View style={styles.circle}>
                        {   questions.whichCogDistPaths.has("Jumping to Conclusions") ?
                            (   questions.hasCogDist["Jumping to Conclusions"] ?
                            <Image source={require('@/assets/images/distortion_jumping_to_conclusions_1.png')} style={{width: 50, height: 50, borderRadius: 25}} />:
                            <Image source={require('@/assets/images/distortion_jumping_to_conclusions_2.png')} style={{width: 50, height: 50, borderRadius: 25}} />
                            )
                            :
                            <Text style={{fontWeight: "bold", fontSize: 50, color: "grey"}}>?</Text> 
                        }
                    </View>
                    <Text style={{color: "grey"}}>Jumping to Conclusions</Text>
                </Pressable>
                <Pressable style={styles.box} onPress={() => handlePress("Magnification")}>
                    <View style={styles.circle}>
                        {   questions.whichCogDistPaths.has("Magnification") ?
                            (   questions.hasCogDist["Magnification"] ?
                            <Image source={require('@/assets/images/distortion_magnification_1.png')} style={{width: 50, height: 50, borderRadius: 25}} /> :
                            <Image source={require('@/assets/images/distortion_magnification_2.png')} style={{width: 50, height: 50, borderRadius: 25}} /> 
                            ):
                            <Text style={{fontWeight: "bold", fontSize: 50, color: "grey"}}>?</Text> 
                        }
                    </View>
                    <Text style={{color: "grey"}}>Magnification</Text>
                </Pressable>
            </View>
            <View style={{flexDirection: 'row', alignItems: 'center', justifyContent: 'center', marginTop: '2%' }}>
                <Pressable style={styles.box} onPress={() => handlePress("Emotional Reasoning")}>
                    <View style={styles.circle}>
                        {   questions.whichCogDistPaths.has("Emotional Reasoning") ?
                            (   questions.hasCogDist["Emotional Reasoning"] ?
                            <Image source={require('@/assets/images/distortion_emotional_reasoning_1.png')} style={{width: 50, height: 50, borderRadius: 25}} /> : 
                            <Image source={require('@/assets/images/distortion_emotional_reasoning_2.png')} style={{width: 50, height: 50, borderRadius: 25}} />
                            ):
                            <Text style={{fontWeight: "bold", fontSize: 50, color: "grey"}}>?</Text> 
                        }
                    </View>
                    <Text style={{color: "grey"}}>Emotional Reasoning</Text>
                </Pressable>
                <Pressable style={styles.box} onPress={() => handlePress("\"Should\" Statements")}>
                    <View style={styles.circle}>
                        {   questions.whichCogDistPaths.has("\"Should\" Statements") ?
                            (   questions.hasCogDist["\"Should\" Statements"] ?
                            <Image source={require('@/assets/images/distortion_should_1.png')} style={{width: 50, height: 50, borderRadius: 25}} /> :
                            <Image source={require('@/assets/images/distortion_should_2.png')} style={{width: 50, height: 50, borderRadius: 25}} /> 
                            ):
                            <Text style={{fontWeight: "bold", fontSize: 50, color: "grey"}}>?</Text> 
                        }
                    </View>
                    <Text style={{color: "grey"}}>"Should" Statements</Text>
                </Pressable>
            </View>
            <View style={{flexDirection: 'row', alignItems: 'center', justifyContent: 'center', marginTop: '2%' }}>
                <Pressable style={styles.box} onPress={() => handlePress("Labeling")}>
                    <View style={styles.circle}>
                        {   questions.whichCogDistPaths.has("Labeling") ?
                            (   questions.hasCogDist["Labeling"] ?
                            <Image source={require('@/assets/images/distortion_labeling_1.png')} style={{width: 50, height: 50, borderRadius: 25}} /> :
                            <Image source={require('@/assets/images/distortion_labeling_2.png')} style={{width: 50, height: 50, borderRadius: 25}} />
                            )
                            :
                            <Text style={{fontWeight: "bold", fontSize: 50, color: "grey"}}>?</Text> 
                        }
                    </View>
                    <Text style={{color: "grey"}}>Labeling</Text>
                </Pressable>
                <Pressable style={styles.box} onPress={() => handlePress("Personalization and Blame")}>
                    <View style={styles.circle}>
                        {   questions.whichCogDistPaths.has("Personalization and Blame") ?
                            (   questions.hasCogDist["Personalization and Blame"] ?
                            <Image source={require('@/assets/images/distortion_personalization_and_blame_1.png')} style={{width: 50, height: 50, borderRadius: 25}} /> :
                            <Image source={require('@/assets/images/distortion_personalization_and_blame_2.png')} style={{width: 50, height: 50, borderRadius: 25}} /> 
                            )
                            :
                            <Text style={{fontWeight: "bold", fontSize: 50, color: "grey"}}>?</Text> 
                        }
                    </View>
                    <Text style={{color: "grey"}}>Personalization and Blame</Text>
                </Pressable>
            </View>
            
            </View>
        </ScrollView>

        <ChapterNavigationButton
                prev={"/(app)/chapter3/content/activity5"}
                next={() => {
                    if (questions.whichCogDistPaths.size < 10) {
                        toast.show("Missing Activities");
                      } else {
                        //updateChapterProgress("chapter3", "activity6");
                        //updateChapter3Progress(user!.uid, "6_activity6");
                        //setChapter3Activity6(user!.uid, questions);
                        router.push("/(app)/chapter3/content/activity7" as RelativePathString);
                }}}
            />
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
        paddingHorizontal: '2%',
        width: '50%',
        backgroundColor: "#FFF",
        height: 110,
    },
    circle:  {
        width: 60, // Circle diameter
        height: 60, // Circle diameter
        borderRadius: 30, // Half of the width/height for a perfect circle
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

  export default Activity6;