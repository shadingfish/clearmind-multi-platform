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
import { useToastController } from "@tamagui/toast";

import {DropdownComponent} from "@/components/Dropdown";
import { ChapterNavigationButton } from "@/components/ChapterNavigateButton";
import { router } from "expo-router";
import { useChapterProgressContext } from "@/contexts/AuthContext";
import { useChapter3Context } from "@/contexts/Chapter3Context";
import { hasEmptyValues } from "@/constants/helper";

type Activity2Questions = {
    p3_body: string;
    p3_physical: string;
  };

const Activity2 = () => {
    const toast = useToastController();

    const {chapterData, updateChapterData} = useChapter3Context();

    const [questions, setQuestions] = useState<Activity2Questions>(chapterData["activity2"] || {
        p3_body: "",
        p3_physical: "",
      });

    useEffect(() => {
        updateChapterData("activity2", questions);
    }, [questions]);

    const updateQuestion = (field: keyof Activity2Questions, value: string) => {
        console.log('value', value, 'field', field)
        setQuestions((prev) => {
            const updatedQuestions = { ...prev, [field]: value };   
            return updatedQuestions;
        });
    };

    //~~~JUST COPY PAST THIS INTO EACH ACTIVITY AND CHANGE THE CHAPTER AND TITLE ACCORDINGLY~~~
    const { updateChapterProgress } = useChapterProgressContext();

    useEffect(() => {
        updateChapterProgress("chapter3", "activity2");
    }, []);
    //~~~END COPY PASTA~~~

    const body_options = [
        {name: "Head"}, 
        {name: "Throat"}, 
        {name: "Shoulders"},
        {name: "Hands"}, 
        {name: "Chest"},
        {name: "Heart"},
        {name: "Stomach"}, 
        {name: "Back"}, 
        {name: "Legs"},
        {name: "Feet"},
        {name: "Other"}
    ]

    const phys_options = [
        {name: "Tense"}, 
        {name: "Sweating"}, 
        {name: "Hot"},
        {name: "Worn down and tired"}, 
        {name: "Cold"},
        {name: "Uncomfortable"},
        {name: "Jittery"}, 
        {name: "Slowed down"}, 
        {name: "Heart racing"},
        {name: "Pain"},
        {name: "Short of breath"},
        {name: "Clenching"},
        {name: "Flushed"},
        {name: "Other"},
    ]

    return (
        <YStack margin={"$4"} gap={"$4"}>
        <View style={{width: '100%',}}>
            <Text style={{fontSize: 18}}>
                Feel/visualize which part of your body these challenging emotions run through and how it affects both your body and mind.
            </Text>
            <Text style={{...styles.textBox, marginBottom: 10,}}>
                Where do you feel it most strongly in your body?
            </Text>
            <DropdownComponent
                items={body_options}
                value={questions.p3_body}
                setValue={(text) => updateQuestion("p3_body", text)}
                placeholder={"Head"}
            />
            <Text style={{...styles.textBox, marginBottom: 10,}}>
                What physical sensations do you notice accompanying this emotion?
            </Text>
            <DropdownComponent
                items={phys_options}
                value={questions.p3_physical}
                setValue={(text) => updateQuestion("p3_physical", text)}
                placeholder={"Tense"}
            />
        

        </View>

        <ChapterNavigationButton
                prev={"/(app)/chapter3/content/activity1"}
                next={() => {
                    if (hasEmptyValues(questions)) {
                        toast.show("Empty Input");
                      } else {
                    router.push("/(app)/chapter3/content/activity3");}
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

  export default Activity2;