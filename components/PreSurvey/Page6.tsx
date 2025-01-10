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

const Page6: React.FC<CurrentPageComponentProps> = ({ data, setData, dataFilled, setDataFilled }) =>{
    const [ques21, setQues21] = useState<string>(data.ques21 || "");
    const [ques22, setQues22] = useState<string>(data.ques22 || "");
    const [ques23, setQues23] = useState<string>(data.ques23 || "");
    const [ques24, setQues24] = useState<string>(data.ques24 || "");
    const [ques25, setQues25] = useState<string>(data.ques25 || "");

    const windowWidth = Dimensions.get("window").width;
    const windowHeight = Dimensions.get("window").height;

    const options = ['1', '2', '3', '4', '5']

    useEffect(() => {
        /* console.log('ques21:', ques21)
        console.log('ques22:', ques22)
        console.log('ques23:', ques23)
        console.log('ques24:', ques24)
        console.log('ques25:', ques25) */

        console.log('dataisfilled beginning', dataFilled)

        setData((prevData) => ({
            ...prevData, 
            ques21: ques21, 
            ques22: ques22,
            ques23: ques23,
            ques24: ques24,
            ques25: ques25,
          }));
      
          // Optionally, you can check if all the fields are filled and update dataFilled
          const isFilled = ques21 !== "" && ques22 !== "" && ques23 !== "" && ques24 !== "" && ques25 !== "";
          setDataFilled(isFilled);
    
          console.log('data:', data);
    }, [ques21, ques22, ques23, ques24, ques25]); // Dependency array, this effect runs when "count" changes

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
                21. I tend to put off things for the next day.
            </Text>

            <View>
                <View style={{...styles.radioGroup}}>
                    {options.map((option, index) => (
                    <View style={styles.radioButton}>
                        <RadioButton.Android
                        key={option}
                        value={option}
                        status={ques21 === option ? 'checked' : 'unchecked'}
                        onPress={() => setQues21(option)} // Set the selected gender
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
                22. I don't spend much time studying school material until the end of the semester.
            </Text>

            <View>
                    <View style={{...styles.radioGroup}}>
                        {options.map((option, index) => (
                        <View style={styles.radioButton}>
                            <RadioButton.Android
                            key={option}
                            value={option}
                            status={ques22 === option ? 'checked' : 'unchecked'}
                            onPress={() => setQues22(option)} // Set the selected gender
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
                23. I frequently find myself putting important deadlines off.
            </Text>

            <View>
                    <View style={{...styles.radioGroup}}>
                        {options.map((option, index) => (
                        <View style={styles.radioButton}>
                            <RadioButton.Android
                            key={option}
                            value={option}
                            status={ques23 === option ? 'checked' : 'unchecked'}
                            onPress={() => setQues23(option)} // Set the selected gender
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
                24. If I don't understand something, I'll usually wait until the night before a test to figure it out.
            </Text>

            <View>
                    <View style={{...styles.radioGroup}}>
                        {options.map((option, index) => (
                        <View style={styles.radioButton}>
                            <RadioButton.Android
                            key={option}
                            value={option}
                            status={ques24 === option ? 'checked' : 'unchecked'}
                            onPress={() => setQues24(option)} // Set the selected gender
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
                25. I read the textbook and look over notes before coming to class and listening to a lecture or teacher.
            </Text>

            <View>
                <View style={{...styles.radioGroup}}>
                    {options.map((option, index) => (
                    <View style={styles.radioButton}>
                        <RadioButton.Android
                        key={option}
                        value={option}
                        status={ques25 === option ? 'checked' : 'unchecked'}
                        onPress={() => setQues25(option)} // Set the selected gender
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

export default Page6;