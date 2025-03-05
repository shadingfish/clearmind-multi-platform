import React, { useState, useEffect} from "react";
import { View, Image, SafeAreaView, ScrollView, Dimensions, StyleSheet, Text,Pressable, TextInput } from "react-native";
import { Label, RadioGroup, XStack, YStack } from 'tamagui'
import type { SizeTokens } from 'tamagui'
const { width } = Dimensions.get('window');
const { height } = Dimensions.get('window');
import { RadioButton } from 'react-native-paper';
import * as Progress from "react-native-progress";
import Page14 from "@/components/PreSurvey/Page14";
import { useToastController } from "@tamagui/toast";
import { ChapterNavigationButton } from "@/components/ChapterNavigateButton";
import { hasEmptyValues } from "@/constants/helper";
import { router, RelativePathString } from "expo-router";
import { useChapterProgressContext } from "@/contexts/AuthContext";
import { getPostsurveyActivity, setPostsurveyActivity } from "@/hooks/PresurveyActivity";
import { useAuth } from "@/hooks/useAuth";

const Activity14 = () =>{
    const toast = useToastController();
    const { user, pending } = useAuth();
    const [ques62, setQues62] = useState<string>("");
    const [ques63, setQues63] = useState<string>("");
    const [ques64, setQues64] = useState<string>("");
    const [data, setData] = useState<{[key: string]: any}>({});

    const windowWidth = Dimensions.get("window").width;
    const windowHeight = Dimensions.get("window").height;

    const options = ['1', '2', '3', '4']

    const {setPostsurveyProgress} = useChapterProgressContext();
    useEffect(() => {
        setPostsurveyProgress(14)
    }, [])

    /* useEffect(() => {

        setData((prevData) => ({
            ...prevData, 
            ques62: ques62, 
            ques63: ques63,
            ques64: ques64,
          }));
    
          console.log('data:', data);
    }, [ques62, ques63, ques64]);  */

    const updateQuestion = (field: string, value: string) => {
        setData((prev) => {
            const updatedQuestions = { ...prev, [field]: value };
            return updatedQuestions;
        });
      };

    useEffect(() => {
      if (user) {
        console.log('getPostsurveyActivity14')
        getPostsurveyActivity(user.uid, "Activity14")
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
                ques62: "", 
                ques63: "",
                ques64: "",
              }));
            }
          })
          .catch((err) => console.log("Error get postsurvey activity14:", err));
      }
    }, [pending]);

    return (
        <YStack margin={"$4"} gap={"$4"}>
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
                62. I've been blaming myself for things that happened.
            </Text>

            <View>
                <View style={{...styles.radioGroup}}>
                    {options.map((option, index) => (
                    <View style={styles.radioButton}>
                        <RadioButton.Android
                        key={option}
                        value={option}
                        status={data?.ques62 === option ? 'checked' : 'unchecked'}
                        onPress={() => updateQuestion("ques62", option)} // Set the selected gender
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
                63. I've been praying or meditating.
            </Text>

            <View>
                    <View style={{...styles.radioGroup}}>
                        {options.map((option, index) => (
                        <View style={styles.radioButton}>
                            <RadioButton.Android
                            key={option}
                            value={option}
                            status={data?.ques63 === option ? 'checked' : 'unchecked'}
                            onPress={() => updateQuestion("ques63", option)} // Set the selected gender
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
                64. I've been making fun of the situation.
            </Text>

            <View>
                    <View style={{...styles.radioGroup}}>
                        {options.map((option, index) => (
                        <View style={styles.radioButton}>
                            <RadioButton.Android
                            key={option}
                            value={option}
                            status={data?.ques64 === option ? 'checked' : 'unchecked'}
                            onPress={() => updateQuestion("ques64", option)} // Set the selected gender
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
            prev={"/(app)/postsurvey/content/activity13"}
            next={() => {if (hasEmptyValues(data)) {
                toast.show("Empty Input");
            } else {
                setPostsurveyActivity(user!.uid, data, "Activity14");
                router.push("/(app)" as RelativePathString);
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

export default Activity14;