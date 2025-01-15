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
import Page3 from "./Page3";
import Page4 from "./Page4";
import Page5 from "./Page5";
import Page6 from "./Page6";
import Page7 from "./Page7";
import Page8 from "./Page8";
import Page9 from "./Page9";
import Page10 from "./Page10";
import Page11 from "./Page11";
import Page12 from "./Page12";
import Page13 from "./Page13";
import Page14 from "./Page14";

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
    const [isVisible, setIsVisible] = useState(false); //empty input box

    const pageSet: {[key:number]: React.FC<CurrentPageComponentProps>} = {
        1: Page1,
        2: Page2,
        3: Page3,
        4: Page4,
        5: Page5,
        6: Page6,
        7: Page7,
        8: Page8,
        9: Page9,
        10: Page10,
        11: Page11,
        12: Page12,
        13: Page13,
        14: Page14,
    }

    const handleNext = () => {
        if (dataFilled) {
            let newPageNum = currPageNum + 1;
            setCurrPageNum(newPageNum);
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
        }
        //else close modal or something 
    };

    const CurrentPageComponent = pageSet[currPageNum];


    return (
      <SafeAreaView style={styles.container}>
        <View style={{flex: 1, margin: '4%', justifyContent: 'space-between'}}>
            <View style={{ justifyContent: "center", alignItems: "center" }}>
                <Text style={{ fontSize: 20, fontWeight: "bold" }}>
                ClearMind Pre-Survey
                </Text>
                <Progress.Bar
                style={{marginTop: '5%'}}
                progress={currPageNum / 14}
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
                    <Text style={{fontSize: 16}}>NEXT</Text>
                </Pressable> :
                <Pressable style={styles.navButtons} onPress={() => handleFinish()}>
                    <Text style={{fontSize: 16}}>FINISH</Text>
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
      alignItems: 'center',
      justifyContent: 'center'
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
    }
  });