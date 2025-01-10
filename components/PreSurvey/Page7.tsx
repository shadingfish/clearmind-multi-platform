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

const Page7: React.FC<CurrentPageComponentProps> = ({ data, setData, dataFilled, setDataFilled }) =>{
    const [ques26, setQues26] = useState<string>(data.ques26 || "");
    const [ques27, setQues27] = useState<string>(data.ques27 || "");
    const [ques28, setQues28] = useState<string>(data.ques28 || "");
    const [ques29, setQues29] = useState<string>(data.ques29 || "");
    const [ques30, setQues30] = useState<string>(data.ques30 || "");
    const [ques31, setQues31] = useState<string>(data.ques31 || "");

    const windowWidth = Dimensions.get("window").width;
    const windowHeight = Dimensions.get("window").height;

    const options = ['1', '2', '3', '4']

    useEffect(() => {
        /* console.log('ques26:', ques26)
        console.log('ques27:', ques27)
        console.log('ques28:', ques28)
        console.log('ques29:', ques29)
        console.log('ques30:', ques30) */

        console.log('dataisfilled beginning', dataFilled)

        setData((prevData) => ({
            ...prevData, 
            ques26: ques26, 
            ques27: ques27,
            ques28: ques28,
            ques29: ques29,
            ques30: ques30,
            ques31: ques31,
          }));
      
          // Optionally, you can check if all the fields are filled and update dataFilled
          const isFilled = ques26 !== "" && ques27 !== "" && ques28 !== "" && ques29 !== "" && ques30 !== "" && ques31 !== "";
          setDataFilled(isFilled);
    
          console.log('data:', data);
    }, [ques26, ques27, ques28, ques29, ques30, ques31]); // Dependency array, this effect runs when "count" changes

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
                26. I often worry that my best is not as good as expected in
            </Text>

            <View>
                <View style={{...styles.radioGroup}}>
                    {options.map((option, index) => (
                    <View style={styles.radioButton}>
                        <RadioButton.Android
                        key={option}
                        value={option}
                        status={ques26 === option ? 'checked' : 'unchecked'}
                        onPress={() => setQues26(option)} // Set the selected gender
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
                27. I tend to put off doing school work because it stresses me.
            </Text>

            <View>
                    <View style={{...styles.radioGroup}}>
                        {options.map((option, index) => (
                        <View style={styles.radioButton}>
                            <RadioButton.Android
                            key={option}
                            value={option}
                            status={ques27 === option ? 'checked' : 'unchecked'}
                            onPress={() => setQues27(option)} // Set the selected gender
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
                28. I often worry that I am not doing assignments properly.
            </Text>

            <View>
                    <View style={{...styles.radioGroup}}>
                        {options.map((option, index) => (
                        <View style={styles.radioButton}>
                            <RadioButton.Android
                            key={option}
                            value={option}
                            status={ques28 === option ? 'checked' : 'unchecked'}
                            onPress={() => setQues28(option)} // Set the selected gender
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
                29. I am less confident about school than my classmates.
            </Text>

            <View>
                    <View style={{...styles.radioGroup}}>
                        {options.map((option, index) => (
                        <View style={styles.radioButton}>
                            <RadioButton.Android
                            key={option}
                            value={option}
                            status={ques29 === option ? 'checked' : 'unchecked'}
                            onPress={() => setQues29(option)} // Set the selected gender
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
                30. I have a sense of dread when I am in my classrooms.
            </Text>

            <View>
                <View style={{...styles.radioGroup}}>
                    {options.map((option, index) => (
                    <View style={styles.radioButton}>
                        <RadioButton.Android
                        key={option}
                        value={option}
                        status={ques30 === option ? 'checked' : 'unchecked'}
                        onPress={() => setQues30(option)} // Set the selected gender
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
                31. I tend to find my instructors intimidating.
            </Text>

            <View>
                <View style={{...styles.radioGroup}}>
                    {options.map((option, index) => (
                    <View style={styles.radioButton}>
                        <RadioButton.Android
                        key={option}
                        value={option}
                        status={ques31 === option ? 'checked' : 'unchecked'}
                        onPress={() => setQues31(option)} // Set the selected gender
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

export default Page7;