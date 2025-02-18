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
import { Label, RadioGroup, XStack, YStack, Theme } from 'tamagui'
import type { SizeTokens } from 'tamagui'
const { width } = Dimensions.get('window');
const { height } = Dimensions.get('window');
import { RadioButton } from 'react-native-paper';
import * as Progress from "react-native-progress";
import InputField from "../InputField";
import {DropdownComponent} from "../Dropdown";
import { Ionicons } from '@expo/vector-icons';

interface CurrentPageComponentProps {
  data: {[key: string]: any},
  setData: React.Dispatch<React.SetStateAction<{[key: string]: any}>>,
  dataFilled: boolean,
  setDataFilled: React.Dispatch<React.SetStateAction<boolean>>
}

const Page3: React.FC<CurrentPageComponentProps> = ({ data, setData, dataFilled, setDataFilled }) => {
    const [pathsCompleted, setPathsCompleted] = useState(data.pathsCompleted || 0);
    const [whichPaths, setWhichPaths] = useState<Set<string>>(data.whichPaths || new Set<String>())

    useEffect(() => {
        console.log('dataisfilled beginning', dataFilled)

        setData((prevData) => ({
            ...prevData, 
            whichPaths: whichPaths, 
          }));
      
          const isFilled = whichPaths.size > 1;
          setDataFilled(isFilled);
    
          console.log('data:', data);
        
    }, [whichPaths]); // Dependency array, this effect runs when "count" changes

    const handlePress = (pathName: string) => {
        setWhichPaths(prevPaths => {
            const newPaths = new Set(prevPaths);
            newPaths.add(pathName);
            return newPaths;
          });
    };

    return (
        <View style={{width: '100%',}}>
            <Text style={{fontSize: 18}}>
                In this activity, you'll explore various meditation techniques, 
                including the 20 Breath Meditation, the Relaxing Breathing (4-7-8) technique, 
                the Mindfulness in Everyday Tasks, and Leaves on a Steam exercise. 
                Try them out and see which one you like the most.
            </Text>
            <Text style={{...styles.textBox, marginBottom: 10,}}>
                You are required to try <Text style={{textDecorationLine: 'underline', fontWeight: "bold"}}>2 out of 4</Text> of these activities to unlock future content, 
                but feel free to come back to try more. You can also look up more meditation techniques on your own.
                Remember, each technique helps you relax in its own way, so pick the one that feels right for
                you.
            </Text>
            <View style={{flexDirection: 'row', alignItems: 'center', justifyContent: 'center', }}>
                <Pressable style={styles.box} onPress={() => handlePress("The 20 Breath Meditation")}>
                    <View style={styles.circle}>
                        {   whichPaths.has("The 20 Breath Meditation") ?
                            <Image source={require('@/assets/images/icon_20breath.png')} style={{width: 60, height: 60, }}/> :
                            <Text style={{fontWeight: "bold", fontSize: 50, color: "grey"}}>?</Text> 
                        }
                    </View>
                    <Text style={{color: "grey"}}>The 20 Breath Meditation</Text>
                </Pressable>
                <Pressable style={styles.box} onPress={() => handlePress("Relaxing Breathing")}>
                    <View style={styles.circle}>
                        {   whichPaths.has("Relaxing Breathing") ?
                            <Image source={require('@/assets/images/icon_478.png')} style={{width: 60, height: 60, }}/> :
                            <Text style={{fontWeight: "bold", fontSize: 50, color: "grey"}}>?</Text> 
                        }
                    </View>
                    <Text style={{color: "grey"}}>Relaxing Breathing</Text>
                </Pressable>
            </View>
            <View style={{flexDirection: 'row', alignItems: 'center', justifyContent: 'center', marginTop: '2%' }}>
                <Pressable style={styles.box} onPress={() => handlePress("Mindful Daily Tasks")}>
                    <View style={styles.circle}>
                        {   whichPaths.has("Mindful Daily Tasks") ?
                            <Image source={require('@/assets/images/icon_everyday.png')} style={{width: 60, height: 60, }}/> :
                            <Text style={{fontWeight: "bold", fontSize: 50, color: "grey"}}>?</Text> 
                        }
                    </View>
                    <Text style={{color: "grey"}}>Mindful Daily Tasks</Text>
                </Pressable>
                <Pressable style={styles.box} onPress={() => handlePress("Leaves on a Stream")}>
                    <View style={styles.circle}>
                        {   whichPaths.has("Leaves on a Stream") ?
                            <Image source={require('@/assets/images/icon_stream.png')} style={{width: 60, height: 60, }}/> :
                            <Text style={{fontWeight: "bold", fontSize: 50, color: "grey"}}>?</Text> 
                        }
                    </View>
                    <Text style={{color: "grey"}}>Leaves on a Stream</Text>
                </Pressable>
            </View>
            

        </View>
    );
  }
  
  const styles = StyleSheet.create({
    textBox: {
        marginTop: '5%',
        fontSize: 18,
    },
    box: {
        shadowColor: '#000', // Shadow color for iOS
        shadowOffset: { width: 0, height: 4 }, // Shadow position for iOS
        shadowOpacity: 0.2, // Shadow opacity for iOS
        shadowRadius: 5, // Shadow blur radius for iOS
        borderRadius: 5,
        alignItems: 'center',
        justifyContent: 'center',
        marginHorizontal: '1%',
        //paddingHorizontal: '5%',
        width: '50%',
        backgroundColor: "#FFF"
    },
    circle:  {
        width: 70, // Circle diameter
        height: 70, // Circle diameter
        borderRadius: 35, // Half of the width/height for a perfect circle
        justifyContent: 'center',
        alignItems: 'center',
        margin: 10,
        backgroundColor: "#90EE90",
        shadowColor: '#000', // Shadow color for iOS
        shadowOffset: { width: 0, height: 4 }, // Shadow position for iOS
        shadowOpacity: 0.1, // Shadow opacity for iOS
        shadowRadius: 5, // Shadow blur radius for iOS
    },
  });

  export default Page3;