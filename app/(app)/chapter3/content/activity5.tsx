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
import { Label, RadioGroup, XStack, YStack } from 'tamagui'
import type { SizeTokens } from 'tamagui'
const { width } = Dimensions.get('window');
const { height } = Dimensions.get('window');
import { RadioButton } from 'react-native-paper';
import * as Progress from "react-native-progress";
import { ChapterNavigationButton } from "@/components/ChapterNavigateButton";
import { router } from "expo-router";
import { useAuthContext } from "@/contexts/AuthContext";

interface CurrentPageComponentProps {
  /* data: {[key: string]: any},
  setData: React.Dispatch<React.SetStateAction<{[key: string]: any}>>,
  dataFilled: boolean,
  setDataFilled: React.Dispatch<React.SetStateAction<boolean>> */
}

const Activity5: React.FC<CurrentPageComponentProps> = ({}) => {
    /* useEffect(() => {
        setDataFilled(true);
    }, []); */

    //~~~JUST COPY PAST THIS INTO EACH ACTIVITY AND CHANGE THE CHAPTER AND TITLE ACCORDINGLY~~~
    const { userData, setUserData, currPage, setCurrPage } = useAuthContext();

    useEffect(() => {
        setUserData((prevUserData: Record<string, Record<string, boolean>>): Record<string, Record<string, boolean>> => ({
            ...prevUserData,
            "chapter3": {
                ...prevUserData.chapter3,
                "Be Aware of Cognitive Distortions": true
            }
        }));

        setCurrPage("Be Aware of Cognitive Distortions");
    }, []);
    //~~~END COPY PASTA~~~

    return (
        <YStack margin={"$4"} gap={"$4"}>
            <View style={{width: '100%',}}>
                <Text style={{fontSize: 18,}}>
                    Earlier you tried positive cognitive strategies which help you recognize and
                    manage when an urge to procrastinate comes up. However, is there anything we can do to even 
                    prevent the urge to procrastinate from the first place?
                    Cognitive distortions can help.
                </Text>
                <Text style={styles.textBox}>
                    Cognitive distortions are internal mental filters or biases that 
                    can lead to misperceptions of reality, negative emotions, and unhealthy mindsets.
                    They often make you view things more negatively than they really are and question 
                    your abilities. Once you learn to recognize those cognitive distortions you can 
                    reframe your thoughts to feel better and act more positively.
                </Text>
                <Text style={styles.textBox}>
                    Now, let's talk about the ten most common cognitive distortions with examples:
                </Text>
            </View>

            <ChapterNavigationButton
                prev={"/(app)/chapter3/content/activity4"}
                next={() => {
                    router.push("/(app)/chapter3/content/activity6");
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

  export default Activity5;