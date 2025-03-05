import React, { useState, useEffect} from "react";
import { View, Image, SafeAreaView, ScrollView, Dimensions, StyleSheet, Text,Pressable, TextInput } from "react-native";
import { Label, RadioGroup, XStack, YStack } from 'tamagui'
import type { SizeTokens } from 'tamagui'
const { width } = Dimensions.get('window');
const { height } = Dimensions.get('window');
import { RadioButton } from 'react-native-paper';
import * as Progress from "react-native-progress";
import { useToastController } from "@tamagui/toast";
import { ChapterNavigationButton } from "@/components/ChapterNavigateButton";
import { hasEmptyValues } from "@/constants/helper";
import { router, RelativePathString } from "expo-router";
import { useChapterProgressContext } from "@/contexts/AuthContext";
import { getPresurveyActivity, setPresurveyActivity } from "@/hooks/PresurveyActivity";
import { useAuth } from "@/hooks/useAuth";

const Activity5 = () =>{
    const toast = useToastController();
    const { user, pending } = useAuth();

    const [ques16, setQues16] = useState<string>("");
    const [ques17, setQues17] = useState<string>("");
    const [ques18, setQues18] = useState<string>("");
    const [ques19, setQues19] = useState<string>("");
    const [ques20, setQues20] = useState<string>("");
    const [data, setData] = useState<{[key: string]: any}>({});

    const windowWidth = Dimensions.get("window").width;
    const windowHeight = Dimensions.get("window").height;

    const options = ['1', '2', '3', '4', '5']

    const {setPresurveyProgress} = useChapterProgressContext();
    useEffect(() => {
      setPresurveyProgress(5)
    }, [])

    /* useEffect(() => {

        setData((prevData) => ({
            ...prevData, 
            ques16: ques16, 
            ques17: ques17,
            ques18: ques18,
            ques19: ques19,
            ques20: ques20,
          }));

          console.log('data:', data);
    }, [ques16, ques17, ques18, ques19, ques20]); */ // Dependency array, this effect runs when "count" changes

    const updateQuestion = (field: string, value: string) => {
        setData((prev) => {
            const updatedQuestions = { ...prev, [field]: value };
            return updatedQuestions;
        });
      };

    useEffect(() => {
      if (user) {
        console.log('getPresurveyActivity5')
        getPresurveyActivity(user.uid, "Activity5")
          .then((snapshot) => {
            if (snapshot.exists()) {
              const answer = snapshot.data();
              for (const [key, value] of Object.entries(answer)) {
                updateQuestion(key as string, value as string);
                console.log(key, value)
              }
            }
            else {
              //console.log('setting data here');
              setData((prevData) => ({
                ...prevData, 
                ques16: "", 
                ques17: "",
                ques18: "",
                ques19: "",
                ques20: "",
              }));
            }
          })
          .catch((err) => console.log("Error get presurvey activity5:", err));
      }
    }, [pending]);

    return (
        <YStack margin={"$4"} gap={"$4"}>
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
                16. If an assignment is due at midnight, I will work on it until 11:59.
            </Text>

            <View>
                <View style={{...styles.radioGroup}}>
                    {options.map((option, index) => (
                    <View style={styles.radioButton}>
                        <RadioButton.Android
                        key={option}
                        value={option}
                        status={data?.ques16 === option ? 'checked' : 'unchecked'}
                        onPress={() => updateQuestion("ques16", option)} // Set the selected gender
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
                17. When given an assignment, I usually put it away and forget about it until it is almost due.
            </Text>

            <View>
                    <View style={{...styles.radioGroup}}>
                        {options.map((option, index) => (
                        <View style={styles.radioButton}>
                            <RadioButton.Android
                            key={option}
                            value={option}
                            status={data?.ques17 === option ? 'checked' : 'unchecked'}
                            onPress={() => updateQuestion("ques17", option)} // Set the selected gender
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
                18. Friends usually distract me from schoolwork.
            </Text>

            <View>
                    <View style={{...styles.radioGroup}}>
                        {options.map((option, index) => (
                        <View style={styles.radioButton}>
                            <RadioButton.Android
                            key={option}
                            value={option}
                            status={data?.ques18 === option ? 'checked' : 'unchecked'}
                            onPress={() => updateQuestion("ques18", option)} // Set the selected gender
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
                19. I find myself talking to friends or family instead of working on school work.
            </Text>

            <View>
                    <View style={{...styles.radioGroup}}>
                        {options.map((option, index) => (
                        <View style={styles.radioButton}>
                            <RadioButton.Android
                            key={option}
                            value={option}
                            status={data?.ques19 === option ? 'checked' : 'unchecked'}
                            onPress={() => updateQuestion("ques19", option)} // Set the selected gender
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
                20. On the weekends, I make plans to do homework and projects, but I get distracted and hang out with friends.
            </Text>

            <View>
                    <View style={{...styles.radioGroup}}>
                        {options.map((option, index) => (
                        <View style={styles.radioButton}>
                            <RadioButton.Android
                            key={option}
                            value={option}
                            status={data?.ques20 === option ? 'checked' : 'unchecked'}
                            onPress={() => updateQuestion("ques20", option)} // Set the selected gender
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
            prev={"/(app)/presurvey/content/activity4"}
            next={() => {if (hasEmptyValues(data)) {
                toast.show("Empty Input");
            } else {
                setPresurveyActivity(user!.uid, data, "Activity5");
                router.push("/(app)/presurvey/content/activity6" as RelativePathString);
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

export default Activity5;