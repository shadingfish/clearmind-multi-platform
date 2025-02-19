import React, { useState, useEffect} from "react";
import { View, Image, SafeAreaView, ScrollView, Dimensions, StyleSheet, Text,Pressable, TextInput } from "react-native";
import { Input, Label, RadioGroup, XStack, YStack } from 'tamagui'
import type { SizeTokens } from 'tamagui'
const { width } = Dimensions.get('window');
const { height } = Dimensions.get('window');
import { RadioButton } from 'react-native-paper';
import * as Progress from "react-native-progress";
import { RelativePathString, useRouter } from "expo-router";
//import { useChapterProgressContext } from "@/contexts/AuthContext";
import { ChapterNavigationButton } from "@/components/ChapterNavigateButton";
import StarModal from "./StarModal";
import colors from "@/constants/colors";
import { useChapterProgressContext } from "@/contexts/AuthContext";

type Activity2Questions = {
    specific: string,
    trackable: string,
    achievable: string,
    relevant: string,
  };

const Activity2 = () => {

    const router = useRouter();

    const [currTitle, setCurrTitle] = useState("");
    const [isModalVisible, setIsModalVisible] = useState(false);

    const {updateChapterProgress, setCurrPage} = useChapterProgressContext();

      useEffect(() => {
          setCurrPage('activity2');
      }, [])

    const [questions, setQuestions] = useState<Activity2Questions>({
        specific: "",
        trackable: "",
        achievable: "",
        relevant: "",
      });

    const openModal = (title: string) => {
        setCurrTitle(title);
        setIsModalVisible(true);
    }

    const closeModal = () => 
    {
        setIsModalVisible(false);
        setCurrTitle("");
    }

    /* //~~~JUST COPY PASTE THIS INTO EACH ACTIVITY AND CHANGE THE CHAPTER AND TITLE ACCORDINGLY~~~
    const { updateChapterProgress } = useChapterProgressContext();

    useEffect(() => {
        updateChapterProgress("chapter4", "activity2");
    }, []);
    //~~~END COPY PASTA~~~ */

    const STAR = {
        "Specific": require("@/assets/images/star_s.png"),
        "Trackable": require("@/assets/images/star_t.png"),
        "Achievable": require("@/assets/images/star_a.png"),
        "Relevant": require("@/assets/images/star_r.png"),
      };

      const updateQuestion = (field: keyof Activity2Questions, value: string) => {
        setQuestions((prev) => {
            const updatedQuestions = { ...prev, [field]: value };   
            return updatedQuestions;
        });
    };
    

    return (
        <ScrollView style={{width: '90%', margin: '5%', }}>
                <StarModal isVisible={isModalVisible} onClose={closeModal} title={currTitle}/>
                <Text style={{fontSize: 18,}}>
                    Let's first introduce the STAR framework for goal setting. 
                    The STAR framework can be applied to create well-defined and achievable goals. 
                    STAR stands for <Text style={{fontWeight: 'bold'}}>Specific, Trackable, Achievable, and Relevant. </Text> 
                    Here's a breakdown of each component:
                </Text>
                <View style={{flexDirection: 'row', alignItems: 'center', justifyContent: 'space-evenly'}}>
                {Object.entries(STAR).map(([label, image], index) => (
                    <Pressable key={index} style={styles.item} onPress={() => openModal(label)}>
                        <Image source={image} style={{width: 70, height: 70}}/>
                        <Text style={{color: 'grey'}}>{label}</Text>
                    </Pressable>
                ))}
                </View>

                <Text style={{alignSelf: 'center', marginVertical: '2%'}}>
                    (Click to see more detailed information)
                </Text>

                <Text style={{fontSize: 18, marginBottom: '3%'}}>
                    Now it's time to set a goal that is specific, measurable, 
                    attainable, and relevant to overcome your urge to procrastinate 
                    for the upcoming week. While this framework can be applied to 
                    various aspects of your life, for now, let's concentrate on 
                    conquering procrastination.
                </Text>

                <Input
                    unstyled
                    placeholder={"[specific]"}
                    borderColor={colors.border}
                    borderWidth={3}
                    borderRadius={7}
                    size="$4"
                    width={"100%"}
                    alignSelf="center"
                    marginBottom={"3%"}
                    value={questions.specific}
                    onChangeText={(text) => updateQuestion("specific", text)}
                />
                <Input
                    unstyled
                    placeholder={"[trackable]"}
                    borderColor={colors.border}
                    borderWidth={3}
                    borderRadius={7}
                    size="$4"
                    width={"100%"}
                    alignSelf="center"
                    marginBottom={"3%"}
                    value={questions.trackable}
                    onChangeText={(text) => updateQuestion("trackable", text)}
                />
                <Input
                    unstyled
                    placeholder={"[achievable]"}
                    borderColor={colors.border}
                    borderWidth={3}
                    borderRadius={7}
                    size="$4"
                    width={"100%"}
                    marginBottom={"3%"}
                    alignSelf="center"
                    value={questions.achievable}
                    onChangeText={(text) => updateQuestion("achievable", text)}
                />
                <Input
                    unstyled
                    placeholder={"[relevant]"}
                    borderColor={colors.border}
                    borderWidth={3}
                    borderRadius={7}
                    size="$4"
                    width={"100%"}
                    marginBottom={"3%"}
                    alignSelf="center"
                    value={questions.relevant}
                    onChangeText={(text) => updateQuestion("relevant", text)}
                />

                <Text style={{color: "grey", fontWeight: 'bold'}}>
                    Example:
                </Text>
                <Text style={{color: "grey"}}>
                    <Text style={{fontWeight: 'bold'}}>Specific:</Text> Next week, I commit to dedicating at least two hours of concentrated work to my final review every day.
                </Text>
                <Text style={{color: "grey"}}>
                    <Text style={{fontWeight: 'bold'}}>Trackable:</Text> Starting next Monday, I will follow this routine for the upcoming week.
                </Text>
                <Text style={{color: "grey"}}>
                    <Text style={{fontWeight: 'bold'}}>Achievable:</Text> I will break down my final review into seven chapters, which is manageable alongside my other responsibilities.
                </Text>
                <Text style={{color: "grey", marginBottom: '3%'}}>
                    <Text style={{fontWeight: 'bold'}}>Relevant:</Text> This goal helps me to perform better on my test and align with my values of productivity and reducing procrastination tendencies.
                </Text>


                <ChapterNavigationButton
                    prev={"/(app)/chapter4/content/activity1"}
                    next={() => {
                        updateChapterProgress("chapter4", "activity2");
                    router.push("/(app)/chapter4/content/activity2" as RelativePathString);
                    }}
                />
            </ScrollView>
    );
  }
  
  const styles = StyleSheet.create({
    textBox: {
        marginTop: '5%',
        fontSize: 18,
        marginBottom: '5%'
    },
    item: {
        width: "100%", // Ensures equal width
        flex: 1, // Makes all items take equal height
        backgroundColor: "white",
        borderRadius: 10,
        justifyContent: "center",
        alignItems: "center",
        shadowColor: "#000", // Box shadow
        shadowOffset: { width: 0, height: 4 }, 
        shadowOpacity: 0.2,
        shadowRadius: 5,
        elevation: 5, // For Android shadow
        marginVertical: 5, // Add spacing between boxes
        height: 100,
        marginHorizontal: '1%',
      },
      bigLetter: {
        fontSize: 50,
        fontWeight: 'bold'
      }

  });

  export default Activity2;