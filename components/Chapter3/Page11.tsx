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

const Page11: React.FC<CurrentPageComponentProps> = ({ data, setData, dataFilled, setDataFilled }) => {
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
                Welcome to The 20 Breath Meditation tutorial.
                The 20 Breath Meditation is a concentration exercise 
                that helps you bring awareness to one thing and keep it there.
                 If your mind starts to wander, don't worry; we'll show you how 
                 to guide it back to the object of concentration, which, in this 
                 exercise, is your breath and counting.       
            </Text>
            <YoutubeIframe
                height={250}
                play={playing}
                videoId="jt7nITE3qaM" // Replace with your YouTube video ID
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
                        The 20 Breath Meditation is a concentration practice which brings
                         your awareness to one thing and keeps it there. If your mind goes 
                         off track, don't worry, just guide it back to the object of concentration,
                          which is the breath and the counting.
                    </Text>
                    <Text style={{fontSize: 16, marginBottom: '3%'}}>
                            Focus on your breath. Without changing how 
                            you breathe, become aware of all the sensations that 
                            come with breathing. Start counting your exhales using 
                            your inner voice. As you exhale for the first time, say 
                            "one" silently. Continue this pattern with the next exhale, 
                            saying "two." Keep up until you've counted ten full breath cycles. 
                            After that, count another ten cycles, but this time go in reverse 
                            order, starting from ten and counting down to one.
                    </Text>
                    <Text style={{fontSize: 16, marginBottom: '3%'}}>
                        Give each breath your full attention. Observe the subtle 
                        differences in the sensations of your breath. Remember, 
                        you're not changing your breath; you're simply using it as 
                        a focal point to keep your mind anchored.
                    </Text>
                    <Text style={{fontSize: 16,}}>
                        After completing a cycle of 20 breaths, you 
                        can take a few extra moments to rest while 
                        observing the rhythm of your breath flowing in and out.
                        If you'd like, you can do another round of 20 breaths.
                    </Text>
                </Pressable>
            }
            <Text style={styles.textBox}>
                Let's bring your attention to your breath.
                Without changing how you breathe, Gradually increase 
                the duration of your practice in small steps. You 
                might consider using a timer to help you track the time. 
                Keep the duration comfortable and manageable, so that you feel
                 a sense of accomplishment rather than frustration if you find
                  it challenging to complete it at first.   
            </Text>
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

  export default Page11;