import React, { useState, useEffect} from "react";
import { View, Image, SafeAreaView, ScrollView, Dimensions, StyleSheet, Pressable, Text, TextInput, Modal } from "react-native";
import type { SizeTokens } from 'tamagui'
const { width } = Dimensions.get('window');
const { height } = Dimensions.get('window');
import { RadioButton } from 'react-native-paper';
import * as Progress from "react-native-progress";
import Page1 from "./Page1";
import Page2 from "./Page2";
import Page3 from "./Page3";
import Page4 from "./Page4";
import { Ionicons } from '@expo/vector-icons';
import { Input, YStack, Label, } from "tamagui";
import colors from "@/constants/colors";
import InputField from "../InputField";

interface CurrentPageComponentProps {
    data: {[key: string]: string},
    setData: React.Dispatch<React.SetStateAction<{[key: string]: string}>>,
    dataFilled: boolean,
    setDataFilled: React.Dispatch<React.SetStateAction<boolean>>
  }

export default function Chapter3Pages() {

    const windowWidth = Dimensions.get("window").width;
    const windowHeight = Dimensions.get("window").height;

    const [currPageNum, setCurrPageNum] = useState(1);
    const [dataFilled, setDataFilled] = useState(false); //set to true when data in current page is filled, then when you click next it becomes false again

    const [data, setData] = useState({});
    const [isVisible, setIsVisible] = useState(false); //empty input box

    const pageSet: {[key:number]: React.FC<CurrentPageComponentProps>} = {
        1: Page1,
        2: Page2,
        3: Page3,
        4: Page4,
    }

    const pageTitle: {[key:number]: string} = {
        1: "Part 3 Opening",
        2: "Label the Passengers on the Bus",
        3: "Identify How it Feels Within Your Body",
        4: "Learn How to Meditate"
    }

    const [currTitle, setCurrTitle] = useState(pageTitle[currPageNum]);

    const handleNext = () => {
        if (dataFilled) {
            let newPageNum = currPageNum + 1;
            setCurrPageNum(newPageNum);
            setCurrTitle(pageTitle[newPageNum])
            setDataFilled(false);
        }
        else {
            setIsVisible(true);
            setTimeout(() => {
                setIsVisible(false); // Hide the view after 3 seconds
            }, 3000);
            console.log('not all info in page', currPageNum, 'is filled out');
        }
    };

    const handleFinish = () => {
        if (dataFilled) {
            console.log("close modal, upload data, and exit")
        }
        else {
            console.log('not all info in page', currPageNum, 'is filled out');
        }
    };

    const handleBack = () => {
        if (currPageNum > 1) {
            let newPageNum = currPageNum - 1;
            setCurrPageNum(newPageNum);
            setCurrTitle(pageTitle[newPageNum])
        }
        //else close modal or something 
    };

    const CurrentPageComponent = pageSet[currPageNum];


    return (
      <SafeAreaView style={styles.container}>
            <View style={styles.headBar}>
                <Pressable>
                    <Ionicons name="home" size={32} color={"white"}/>
                </Pressable>
                    <Text style={styles.title}>{currTitle}</Text>
                <Pressable>
                    <Ionicons name="menu" size={32} color={"white"}/>
                </Pressable>
            </View>
        <View style={{flex: 1, margin: '4%', justifyContent: 'space-between'}}>
            <View style={{ justifyContent: "center", alignItems: "center" }}>
                <CurrentPageComponent
                    data={data}
                    setData={setData}
                    dataFilled={dataFilled}
                    setDataFilled={setDataFilled}
                />
            </View>

        {/* navigate and pass the current data as props once the navigation stack is set up */}

        <View style={{alignItems: 'center', flexDirection: "row", justifyContent: "space-between", padding: '5%'}}>
            <Pressable style={styles.navButtons} onPress={() => handleBack()}>
                <Text style={{fontSize: 16, color: "white", fontWeight: 'bold'}}>{'<<'}</Text>
            </Pressable>
            { isVisible ?
                <View style={styles.noInputBox}>
                    <Image
                        source={require('../../assets/images/clearmind_icon.png')}
                        style={{ width: 20, height: 20, marginRight: 5 }}
                    />
                    <Text style={{fontSize: 13,}}>Empty input</Text>
                </View> :
                <View/>
            }
            
            { currPageNum != 14 ?
                <Pressable style={styles.navButtons} onPress={() => handleNext()}>
                    <View/>
                    <Text style={{fontSize: 16, color: "white", fontWeight: 'bold'}}>{'>>'}</Text>
                </Pressable> :
                <Pressable style={styles.navButtons} onPress={() => handleFinish()}>
                    <Text style={{fontSize: 16}}>{'>>'}</Text>
                </Pressable>
            }
        </View>
        </View>
      </SafeAreaView>
    );
  }
  
  const styles = StyleSheet.create({
    container: {
      //flex: 1, // Make the SafeAreaView fill the screen
      width: '100%',
      height: '100%',
      //margin: "5%",
      //justifyContent: "space-between", // Space out children vertically
      backgroundColor: "white"
    },
    textInputLine: {
        marginTop: '3%',
        borderBottomWidth: 1,
        borderBottomColor: '#808080',
        fontSize: 16,
        paddingVertical: 5,
        width: '100%',
    },
    textQuestion: {
        marginTop: "5%",
        fontSize: 16,
        color: "#808080",
    },
    radioGroup: {
      flexDirection: 'row',
      //alignItems: 'center',
      paddingHorizontal: '5%',
      marginTop: 5,
    },
    radioButton: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    radioLabel: {
        fontSize: 16,
        color: '#333',
    },
    navButtons: {
      backgroundColor: "#54B363",
      paddingHorizontal: '8%',
      paddingVertical: '3%',
      borderRadius: 5,
      justifyContent: 'space-between',
    },
    noInputBox: {
        paddingVertical: '3%',
        paddingHorizontal: '4%',
        backgroundColor: '#fff',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        borderRadius: 20,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
    },
    headBar: {
        width: '100%',
        backgroundColor: "#54B363",
        paddingVertical: '5%',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingHorizontal: '7%',
        flexWrap: 'wrap',  // Ensure the content wraps when necessary
    },
    title: {
        color: "#FFF",
        fontSize: 23,
        fontWeight: "bold",
        flexShrink: 1,  // Allow the text to shrink and wrap within its container
        flex: 1,  // Make sure it takes the available space
        marginHorizontal: '5%'
    }
  });