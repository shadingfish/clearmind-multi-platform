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

const Page5: React.FC<CurrentPageComponentProps> = ({ data, setData, dataFilled, setDataFilled }) => {
    useEffect(() => {
        setDataFilled(true);
    }, []);

    return (
        <View style={{width: '100%',}}>
            <Text style={{fontSize: 18,}}>
                When you're calmed down, write a short and simple belief statement addressing the 
                challenging thoughts and emotions you observed earlier. For example, if stress is 
                from difficult schoolwork, your belief statement could be "I'm developing strategies 
                to manage stress and avoid procrastination" or "I can master challenging emotions by 
                staying focused on my goals."
            </Text>
            <Image source={require('@/assets/images/img_believe.png')} style={{width: '100%', height: 200, marginVertical: '5%'}}/>
            <Text style={styles.textBox}>
            You can use your belief statement like a lighthouse during tough times. 
            You can also connect your belief statement with your breathing, making 
            it a part of your new, positive mindset with each breath. For instance,
             when you breathe in, think, "I am not defined by my challenges," and 
             when you breathe out, think, "I am learning new ways to improve."
            </Text>
        </View>
    );
  }
  
  const styles = StyleSheet.create({
    textBox: {
        marginTop: '5%',
        fontSize: 18,
    }
  });

  export default Page5;