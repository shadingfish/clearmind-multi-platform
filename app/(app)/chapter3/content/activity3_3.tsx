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
import React, { useState, useEffect, useCallback} from "react";
import { View, Image, SafeAreaView, ScrollView, Dimensions, StyleSheet, Text,Pressable, TextInput } from "react-native";
import { Label, RadioGroup, XStack, YStack } from 'tamagui'
import type { SizeTokens } from 'tamagui'
const { width } = Dimensions.get('window');
const { height } = Dimensions.get('window');
import { RadioButton } from 'react-native-paper';
import * as Progress from "react-native-progress";
import YoutubeIframe from 'react-native-youtube-iframe';
import { ChapterNavigationButton } from "@/components/ChapterNavigateButton";

interface CurrentPageComponentProps {
  /* data: {[key: string]: any},
  setData: React.Dispatch<React.SetStateAction<{[key: string]: any}>>,
  dataFilled: boolean,
  setDataFilled: React.Dispatch<React.SetStateAction<boolean>> */
}

const Activity3_3: React.FC<CurrentPageComponentProps> = ({ }) => {
    const [playing, setPlaying] = useState(false);
    const [isButtonPressed, setIsButtonPressed] = useState(false);
    const [isButton2Pressed, setIsButton2Pressed] = useState(false);

    /* useEffect(() => {
        setDataFilled(true);
    }, []); */

    const onStateChange = useCallback((state: string) => {
        if (state === 'ended') {
          setPlaying(false);
          console.log('Video has finished playing!');
        }
      }, []);

    return (
        <YStack margin={"$4"} gap={"$4"}>
        <ScrollView style={{width: '100%'}}>
            <Text style={{fontSize: 18, marginBottom: '5%'}}>
                Breathe in and start to walk slowly, focusing closely on the bottom of your feet.
                 Each step offers an opportunity to reconnect with both yourself and the earth. 
                 As you walk, be mindful of every breath you take and count your steps as you inhale and exhale.
                  Allow your breathing to flow naturally without trying to control it. 
                  Maintain your focus on the pace of your breathing and your steps. 
                  Remember, the key is counting.      
            </Text>
            <Text style={{fontSize: 18, marginBottom: '5%'}}>
                You can choose one habitual task you perform every day. 
                Here are some daily tasks people commonly practice on. 
                Feel free to explore your own too!  
            </Text>
            { !isButtonPressed ?
                <Pressable style={styles.outlineBoxOff} onPress={() => {setIsButtonPressed(!isButtonPressed)}}>
                    <View style={{flexDirection: 'row', alignItems: 'center'}}>
                        <View style={styles.circle}>
                            <Image source={require('@/assets/images/icon_wash.png')} style={{width: 26, height: 26, borderRadius: 13}}></Image>
                        </View>
                        <Text style={{fontSize: 16,fontWeight: "bold"}}>
                            Wash the Dishes
                        </Text>
                    </View>
                </Pressable> :
                <Pressable style={styles.outlineBoxOff} onPress={() => {setIsButtonPressed(!isButtonPressed)}}>
                    <View style={{flexDirection: 'row', alignItems: 'center'}}>
                        <View style={styles.circle}>
                            <Image source={require('@/assets/images/icon_wash.png')} style={{width: 26, height: 26, borderRadius: 13}}></Image>
                        </View>
                        <Text style={{fontSize: 16, fontWeight: "bold", }}>
                            Wash the Dishes
                        </Text>
                    </View>
                    <Text style={{fontSize: 16, marginVertical: '3%'}}>
                        Feel the water's temperature and texture on your hands, hear the dishes clinking, 
                        and notice how you move while scrubbing and rinsing. Allow yourself to enjoy 
                        making the dishes clean again.
                        If your mind starts to wander, it's completely fine.
                        Just acknowledge it and gently guide your focus back to washing. Focus all your attention on what you're doing.
                    </Text>
                </Pressable>
            }
            { !isButton2Pressed ?
                <Pressable style={styles.outlineBoxOff} onPress={() => {setIsButton2Pressed(!isButton2Pressed)}}>
                    <View style={{flexDirection: 'row', alignItems: 'center'}}>
                        <View style={styles.circle}>
                            <Image source={require('@/assets/images/icon_workout.png')} style={{width: 26, height: 26, borderRadius: 13}}></Image>
                        </View>
                        <Text style={{fontSize: 16,fontWeight: "bold"}}>
                            Workout
                        </Text>
                    </View>
                </Pressable> :
                <Pressable style={styles.outlineBoxOff} onPress={() => {setIsButton2Pressed(!isButton2Pressed)}}>
                    <View style={{flexDirection: 'row', alignItems: 'center'}}>
                        <View style={styles.circle}>
                            <Image source={require('@/assets/images/icon_workout.png')} style={{width: 26, height: 26, borderRadius: 13}}></Image>
                        </View>
                        <Text style={{fontSize: 16, fontWeight: "bold", }}>
                            Workout
                        </Text>
                    </View>
                    <Text style={{fontSize: 16, marginVertical: '3%'}}>
                        Pay attention to your body's sensations-observe your muscles, movement speed, 
                        breathing, and any tension or resistance. Feel the stretch and intensity. Simply 
                        notice your emotions without judgment. Do you feel accomplished? Are you being 
                        too harsh on yourself, or comparing your body shape with others?
                    </Text>
                </Pressable>
            }
        </ScrollView>

        <ChapterNavigationButton
                prev={"/(app)/chapter3/content/activity3"}/>

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
        marginTop: '2%',
        padding: '2%',
        alignSelf: 'center',
        textAlign: 'center',
        width: '100%',
    },
    circle:  {
        width: 30, // Circle diameter
        height: 30, // Circle diameter
        borderRadius: 15, // Half of the width/height for a perfect circle
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: "#90EE90",
        shadowColor: '#000', // Shadow color for iOS
        shadowOffset: { width: 0, height: 4 }, // Shadow position for iOS
        shadowOpacity: 0.1, // Shadow opacity for iOS
        shadowRadius: 5, // Shadow blur radius for iOS
        marginHorizontal: '3%',
    },
  });

  export default Activity3_3;