import React, { useState, useEffect} from "react";
import { View, Image, SafeAreaView, ScrollView, Dimensions, StyleSheet, Text,Pressable, TextInput } from "react-native";
import { Label, RadioGroup, XStack, YStack } from 'tamagui'
import type { SizeTokens } from 'tamagui'
import { RadioButton } from 'react-native-paper';
import * as Progress from "react-native-progress";
import { useToastController } from "@tamagui/toast";
import { ChapterNavigationButton } from "@/components/ChapterNavigateButton";
import { hasEmptyValues } from "@/constants/helper";
import { router, RelativePathString } from "expo-router";
import { useChapterProgressContext } from "@/contexts/AuthContext";
import { useAuth } from "@/hooks/useAuth";
import { getPresurveyActivity, setPresurveyActivity } from "@/hooks/PresurveyActivity";


const Activity2 = () => {
    const toast = useToastController();
    const { user, pending } = useAuth();

    const [ques1, setQues1] = useState<string>("");
    const [ques2, setQues2] = useState<string>("");
    const [ques3, setQues3] = useState<string>("");
    const [ques4, setQues4] = useState<string>("");
    const [ques5, setQues5] = useState<string>("");
    const [data, setData] = useState<{[key: string]: any}>({});

    const options = ['1', '2', '3', '4', '5']

    const windowWidth = Dimensions.get("window").width;
    const windowHeight = Dimensions.get("window").height;

    const {setPresurveyProgress} = useChapterProgressContext();
    useEffect(() => {
      setPresurveyProgress(2)
    }, [])

    /* useEffect(() => {
        setData((prevData) => ({
            ...prevData, 
            ques1: ques1, 
            ques2: ques2,
            ques3: ques3,
            ques4: ques4,
            ques5: ques5,
          }));
    
          console.log('data:', data);
        
    }, [ques1, ques2, ques3, ques4, ques5]); // Dependency array, this effect runs when "count" changes */

    const updateQuestion = (field: string, value: string) => {
        setData((prev) => {
            const updatedQuestions = { ...prev, [field]: value };
            return updatedQuestions;
        });
      };

    useEffect(() => {
      if (user) {
        console.log('getPresurveyActivity2')
        getPresurveyActivity(user.uid, "Activity2")
          .then((snapshot) => {
            if (snapshot.exists()) {
              const answer = snapshot.data();
              for (const [key, value] of Object.entries(answer)) {
                updateQuestion(key as string, value as string);
                console.log(key, value)
              }
            }
            else {
              console.log('setting data here');
              setData((prevData) => ({
                ...prevData, 
                ques1: "", 
                ques2: "",
                ques3: "",
                ques4: "",
                ques5: "",
              }));
            }
          })
          .catch((err) => console.log("Error get presurvey activity2:", err));
      }
    }, [pending]);

    return (
        <YStack margin={"$4"} gap={"$4"}>
        <View style={{width: '100%'}}>
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
                1. I usually allocate time to review and proofread my work.
            </Text>

            <View>
                <View style={{...styles.radioGroup}}>
                    {options.map((option, index) => (
                    <View style={styles.radioButton}>
                        <RadioButton.Android
                        key={option}
                        value={option}
                        status={data?.ques1 === option ? 'checked' : 'unchecked'}
                        onPress={() => updateQuestion('ques1', option)} // Set the selected gender
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
            2. I put off projects until the last minute.
        </Text>

        <View>
                <View style={{...styles.radioGroup}}>
                    {options.map((option, index) => (
                    <View style={styles.radioButton}>
                        <RadioButton.Android
                        key={option}
                        value={option}
                        status={data?.ques2 === option ? 'checked' : 'unchecked'}
                        onPress={() => updateQuestion('ques2', option)} // Set the selected gender
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
            3. I have found myself waiting until the day before to start a big project.
        </Text>

        <View>
                <View style={{...styles.radioGroup}}>
                    {options.map((option, index) => (
                    <View style={styles.radioButton}>
                        <RadioButton.Android
                        key={option}
                        value={option}
                        status={data?.ques3 === option ? 'checked' : 'unchecked'}
                        onPress={() => updateQuestion('ques3', option)} // Set the selected gender
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
            4. I know I should work on school work, but I just don't do it.
        </Text>

        <View>
                <View style={{...styles.radioGroup}}>
                    {options.map((option, index) => (
                    <View style={styles.radioButton}>
                        <RadioButton.Android
                        key={option}
                        value={option}
                        status={data?.ques4 === option ? 'checked' : 'unchecked'}
                        onPress={() => updateQuestion('ques4', option)} // Set the selected gender
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
            5. When working on schoolwork, I usually get distracted by other things.
        </Text>

        <View>
                <View style={{...styles.radioGroup}}>
                    {options.map((option, index) => (
                    <View style={styles.radioButton}>
                        <RadioButton.Android
                        key={option}
                        value={option}
                        status={data?.ques5 === option ? 'checked' : 'unchecked'}
                        onPress={() => updateQuestion('ques5', option)} // Set the selected gender
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

        <ChapterNavigationButton
            prev={"/(app)/presurvey/content/activity1"}
            next={() => {if (hasEmptyValues(data)) {
                toast.show("Empty Input");
            } else {
                setPresurveyActivity(user!.uid, data, "Activity2");
                router.push("/(app)/presurvey/content/activity3" as RelativePathString);
            }
            }}
        />
        </YStack>
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

export default Activity2;