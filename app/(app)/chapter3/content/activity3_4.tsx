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

const Activity3_4 = () => {
    const [playing, setPlaying] = useState(false);
    const [isButtonPressed, setIsButtonPressed] = useState(false);
    const [isButton2Pressed, setIsButton2Pressed] = useState(false);
    const [isButton3Pressed, setIsButton3Pressed] = useState(false);
    const [isButton4Pressed, setIsButton4Pressed] = useState(false);

    const onStateChange = useCallback((state: string) => {
        if (state === 'ended') {
          setPlaying(false);
          console.log('Video has finished playing!');
        }
      }, []);

    return (
        <YStack margin={"$4"} gap={"$4"} flex={1}>
            <ScrollView style={{flex: 1, width: '100%'}}>
                <Text style={{fontSize: 18, marginBottom: '5%'}}>
                    Cognitive defusion exercises are commonly used in Acceptance and Commitment Therapy.
                    These tools are designed to help you disentangle from any challenging thoughts you're experiencing. 
                    They encourage you to look at your thoughts in a new way. The key point of cognitive defusion 
                    is to realize that you are merely observing your thoughts, and you are not the thoughts 
                    themselves nor controlling your thoughts.     
                </Text>
                <Text style={{fontSize: 18, marginBottom: '5%'}}>
                    One popular technique people commonly practice is called Leave on a Stream exercise.
                    Let's watch the video and practice together.     
                </Text>
                <YoutubeIframe
                    height={250}
                    play={playing}
                    videoId="r1C8hwj5LXw" // Replace with your YouTube video ID
                    onChangeState={onStateChange}
                />
                { !isButtonPressed ?
                    <Pressable style={styles.outlineBoxVid} onPress={() => {setIsButtonPressed(!isButtonPressed)}}>
                        <Text style={{fontSize: 16,}}>
                            Can't play the video?
                        </Text>
                    </Pressable> :
                    <Pressable style={styles.outlineBoxVid} onPress={() => {setIsButtonPressed(!isButtonPressed)}}>
                        <Text style={{fontSize: 16, fontWeight: "bold", alignSelf: 'center', marginBottom: '3%'}}>
                            Can't play the video?
                        </Text>
                        <Text style={{fontSize: 16, marginBottom: '3%'}}>
                            Here's how to do it:
                        </Text>
                        <Text style={{fontSize: 16}}>
                        1. Sit in a comfortable position and close your eyes.
                        </Text>
                        <Text style={{fontSize: 16}}>
                        2. Imagine sitting beside a stream with leaves floating by. Pause for 10 seconds.
                        </Text>
                        <Text style={{fontSize: 16}}>
                        3. Notice the thoughts you're experiencing. Place each thought on a leaf and let it float away. Try not to hold on to it or push it down the stream further.
                        </Text>
                        <Text style={{fontSize: 16}}>
                        4. If you do not have any thoughts for a moment, just keep watching the stream. Another thought will come up soon. Wait 20 seconds.
                        </Text>
                        <Text style={{fontSize: 16,}}>
                        5. Let the stream flow naturally. Don't rush your thoughts.
                        </Text>
                        <Text style={{fontSize: 16}}>
                        6. Negative thoughts like "This is silly" and "This is boring" go on leaves too. Wait 20 seconds.
                        </Text>
                        <Text style={{fontSize: 16,}}>
                        7. If a leaf gets stuck, that's okay. It will move when ready. If the thought comes up again, just watch it float by another time. Wait 20 seconds.
                        </Text>
                        <Text style={{fontSize: 16,}}>
                        8. When experiencing challenging thoughts, simply acknowledge them. Say to yourself, "I notice that I'm feeling bored/upset/anxious," and let them float on a leaf.
                        </Text>
                        <Text style={{fontSize: 16,marginBottom: '3%'}}>
                        9. Getting distracted is normal. When you notice it, gently bring your attention back to the stream.
                        </Text>
                    </Pressable>
                }
                <Text style={{fontSize: 18, marginBottom: '5%'}}>
                    There are various visualizations that can be applied to the same principle. 
                    Here are a few common examples:
                </Text>
                { !isButton2Pressed ?
                    <Pressable style={styles.outlineBoxOff} onPress={() => {setIsButton2Pressed(!isButton2Pressed)}}>
                        <Text style={{fontSize: 16,fontWeight: "bold", marginHorizontal: '2%'}}>
                            Beach Balls
                        </Text>
                    </Pressable> :
                    <Pressable style={styles.outlineBoxOff} onPress={() => {setIsButton2Pressed(!isButton2Pressed)}}>
                        <Text style={{fontSize: 16, fontWeight: "bold",marginHorizontal: '2%' }}>
                            Beach Balls
                        </Text>
                        <Text style={{fontSize: 16, marginVertical: '3%', marginHorizontal: '2%'}}>
                            Imagine placing a beach ball in a bathtub filled with water and trying to push it down. 
                            No matter how hard you push, the ball will keep popping back up. This illustrates the 
                            impossibility of rejecting or suppressing reality or the difficult emotions we experience.
                            The truth is, it only makes them return with stronger force because what you resist will 
                            persist.
                        </Text>
                    </Pressable>
                }
                { !isButton3Pressed ?
                    <Pressable style={styles.outlineBoxOff} onPress={() => {setIsButton3Pressed(!isButton3Pressed)}}>
                        <Text style={{fontSize: 16,fontWeight: "bold", marginHorizontal: '2%'}}>
                            A Train
                        </Text>
                    </Pressable> :
                    <Pressable style={styles.outlineBoxOff} onPress={() => {setIsButton3Pressed(!isButton3Pressed)}}>
                        <Text style={{fontSize: 16, fontWeight: "bold",marginHorizontal: '2%' }}>
                            A Train
                        </Text>
                        <Text style={{fontSize: 16, marginVertical: '3%', marginHorizontal: '2%'}}>
                            Picture yourself standing on a bridge, observing a train as it 
                            passes beneath you. Each boxcar carries a negative thought, word, or phrase.
                            By watching the train move along, you detach yourself from these thoughts.
                        </Text>
                    </Pressable>
                }
                { !isButton4Pressed ?
                    <Pressable style={styles.outlineBoxOff} onPress={() => {setIsButton4Pressed(!isButton4Pressed)}}>
                        <Text style={{fontSize: 16,fontWeight: "bold", marginHorizontal: '2%'}}>
                            Quicksand Visualization
                        </Text>
                    </Pressable> :
                    <Pressable style={styles.outlineBoxOff} onPress={() => {setIsButton4Pressed(!isButton4Pressed)}}>
                        <Text style={{fontSize: 16, fontWeight: "bold",marginHorizontal: '2%' }}>
                            Quicksand Visualization
                        </Text>
                        <Text style={{fontSize: 16, marginVertical: '3%', marginHorizontal: '2%'}}>
                            Imagine being stuck in quicksand, similar to a person 
                            struggling against difficult emotions, which only causes us 
                            to sink deeper. By accepting our situation, like lying flat on 
                            the quicksand and not resisting, we can keep ourselves from sinking deeper.
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
        marginBottom: '1%',
        width: '100%'
    },
    outlineBoxVid: {
        borderColor: '#54B363',
        borderWidth: 1,
        borderRadius: 20,
        marginTop: '2%',
        padding: '2%',
        alignSelf: 'center',
        textAlign: 'center',
        marginBottom: '5%',
    },
  });

  export default Activity3_4;