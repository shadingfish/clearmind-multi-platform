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
import CogDistortModal from './CogDistortModal';

interface CurrentPageComponentProps {
  data: {[key: string]: any},
  setData: React.Dispatch<React.SetStateAction<{[key: string]: any}>>,
  dataFilled: boolean,
  setDataFilled: React.Dispatch<React.SetStateAction<boolean>>
}

const Page7: React.FC<CurrentPageComponentProps> = ({ data, setData, dataFilled, setDataFilled }) => {
    const [whichCogDistPaths, setWhichCogDistPaths] = useState<Set<string>>(data.whichCogDistPaths || new Set<String>())
    const [hasCogDist, setHasCogDist] = useState<{ [key: string]: boolean }>(data.hasCogDist || {});
    const [currTitle, setCurrTitle] = useState("");
    
    const [isModalVisible, setIsModalVisible] = useState(false);

    const openModal = () => setIsModalVisible(true);
    const closeModal = () => setIsModalVisible(false);

    const addKeyValue = (key: string, value: boolean) => {
        setHasCogDist(prevState => ({
          ...prevState,  
          [key]: value,  
        }));
    };

    useEffect(() => {
        console.log('dataisfilled beginning', dataFilled)

        setData((prevData) => ({
            ...prevData, 
            whichCogDistPaths: whichCogDistPaths, 
            hasCogDist: hasCogDist,
          }));
      
          const isFilled = whichCogDistPaths.size >= 10;
          setDataFilled(isFilled);
    
          console.log('data:', data);
        
    }, [whichCogDistPaths, hasCogDist]); // Dependency array, this effect runs when "count" changes

    const handlePress = (pathName: string) => {
        setWhichCogDistPaths(prevPaths => {
            const newPaths = new Set(prevPaths);
            newPaths.add(pathName);
            return newPaths;
          });

        setCurrTitle(pathName);

        openModal();
    };

    return (
        <ScrollView style={{width: '100%', height: '85%'}}>
            <CogDistortModal isVisible={isModalVisible} onClose={closeModal} title={currTitle} hasCogDist={hasCogDist} setHasCogDist={setHasCogDist}/>
            <Text style={{fontSize: 18, marginVertical: '3%'}}>
                Now, let's talk about the ten most common cognitive distortions with examples:
            </Text>
            <View style={{width: '90%', justifyContent: 'center', marginLeft: '5%'}}>
            <View style={{flexDirection: 'row', alignItems: 'center', justifyContent: 'center', }}>
                <Pressable style={styles.box} onPress={() => handlePress("Mental Filtering")}>
                    <View style={styles.circle}>
                        {   whichCogDistPaths.has("Mental Filtering") ?
                            <Text style={{fontWeight: "bold", fontSize: 50, color: "grey"}}>P</Text> :
                            <Text style={{fontWeight: "bold", fontSize: 50, color: "grey"}}>?</Text> 
                        }
                    </View>
                    <Text style={{color: "grey"}}>Mental Filtering</Text>
                </Pressable>
                <Pressable style={styles.box} onPress={() => handlePress("All-or-nothing thinking")}>
                    <View style={styles.circle}>
                        {   whichCogDistPaths.has("All-or-nothing thinking") ?
                            <Text style={{fontWeight: "bold", fontSize: 50, color: "grey"}}>P</Text> :
                            <Text style={{fontWeight: "bold", fontSize: 50, color: "grey"}}>?</Text> 
                        }
                    </View>
                    <Text style={{color: "grey"}}>All-or-nothing thinking</Text>
                </Pressable>
            </View>
            <View style={{flexDirection: 'row', alignItems: 'center', justifyContent: 'center', marginTop: '2%' }}>
                <Pressable style={styles.box} onPress={() => handlePress("Overgeneralization")}>
                    <View style={styles.circle}>
                        {   whichCogDistPaths.has("Overgeneralization") ?
                            <Text style={{fontWeight: "bold", fontSize: 50, color: "grey"}}>P</Text> :
                            <Text style={{fontWeight: "bold", fontSize: 50, color: "grey"}}>?</Text> 
                        }
                    </View>
                    <Text style={{color: "grey"}}>Overgeneralization</Text>
                </Pressable>
                <Pressable style={styles.box} onPress={() => handlePress("Discounting the positive")}>
                    <View style={styles.circle}>
                        {   whichCogDistPaths.has("Discounting the positive") ?
                            <Text style={{fontWeight: "bold", fontSize: 50, color: "grey"}}>P</Text> :
                            <Text style={{fontWeight: "bold", fontSize: 50, color: "grey"}}>?</Text> 
                        }
                    </View>
                    <Text style={{color: "grey"}}>Discounting the positive</Text>
                </Pressable>
            </View>
            <View style={{flexDirection: 'row', alignItems: 'center', justifyContent: 'center', marginTop: '2%' }}>
                <Pressable style={styles.box} onPress={() => handlePress("Jumping to Conclusions")}>
                    <View style={styles.circle}>
                        {   whichCogDistPaths.has("Jumping to Conclusions") ?
                            <Text style={{fontWeight: "bold", fontSize: 50, color: "grey"}}>P</Text> :
                            <Text style={{fontWeight: "bold", fontSize: 50, color: "grey"}}>?</Text> 
                        }
                    </View>
                    <Text style={{color: "grey"}}>Jumping to Conclusions</Text>
                </Pressable>
                <Pressable style={styles.box} onPress={() => handlePress("Magnification")}>
                    <View style={styles.circle}>
                        {   whichCogDistPaths.has("Magnification") ?
                            <Text style={{fontWeight: "bold", fontSize: 50, color: "grey"}}>P</Text> :
                            <Text style={{fontWeight: "bold", fontSize: 50, color: "grey"}}>?</Text> 
                        }
                    </View>
                    <Text style={{color: "grey"}}>Magnification</Text>
                </Pressable>
            </View>
            <View style={{flexDirection: 'row', alignItems: 'center', justifyContent: 'center', marginTop: '2%' }}>
                <Pressable style={styles.box} onPress={() => handlePress("Emotional Reasoning")}>
                    <View style={styles.circle}>
                        {   whichCogDistPaths.has("Emotional Reasoning") ?
                            <Text style={{fontWeight: "bold", fontSize: 50, color: "grey"}}>P</Text> :
                            <Text style={{fontWeight: "bold", fontSize: 50, color: "grey"}}>?</Text> 
                        }
                    </View>
                    <Text style={{color: "grey"}}>Emotional Reasoning</Text>
                </Pressable>
                <Pressable style={styles.box} onPress={() => handlePress("\"Should\" Statements")}>
                    <View style={styles.circle}>
                        {   whichCogDistPaths.has("\"Should\" Statements") ?
                            <Text style={{fontWeight: "bold", fontSize: 50, color: "grey"}}>P</Text> :
                            <Text style={{fontWeight: "bold", fontSize: 50, color: "grey"}}>?</Text> 
                        }
                    </View>
                    <Text style={{color: "grey"}}>"Should" Statements</Text>
                </Pressable>
            </View>
            <View style={{flexDirection: 'row', alignItems: 'center', justifyContent: 'center', marginTop: '2%' }}>
                <Pressable style={styles.box} onPress={() => handlePress("Labeling")}>
                    <View style={styles.circle}>
                        {   whichCogDistPaths.has("Labeling") ?
                            <Text style={{fontWeight: "bold", fontSize: 50, color: "grey"}}>P</Text> :
                            <Text style={{fontWeight: "bold", fontSize: 50, color: "grey"}}>?</Text> 
                        }
                    </View>
                    <Text style={{color: "grey"}}>Labeling</Text>
                </Pressable>
                <Pressable style={styles.box} onPress={() => handlePress("Personalization and Blame")}>
                    <View style={styles.circle}>
                        {   whichCogDistPaths.has("Personalization and Blame") ?
                            <Text style={{fontWeight: "bold", fontSize: 50, color: "grey"}}>P</Text> :
                            <Text style={{fontWeight: "bold", fontSize: 50, color: "grey"}}>?</Text> 
                        }
                    </View>
                    <Text style={{color: "grey"}}>Personalization and Blame</Text>
                </Pressable>
            </View>
            
            </View>
        </ScrollView>
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
        paddingHorizontal: '2%',
        width: '50%',
        backgroundColor: "#FFF",
        height: 110,
    },
    circle:  {
        width: 60, // Circle diameter
        height: 60, // Circle diameter
        borderRadius: 30, // Half of the width/height for a perfect circle
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

  export default Page7;