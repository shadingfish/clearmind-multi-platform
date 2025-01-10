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
import { View, Image, SafeAreaView, ScrollView, Dimensions, StyleSheet, Text,Pressable, TextInput, Modal } from "react-native";
import { Label, RadioGroup, XStack, YStack } from 'tamagui'
import type { SizeTokens } from 'tamagui'
const { width } = Dimensions.get('window');
const { height } = Dimensions.get('window');
import { RadioButton } from 'react-native-paper';
import * as Progress from "react-native-progress";
import Page1 from "./Page1";
import Page2 from "./Page2";

interface CurrentPageComponentProps {
    data: {[key: string]: string},
    setData: React.Dispatch<React.SetStateAction<{[key: string]: string}>>,
    dataFilled: boolean,
    setDataFilled: React.Dispatch<React.SetStateAction<boolean>>
  }

export default function CurrPage() {

    const windowWidth = Dimensions.get("window").width;
    const windowHeight = Dimensions.get("window").height;

    const [currPageNum, setCurrPageNum] = useState(1);
    const [dataFilled, setDataFilled] = useState(false); //set to true when data in current page is filled, then when you click next it becomes false again

    const [data, setData] = useState({});

    const pageSet: {[key:number]: React.FC<CurrentPageComponentProps>} = {
        1: Page1,
        2: Page2,
    }

    const handleNext = () => {
        if (dataFilled) {
            let newPageNum = currPageNum + 1;
            setCurrPageNum(newPageNum);
            setDataFilled(false);
        }
        else {
            console.log('not all info in page', currPageNum, 'is filled out');
        }
    };

    const handleBack = () => {
        if (currPageNum > 1) {
            let newPageNum = currPageNum - 1;
            setCurrPageNum(newPageNum);
        }
        //else close modal or something 
    };

    const CurrentPageComponent = pageSet[currPageNum];


    return (
      <SafeAreaView style={styles.container}>
        <View style={{flex: 1, margin: '5%', justifyContent: 'space-between'}}>
            <View style={{ justifyContent: "center", alignItems: "center" }}>
                <Text style={{ fontSize: 20, fontWeight: "bold" }}>
                ClearMind Pre-Survey
                </Text>
                <Progress.Bar
                style={{marginTop: '5%'}}
                progress={currPageNum / 11}
                width={windowWidth * 0.8}
                height={5}
                color="#1EB688"
                unfilledColor="#D3D3D3"
                borderColor="#D3D3D3"
                />
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
                <Text style={{fontSize: 16}}>BACK</Text>
            </Pressable>
            <Pressable style={styles.navButtons} onPress={() => handleNext()}>
                <Text style={{fontSize: 16}}>NEXT</Text>
            </Pressable>
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
      alignItems: 'center',
      justifyContent: 'center'
    }
  });