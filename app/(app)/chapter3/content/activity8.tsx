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
import { useAuthContext } from "@/contexts/AuthContext";

interface CurrentPageComponentProps {
  /* data: {[key: string]: any},
  setData: React.Dispatch<React.SetStateAction<{[key: string]: any}>>,
  dataFilled: boolean,
  setDataFilled: React.Dispatch<React.SetStateAction<boolean>> */
}

const Activity8: React.FC<CurrentPageComponentProps> = ({  }) => {

    const [isButtonPressed, setIsButtonPressed] = useState(false);
    const [potentialStrategy, setPotentialStrategy] = useState("");

    //~~~JUST COPY PAST THIS INTO EACH ACTIVITY AND CHANGE THE CHAPTER AND TITLE ACCORDINGLY~~~
    const { userData, setUserData, currPage, setCurrPage } = useAuthContext();

    useEffect(() => {
        setUserData((prevUserData: Record<string, Record<string, boolean>>): Record<string, Record<string, boolean>> => ({
            ...prevUserData,
            "chapter3": {
                ...prevUserData.chapter3,
                "Reflecting on Cognitive Distortions in Various Procrastination Types": true
            }
        }));

        setCurrPage("Reflecting on Cognitive Distortions in Various Procrastination Types");
    }, []);
    //~~~END COPY PASTA~~~

    /* useEffect(() => {
        console.log('dataisfilled beginning', dataFilled)

        setData((prevData) => ({
            ...prevData, 
            potentialStrategy: potentialStrategy, 
          }));
      
          // Optionally, you can check if all the fields are filled and update dataFilled
          const isFilled = potentialStrategy !== "";
          setDataFilled(isFilled);
    
          console.log('data:', data);
        
    }, [potentialStrategy]); // Dependency array, this effect runs when "count" changes */


    return (
        <YStack margin={"$4"} gap={"$4"} flex={1}>
        <ScrollView style={{width: '100%', height: '85%'}}>
            <Text style={{fontSize: 18,}}>
                In part 1, we introduced three different types of procrastination.
            </Text>
            { !isButtonPressed ?
                <Pressable style={styles.outlineBoxOff} onPress={() => {setIsButtonPressed(!isButtonPressed)}}>
                    <Text style={{fontSize: 16,}}>
                        Procrastination Tendencies
                    </Text>
                </Pressable> :
                <Pressable style={styles.outlineBoxOff} onPress={() => {setIsButtonPressed(!isButtonPressed)}}>
                    <Text style={{fontSize: 16, fontWeight: "bold", alignSelf: 'center', marginBottom: '3%'}}>
                        Procrastination Tendencies
                    </Text>
                    <Text style={{fontSize: 16, marginBottom: '3%'}}>
                        <Text style={{ fontWeight: 'bold' }}>Arousal procrastination:</Text> Purposely delaying tasks until the last moment. 
                        People with arousal procrastination tend to use the time pressure of an 
                        approaching deadline to complete their work.
                    </Text>
                    <Text style={{fontSize: 16, marginBottom: '3%'}}>
                        <Text style={{ fontWeight: 'bold' }}>Avoidant procrastination:</Text> Delaying tasks to avoid 
                        some fears triggered by the tasks. People with avoidant 
                        procrastination tend to have fear of failure, challenges, 
                        or even additional responsibilities from success.
                    </Text>
                    <Text style={{fontSize: 16,}}>
                        <Text style={{ fontWeight: 'bold' }}>Decisional procrastination:</Text> Delaying decision-making. 
                        People tend to have 
                        decisional procrastination when they find the task complex, are 
                        afraid of potential conflicts with others, or desire to protect 
                        their self-esteem or self-confidence.
                    </Text>
                </Pressable>
            }
            <Text style={styles.textBox}>
                Think of your past procrastination experiences. Do you recognize any
                specific cognitive distortions behind those particular procrastination episodes? 
                How would you like to change these thought patterns in the future?
            </Text>
            <Text style={{...styles.textBox, marginBottom: '5%'}}>
                Describe your episodes, cognitive distortions behind, and some potential strategies.
            </Text>
            <Input
                unstyled
                placeholder={"Potential strategy"}
                borderColor={colors.border}
                borderWidth={3}
                borderRadius={7}
                size="$4"
                width={"100%"}
                alignSelf="center"
                value={potentialStrategy}
                onChangeText={setPotentialStrategy}
                />
        </ScrollView>

        <ChapterNavigationButton
                prev={"/(app)/chapter3/content/activity7"}
                next={() => {
                    router.push("/(app)/chapter3/content/summary");
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
    outlineBoxOff: {
        borderColor: '#54B363',
        borderWidth: 1,
        borderRadius: 20,
        marginTop: '5%',
        padding: '2%',
        alignSelf: 'center',
        textAlign: 'center',
    },

  });

  export default Activity8;