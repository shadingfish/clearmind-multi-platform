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

interface CurrentPageComponentProps {
  data: {[key: string]: any},
  setData: React.Dispatch<React.SetStateAction<{[key: string]: any}>>,
  dataFilled: boolean,
  setDataFilled: React.Dispatch<React.SetStateAction<boolean>>
}

const Page12: React.FC<CurrentPageComponentProps> = ({ data, setData, dataFilled, setDataFilled }) => {
    const [playing, setPlaying] = useState(false);
    const [isButtonPressed, setIsButtonPressed] = useState(false);

    useEffect(() => {
        setDataFilled(true);
    }, []);

    const onStateChange = useCallback((state: string) => {
        if (state === 'ended') {
          setPlaying(false);
          console.log('Video has finished playing!');
        }
      }, []);

    return (
        <ScrollView style={{width: '100%', height: '85%'}}>
            <Text style={{fontSize: 18, marginBottom: '5%'}}>
                The Relaxing Breathing (4-7-8) Exercise helps calm your nerves. 
                Don't do more than four cycles at first, or you might get dizzy.      
            </Text>
            <YoutubeIframe
                height={250}
                play={playing}
                videoId="TlZa9dBK2LY" // Replace with your YouTube video ID
                onChangeState={onStateChange}
            />
            { !isButtonPressed ?
                <Pressable style={styles.outlineBoxOff} onPress={() => {setIsButtonPressed(!isButtonPressed)}}>
                    <Text style={{fontSize: 16,}}>
                        Can't play the video?
                    </Text>
                </Pressable> :
                <Pressable style={styles.outlineBoxOff} onPress={() => {setIsButtonPressed(!isButtonPressed)}}>
                    <Text style={{fontSize: 16, fontWeight: "bold", alignSelf: 'center', marginBottom: '3%'}}>
                        Can't play the video?
                    </Text>
                    <Text style={{fontSize: 16, marginBottom: '3%'}}>
                        Here's how to do it:
                    </Text>
                    <Text style={{fontSize: 16}}>
                        1. Sit straight and relax your shoulders.
                    </Text>
                    <Text style={{fontSize: 16}}>
                        2. Place your tongue behind your upper front teeth and keep it there.
                    </Text>
                    <Text style={{fontSize: 16}}>
                        3. Breathe in through your nose for 4 seconds.
                    </Text>
                    <Text style={{fontSize: 16}}>
                        4. Hold your breath for 7 seconds.
                    </Text>
                    <Text style={{fontSize: 16, marginBottom: '3%'}}>
                        5. Exhale from your mouth for 8 seconds, making a whoosh sound.
                    </Text>
                    <Text style={{fontSize: 16, marginBottom: '3%'}}>
                        That's one round. Repeat this 3 to 4 times.
                    </Text>
                    <Text style={{fontSize: 16,}}>
                        Remember, the key point is to keep the counts of 4, 7, and 8. 
                        If holding your breath is hard, go faster but keep the same pattern.
                        Use this anytime you feel stressed to help calm down quickly.
                    </Text>
                </Pressable>
            }
        </ScrollView>
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
    },
  });

  export default Page12;