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
import { getPostsurveyActivity, setPostsurveyActivity } from "@/hooks/PresurveyActivity";
import { useAuth } from "@/hooks/useAuth";

const Activity7 = () =>{
    const toast = useToastController();
    const { user, pending } = useAuth();
    const [ques26, setQues26] = useState<string>("");
    const [ques27, setQues27] = useState<string>("");
    const [ques28, setQues28] = useState<string>("");
    const [ques29, setQues29] = useState<string>("");
    const [ques30, setQues30] = useState<string>("");
    const [ques31, setQues31] = useState<string>("");
    const [data, setData] = useState<{[key: string]: any}>({});

    const windowWidth = Dimensions.get("window").width;
    const windowHeight = Dimensions.get("window").height;

    const options = ['1', '2', '3', '4']

    const {setPostsurveyProgress} = useChapterProgressContext();
    useEffect(() => {
        setPostsurveyProgress(7)
    }, [])

    /* useEffect(() => {

        setData((prevData) => ({
            ...prevData, 
            ques26: ques26, 
            ques27: ques27,
            ques28: ques28,
            ques29: ques29,
            ques30: ques30,
            ques31: ques31,
          }));
    
          console.log('data:', data);
    }, [ques26, ques27, ques28, ques29, ques30, ques31]); */

    const updateQuestion = (field: string, value: string) => {
        setData((prev) => {
            const updatedQuestions = { ...prev, [field]: value };
            return updatedQuestions;
        });
      };

    useEffect(() => {
      if (user) {
        console.log('getPostsurveyActivity7')
        getPostsurveyActivity(user.uid, "Activity7")
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
                ques26: "", 
                ques27: "",
                ques28: "",
                ques29: "",
                ques30: "",
                ques31: "",
              }));
            }
          })
          .catch((err) => console.log("Error get postsurvey activity7:", err));
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
                        status={data?.ques26 === option ? 'checked' : 'unchecked'}
                        onPress={() => updateQuestion("ques26", option)} // Set the selected gender
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
                            status={data?.ques27 === option ? 'checked' : 'unchecked'}
                            onPress={() => updateQuestion("ques27", option)} // Set the selected gender
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
                            status={data?.ques28 === option ? 'checked' : 'unchecked'}
                            onPress={() => updateQuestion("ques28", option)} // Set the selected gender
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
                            status={data?.ques29 === option ? 'checked' : 'unchecked'}
                            onPress={() => updateQuestion("ques29", option)} // Set the selected gender
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
                        status={data?.ques30 === option ? 'checked' : 'unchecked'}
                        onPress={() => updateQuestion("ques30", option)} // Set the selected gender
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
                        status={data?.ques31 === option ? 'checked' : 'unchecked'}
                        onPress={() => updateQuestion("ques31", option)} // Set the selected gender
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
            prev={"/(app)/postsurvey/content/activity6"}
            next={() => {if (hasEmptyValues(data)) {
                toast.show("Empty Input");
            } else {
                setPostsurveyActivity(user!.uid, data, "Activity7");
                router.push("/(app)/postsurvey/content/activity8" as RelativePathString);
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

export default Activity7;