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

interface CurrentPageComponentProps {
  data: {[key: string]: any},
  setData: React.Dispatch<React.SetStateAction<{[key: string]: any}>>,
  dataFilled: boolean,
  setDataFilled: React.Dispatch<React.SetStateAction<boolean>>
}

const Page8: React.FC<CurrentPageComponentProps> = ({ data, setData, dataFilled, setDataFilled }) => {
    useEffect(() => {
        setDataFilled(true);
    }, []);

    // based on the answers that they filled in before
    let tempData = {
        "Mental Filtering": true,
        "All-or-nothing thinking": true,
        "Overgeneralization": true,
        "Discounting the positive": true,
        "Jumping to Conclusions": true,
        "Magnification": true,
        "Emotional Reasoning": true,
        '"Should" Statements': true,
        "Labeling": true,
        "Personalization and Blame": false,
    } //load this into a state instead from data

    const problem2technique = {
        "Mental Filtering": "Journaling is a helpful way to overcome mental filtering. By keeping a diary and writing down your thoughts and emotions about life events, you can shift your focus from the negatives to actively seeking out neutral or positive aspects of a situation.",
        "All-or-nothing thinking": "To overcome All-or-nothing thinking, recognize that success and progress aren't all-or-nothing. Address this mindset by substituting self-defeating thoughts, becoming more aware of your strengths, and focusing on progress rather than outcomes.",
        "Overgeneralization": "To counter overgeneralization, it's helpful to use more realistic language with a positive tone. Instead of saying, \"I always do that!\" you can say something like, \"That happens occasionally, but I'm committed to improving in the future.\"",
        "Discounting the positive": "To conquer this cognitive distortion, try changing how you explain events. Instead of dismissing positive results as luck, pay more attention to how your strengths, abilities, and hard work played a role in achieving them.",
        "Jumping to Conclusions": "To conquer this cognitive distortion, you can follow the following steps:\n\n  1. Check the facts: Gather as much information as possible before making judgments or decisions. \n\n  2. Challenge your thoughts: Actively question your assumptions and explore alternative explanations. \n\n  3. Communication: Instead of assuming what others think, communicate your concerns and seek direct answers to avoid confusion or misunderstanding. \n\n  4. Try an alternative viewpoint: View the situation from an outsider's standpoint, considering the information needed for a more accurate understanding.",
        "Magnification": "To overcome magnification, you can work on recognizing these exaggerated thoughts and deliberately replacing them with more constructive and positive thinking patterns.",
        "Emotional Reasoning": "You can practice defusion to get distance from your emotions. For example, instead of \"I feel overwhelmed\", you tell yourself, \"I'm aware that I'm feeling overwhelmed.\" This simple shift can promote a more objective and balanced perspective on your emotions.",
        '"Should" Statements': "One way to combat this cognitive distortion is to cultivate self-compassion. Swap those unrealistic thoughts with more practical ones and focus on embracing yourself for who you truly are, not who you believe you should be.",
        "Labeling": "To overcome labeling, challenge the validity of your assumptions. Find evidence contradicting your negative thinking, and remember the distinction between personal opinions and objective facts.",
        "Personalization and Blame": "To combat personalization and blame, explore additional factors that could have influenced your situation. Instead of placing all the blame on yourself, consider external circumstances or the actions of others that might have also played a part.",
    }

    return (
        <ScrollView style={{width: '100%', height: '85%'}}>
            <Text style={{fontSize: 18,}}>
                Once you realize that you have experienced these thinking distortions, 
                it's helpful to take action to change the ways you think.
            </Text>
            <Text style={styles.textBox}>
                Here are some suggestions:
            </Text>

                {Object.entries(tempData)
                    .filter(([key, value]) => value) // Filter for entries with `true` values
                        .map(([key]) => (
                            <View style={styles.outlineBox}>
                                <View style={{flexDirection: 'row', alignItems: 'center'}}>
                                    <View style={styles.circle}>

                                    </View>
                                    <Text key={key} style={{fontSize: 20,}}>
                                        {key}
                                    </Text>
                                </View>
                                <Text style={{fontSize: 16, marginTop: '3%'}}>
                                    {problem2technique[key as keyof typeof problem2technique]}
                                </Text>
                            </View>
                ))}

        </ScrollView>
    );
  }
  
  const styles = StyleSheet.create({
    textBox: {
        marginTop: '5%',
        fontSize: 18,
    },
    outlineBox: {
        width: '100%',
        borderColor: '#54B363',
        borderWidth: 1,
        borderRadius: 10,
        marginTop: '5%',
        padding: '2%'
    },
    titleText: {
        fontSize: 20,
    },
    circle:  {
        width: 30, // Circle diameter
        height: 30, // Circle diameter
        borderRadius: 15, // Half of the width/height for a perfect circle
        backgroundColor: "#90EE90",
        marginRight: '3%',
        shadowColor: '#000', // Shadow color for iOS
        shadowOffset: { width: 2, height: 2 }, // Shadow position for iOS
        shadowOpacity: 0.3, // Shadow opacity for iOS
        shadowRadius: 0.5, // Shadow blur radius for iOS
    },
  });

  export default Page8;