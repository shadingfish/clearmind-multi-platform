import React, { useState, useEffect} from "react";
import { View, Image, SafeAreaView, ScrollView, Dimensions, StyleSheet, Text,Pressable, TextInput } from "react-native";
import { Label, RadioGroup, XStack, YStack } from 'tamagui'
import type { SizeTokens } from 'tamagui'
const { width } = Dimensions.get('window');
const { height } = Dimensions.get('window');
import { RadioButton } from 'react-native-paper';
import * as Progress from "react-native-progress";
import { useRouter } from "expo-router";
import { useChapterProgressContext } from "@/contexts/AuthContext";
import { ChapterNavigationButton } from "@/components/ChapterNavigateButton";

const Activity1 = () => {

    const router = useRouter();

    //~~~JUST COPY PASTE THIS INTO EACH ACTIVITY AND CHANGE THE CHAPTER AND TITLE ACCORDINGLY~~~
    const { updateChapterProgress } = useChapterProgressContext();

    useEffect(() => {
        updateChapterProgress("chapter4", "activity1");
    }, []);
    //~~~END COPY PASTA~~~

    return (
        <YStack margin={"$4"} gap={"$4"}>
            <View style={{width: '90%', margin: '5%', }}>
                <Text style={{fontSize: 18,}}>
                    While goal-setting is an essential strategy for addressing procrastination tendencies, 
                    science says it's not enough! When the process of goal-setting is combined with 
                    personal values, it is the most effective.
                </Text>
                <Text style={styles.textBox}>
                    Thus, this part presents a fresh framework incorporating two 
                    essential components: goal setting and Acceptance and Commitment 
                    Therapy (ACT). These two elements work together. We'll begin with 
                    looking at the STAR framework for setting goals, then we'll explain 
                    how Acceptance and Commitment Therapy is also a crucial part of the process.
                </Text>

                <ChapterNavigationButton
                    prev={"/(app)/chapter4/content/opening"}
                    next={() => {
                    router.push("/(app)/chapter4/content/activity2");
                    }}
                />
            </View>
        </YStack>
    );
  }
  
  const styles = StyleSheet.create({
    textBox: {
        marginTop: '5%',
        fontSize: 18,
        marginBottom: '5%'
    }
  });

  export default Activity1;