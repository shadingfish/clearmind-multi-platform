import React, { useState, useEffect} from "react";
import { View, Image, SafeAreaView, ScrollView, Dimensions, StyleSheet, Text,Pressable, TextInput } from "react-native";
import { Label, RadioGroup, XStack, YStack } from 'tamagui'
import type { SizeTokens } from 'tamagui'
const { width } = Dimensions.get('window');
const { height } = Dimensions.get('window');
import { RadioButton } from 'react-native-paper';
import * as Progress from "react-native-progress";

interface CurrentPageComponentProps {
    data: {[key: string]: string},
    setData: React.Dispatch<React.SetStateAction<{[key: string]: string}>>,
    dataFilled: boolean,
    setDataFilled: React.Dispatch<React.SetStateAction<boolean>>
  }

const Page10: React.FC<CurrentPageComponentProps> = ({ data, setData, dataFilled, setDataFilled }) =>{
    const [ques42, setQues42] = useState<string>(data.ques42 || "");
    const [ques43, setQues43] = useState<string>(data.ques43 || "");
    const [ques44, setQues44] = useState<string>(data.ques44 || "");
    const [ques45, setQues45] = useState<string>(data.ques45 || "");
    const [ques46, setQues46] = useState<string>(data.ques46 || "");

    const windowWidth = Dimensions.get("window").width;
    const windowHeight = Dimensions.get("window").height;

    const options = ['1', '2', '3', '4']

    useEffect(() => {
        /* console.log('ques42:', ques42)
        console.log('ques43:', ques43)
        console.log('ques44:', ques44)
        console.log('ques45:', ques45)
        console.log('ques46:', ques46) */

        console.log('dataisfilled beginning', dataFilled)

        setData((prevData) => ({
            ...prevData, 
            ques42: ques42, 
            ques43: ques43,
            ques44: ques44,
            ques45: ques45,
            ques46: ques46,
          }));
      
          // Optionally, you can check if all the fields are filled and update dataFilled
          const isFilled = ques42 !== "" && ques43 !== "" && ques44 !== "" && ques45 !== "" && ques46 !== "";
          setDataFilled(isFilled);
    
          console.log('data:', data);
    }, [ques42, ques43, ques44, ques45, ques46]); // Dependency array, this effect runs when "count" changes

    return (
        <View style={{width: '100%',}}>
            <Text
                style={{
                fontSize: 16,
                fontWeight: "bold",
                color: "#808080",
                marginTop: 15,
                }}
            >
                The following questions ask how you have sought to cope with a hardship in your life. {"\n"}
                1 = 1 haven't been doing this at all; 2 = A little bit; 3 =
                A medium amount; 4 = I've been doing this a lot
            </Text>

            <Text
                style={styles.textQuestion}
            >
                42. I've been giving up trying to deal with it.
            </Text>

            <View>
                <View style={{...styles.radioGroup}}>
                    {options.map((option, index) => (
                    <View style={styles.radioButton}>
                        <RadioButton.Android
                        key={option}
                        value={option}
                        status={ques42 === option ? 'checked' : 'unchecked'}
                        onPress={() => setQues42(option)} // Set the selected gender
                        color="#1EB688"
                        />
                        <Text style={styles.radioLabel}>
                            {option}
                        </Text>
                    </View>
                    ))}
                </View>
            </View>

            <Text
                style={styles.textQuestion}
            >
                43. I've been taking action to try to make the situation better.
            </Text>

            <View>
                    <View style={{...styles.radioGroup}}>
                        {options.map((option, index) => (
                        <View style={styles.radioButton}>
                            <RadioButton.Android
                            key={option}
                            value={option}
                            status={ques43 === option ? 'checked' : 'unchecked'}
                            onPress={() => setQues43(option)} // Set the selected gender
                            color="#1EB688"
                            />
                            <Text style={styles.radioLabel}>
                                {option}
                            </Text>
                        </View>
                        ))}
                    </View>
            </View>

            <Text
                style={styles.textQuestion}
            >
                44. I've been refusing to believe that it has happened.
            </Text>

            <View>
                    <View style={{...styles.radioGroup}}>
                        {options.map((option, index) => (
                        <View style={styles.radioButton}>
                            <RadioButton.Android
                            key={option}
                            value={option}
                            status={ques44 === option ? 'checked' : 'unchecked'}
                            onPress={() => setQues44(option)} // Set the selected gender
                            color="#1EB688"
                            />
                            <Text style={styles.radioLabel}>
                                {option}
                            </Text>
                        </View>
                        ))}
                    </View>
            </View>

            <Text
                style={styles.textQuestion}
            >
                45. I've been saying things to let my unpleasant feelings escape.
            </Text>

            <View>
                    <View style={{...styles.radioGroup}}>
                        {options.map((option, index) => (
                        <View style={styles.radioButton}>
                            <RadioButton.Android
                            key={option}
                            value={option}
                            status={ques45 === option ? 'checked' : 'unchecked'}
                            onPress={() => setQues45(option)} // Set the selected gender
                            color="#1EB688"
                            />
                            <Text style={styles.radioLabel}>
                                {option}
                            </Text>
                        </View>
                        ))}
                    </View>
            </View>

            <Text
                style={styles.textQuestion}
            >
                46. I've been getting help and advice from other people.
            </Text>

            <View>
                <View style={{...styles.radioGroup}}>
                    {options.map((option, index) => (
                    <View style={styles.radioButton}>
                        <RadioButton.Android
                        key={option}
                        value={option}
                        status={ques46 === option ? 'checked' : 'unchecked'}
                        onPress={() => setQues46(option)} // Set the selected gender
                        color="#1EB688"
                        />
                        <Text style={styles.radioLabel}>
                            {option}
                        </Text>
                    </View>
                    ))}
                </View>
            </View>
        </View>
    )

};

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
      justifyContent: 'center',
      paddingHorizontal: '5%',
      marginTop: 5,
    },
    radioButton: {
        flexDirection: 'row',
        alignItems: 'center',
        marginLeft: '5%'
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

export default Page10;