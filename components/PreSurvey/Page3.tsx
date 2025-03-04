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

const Page3: React.FC<CurrentPageComponentProps> = ({ data, setData, dataFilled, setDataFilled }) =>  {
    const [ques6, setQues6] = useState<string>(data.ques6 || "");
    const [ques7, setQues7] = useState<string>(data.ques7 || "");
    const [ques8, setQues8] = useState<string>(data.ques8 || "");
    const [ques9, setQues9] = useState<string>(data.ques9 || "");
    const [ques10, setQues10] = useState<string>(data.ques10 || "");

    const windowWidth = Dimensions.get("window").width;
    const windowHeight = Dimensions.get("window").height;

    const options = ['1', '2', '3', '4', '5']

    useEffect(() => {
        /* console.log('ques6:', ques6)
        console.log('ques7:', ques7)
        console.log('ques8:', ques8)
        console.log('ques9:', ques9)
        console.log('ques10:', ques10) */

        console.log('dataisfilled beginning', dataFilled)

        setData((prevData) => ({
            ...prevData, 
            ques6: ques6, 
            ques7: ques7,
            ques8: ques8,
            ques9: ques9,
            ques10: ques10,
          }));
      
          // Optionally, you can check if all the fields are filled and update dataFilled
          const isFilled = ques6 !== "" && ques7 !== "" && ques8 !== "" && ques9 !== "" && ques10 !== "";
          setDataFilled(isFilled);
    
          console.log('data:', data);
    }, [ques6, ques7, ques8, ques9, ques10]); // Dependency array, this effect runs when "count" changes

    return (
        <View style={{width: '100%',}}>
                <Text
                    style={{
                    marginTop: "5%",
                    fontSize: 16,
                    fontWeight: "bold",
                    color: "#808080",
                    }}
                >
                    How much do you, yourself agree to the following statements?
                </Text>
                <Text
                    style={{
                    fontSize: 16,
                    fontWeight: "bold",
                    color: "#808080",
                    }}
                >
                    1 = Strongly Disagree; 5 = Strongly Agree
                </Text>

                <Text
                    style={styles.textQuestion}
                >
                    6. I waste a lot of time on unimportant things.
                </Text>

                <View>
                    <View style={{...styles.radioGroup}}>
                        {options.map((option, index) => (
                        <View style={styles.radioButton}>
                            <RadioButton.Android
                            key={option}
                            value={option}
                            status={ques6 === option ? 'checked' : 'unchecked'}
                            onPress={() => setQues6(option)} // Set the selected gender
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
                7. I get distracted by other, more fun, things when I am supposed to work on schoolwork.
            </Text>

            <View>
                    <View style={{...styles.radioGroup}}>
                        {options.map((option, index) => (
                        <View style={styles.radioButton}>
                            <RadioButton.Android
                            key={option}
                            value={option}
                            status={ques7 === option ? 'checked' : 'unchecked'}
                            onPress={() => setQues7(option)} // Set the selected gender
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
                8. I concentrate on school work instead of other distractions.
            </Text>

            <View>
                    <View style={{...styles.radioGroup}}>
                        {options.map((option, index) => (
                        <View style={styles.radioButton}>
                            <RadioButton.Android
                            key={option}
                            value={option}
                            status={ques8 === option ? 'checked' : 'unchecked'}
                            onPress={() => setQues8(option)} // Set the selected gender
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
                9. I can't focus on school work or projects for more than an hour until I get distracted.
            </Text>

            <View>
                    <View style={{...styles.radioGroup}}>
                        {options.map((option, index) => (
                        <View style={styles.radioButton}>
                            <RadioButton.Android
                            key={option}
                            value={option}
                            status={ques9 === option ? 'checked' : 'unchecked'}
                            onPress={() => setQues9(option)} // Set the selected gender
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
                10. My attention span for schoolwork is very short.
            </Text>

            <View>
                    <View style={{...styles.radioGroup}}>
                        {options.map((option, index) => (
                        <View style={styles.radioButton}>
                            <RadioButton.Android
                            key={option}
                            value={option}
                            status={ques10 === option ? 'checked' : 'unchecked'}
                            onPress={() => setQues10(option)} // Set the selected gender
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

  export default Page3;