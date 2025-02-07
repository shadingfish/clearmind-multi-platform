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

const Page1: React.FC<CurrentPageComponentProps> = ({ data, setData, dataFilled, setDataFilled }) => {
    useEffect(() => {
        setDataFilled(true);
    }, []);

    return (
        <View style={{width: '100%',}}>
            <Text style={{fontSize: 18,}}>
                So far we learned that:
            </Text>
            <Text style={styles.textBox}>
                • Procrastination is often a resulting behavior triggered by some challenging emotions (part 1)
            </Text>
            <Text style={styles.textBox}>
                •You can allow those challenging emotions to exist but just do not let them sabotage your goal/value (part 2)
            </Text>
            <Text style={styles.textBox}>
                In this part, we'll guide you through a step-by-step approach for managing challenging emotions. We will start with identifying your challenging emotions (Activity
                3.1), followed by noticing how these emotions manifest physically within your body (Activity
                3.2). Next, you'll engage in some meditation exercises to help you stay calm and focused (Activity 3.3). In Activity 3.4, you'll create a compassionate self-talk statement to help manage your challenging emotions. To understand where these emotions come from, try Activity 3.5.
            </Text>
            <Text style={styles.textBox}>
                After this part, you will better understand and manage the challenging emotions that can lead to procrastination, helping you stay aligned with your values and achieve your goals.
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

  export default Page1;