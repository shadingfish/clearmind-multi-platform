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

import {DropdownComponent} from "@/components/Dropdown";
import { ChapterNavigationButton } from "@/components/ChapterNavigateButton";
import { router } from "expo-router";
import { useAuthContext } from "@/contexts/AuthContext";

interface CurrentPageComponentProps {
  /* data: {[key: string]: any},
  setData: React.Dispatch<React.SetStateAction<{[key: string]: any}>>,
  dataFilled: boolean,
  setDataFilled: React.Dispatch<React.SetStateAction<boolean>> */
}

const Activity3: React.FC<CurrentPageComponentProps> = ({}) => {
    const [p3_body, setP3_body] = useState("");
    const [p3_physical, setP3_Physical] = useState("");

    /* useEffect(() => {
        console.log('dataisfilled beginning', dataFilled)

        setData((prevData) => ({
            ...prevData, 
            p3_body: p3_body, 
            p3_physical: p3_physical,
          }));
      
          // Optionally, you can check if all the fields are filled and update dataFilled
          const isFilled = p3_body !== "" && p3_physical !== "";
          setDataFilled(isFilled);
    
          console.log('data:', data);
        
    }, [p3_body, p3_physical]); // Dependency array, this effect runs when "count" changes */

    //~~~JUST COPY PAST THIS INTO EACH ACTIVITY AND CHANGE THE CHAPTER AND TITLE ACCORDINGLY~~~
    const { userData, setUserData, currPage, setCurrPage } = useAuthContext();

    useEffect(() => {
        setUserData((prevUserData: Record<string, Record<string, boolean>>): Record<string, Record<string, boolean>> => ({
            ...prevUserData,
            "chapter3": {
                ...prevUserData.chapter3,
                "Identify how it feels in your body": true
            }
        }));

        setCurrPage("Identify how it feels in your body");
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
                value={p3_body}
                setValue={setP3_body}
                placeholder={"Head"}
            />
            <Text style={{...styles.textBox, marginBottom: 10,}}>
                What physical sensations do you notice accompanying this emotion?
            </Text>
            <DropdownComponent
                items={phys_options}
                value={p3_physical}
                setValue={setP3_Physical}
                placeholder={"Tense"}
            />
        

        </View>

        <ChapterNavigationButton
                prev={"/(app)/chapter3/content/activity1"}
                next={() => {
                    router.push("/(app)/chapter3/content/activity3");
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

  export default Activity3;