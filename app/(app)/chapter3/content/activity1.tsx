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
import { useAuthContext } from "@/contexts/AuthContext";


interface CurrentPageComponentProps {
  /* data: {[key: string]: any},
  setData: React.Dispatch<React.SetStateAction<{[key: string]: any}>>,
  dataFilled: boolean,
  setDataFilled: React.Dispatch<React.SetStateAction<boolean>> */
} 

const Activity1: React.FC<CurrentPageComponentProps> = ({}) => {
    const [p2_recentProcrastination, setP2_recentProcrastination] = useState("");
    const [p2_feeling, setP2_feeling] = useState("");
    const [p2_because, setP2_Because] = useState("");

    /* useEffect(() => {
        console.log('dataisfilled beginning', dataFilled)

        setData((prevData) => ({
            ...prevData, 
            p2_recentProcrastination: p2_recentProcrastination, 
            p2_feeling: p2_feeling,
            p2_because: p2_because,
          }));
      
          // Optionally, you can check if all the fields are filled and update dataFilled
          const isFilled = p2_recentProcrastination !== "" && p2_feeling !== "" && p2_because !== "";
          setDataFilled(isFilled);
    
          console.log('data:', data);
        
    }, [p2_recentProcrastination, p2_feeling, p2_because]); // Dependency array, this effect runs when "count" changes */

    //~~~JUST COPY PAST THIS INTO EACH ACTIVITY AND CHANGE THE CHAPTER AND TITLE ACCORDINGLY~~~
    const { userData, setUserData, currPage, setCurrPage } = useAuthContext();

    useEffect(() => {
        setUserData((prevUserData: Record<string, Record<string, boolean>>): Record<string, Record<string, boolean>> => ({
            ...prevUserData,
            "chapter3": {
                ...prevUserData.chapter3,
                "Label the Passengers on the Bus": true
            }
        }));

        setCurrPage("Label the Passengers on the Bus");
    }, []);
    //~~~END COPY PASTA~~~

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
                    value={p2_recentProcrastination}
                    onChangeText={setP2_recentProcrastination}
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
                            value={p2_feeling}
                            onChangeText={setP2_feeling}
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
                            value={p2_because}
                            onChangeText={setP2_Because}
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