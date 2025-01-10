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

const Page8: React.FC<CurrentPageComponentProps> = ({ data, setData, dataFilled, setDataFilled }) =>{
    const [ques32, setQues32] = useState<string>(data.ques32 || "");
    const [ques33, setQues33] = useState<string>(data.ques33 || "");
    const [ques34, setQues34] = useState<string>(data.ques34 || "");
    const [ques35, setQues35] = useState<string>(data.ques35 || "");
    const [ques36, setQues36] = useState<string>(data.ques36 || "");

    const windowWidth = Dimensions.get("window").width;
    const windowHeight = Dimensions.get("window").height;

    const options = ['1', '2', '3', '4']

    useEffect(() => {
        /* console.log('ques32:', ques32)
        console.log('ques33:', ques33)
        console.log('ques34:', ques34)
        console.log('ques35:', ques35)
        console.log('ques36:', ques36) */

        console.log('dataisfilled beginning', dataFilled)

        setData((prevData) => ({
            ...prevData, 
            ques32: ques32, 
            ques33: ques33,
            ques34: ques34,
            ques35: ques35,
            ques36: ques36,
          }));
      
          // Optionally, you can check if all the fields are filled and update dataFilled
          const isFilled = ques32 !== "" && ques33 !== "" && ques34 !== "" && ques35 !== "" && ques36 !== "";
          setDataFilled(isFilled);
    
          console.log('data:', data);
    }, [ques32, ques33, ques34, ques35, ques36]); // Dependency array, this effect runs when "count" changes

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
                1 = Not at all typical of me; 2 = Somewhat typical of me; 3 = Quite typical of me; 4 = Very Typical of me
            </Text>

            <Text
                style={styles.textQuestion}
            >
                32. I spend much of my time at school worrying about what is next.
            </Text>

            <View>
                <View style={{...styles.radioGroup}}>
                    {options.map((option, index) => (
                    <View style={styles.radioButton}>
                        <RadioButton.Android
                        key={option}
                        value={option}
                        status={ques32 === option ? 'checked' : 'unchecked'}
                        onPress={() => setQues32(option)} // Set the selected gender
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
                33. There is something about school that scares me.
            </Text>

            <View>
                    <View style={{...styles.radioGroup}}>
                        {options.map((option, index) => (
                        <View style={styles.radioButton}>
                            <RadioButton.Android
                            key={option}
                            value={option}
                            status={ques33 === option ? 'checked' : 'unchecked'}
                            onPress={() => setQues33(option)} // Set the selected gender
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
                34. I'm concerned about what my classmates think about my abilities.
            </Text>

            <View>
                    <View style={{...styles.radioGroup}}>
                        {options.map((option, index) => (
                        <View style={styles.radioButton}>
                            <RadioButton.Android
                            key={option}
                            value={option}
                            status={ques34 === option ? 'checked' : 'unchecked'}
                            onPress={() => setQues34(option)} // Set the selected gender
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
                35. I often feel sick when I need to work on a major class assignment.
            </Text>

            <View>
                    <View style={{...styles.radioGroup}}>
                        {options.map((option, index) => (
                        <View style={styles.radioButton}>
                            <RadioButton.Android
                            key={option}
                            value={option}
                            status={ques35 === option ? 'checked' : 'unchecked'}
                            onPress={() => setQues35(option)} // Set the selected gender
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
                36. I have a hard time handling school responsibilities.
            </Text>

            <View>
                <View style={{...styles.radioGroup}}>
                    {options.map((option, index) => (
                    <View style={styles.radioButton}>
                        <RadioButton.Android
                        key={option}
                        value={option}
                        status={ques36 === option ? 'checked' : 'unchecked'}
                        onPress={() => setQues36(option)} // Set the selected gender
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

export default Page8;