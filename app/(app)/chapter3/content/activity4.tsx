import React, { useState, useEffect} from "react";
import { View, Image, SafeAreaView, ScrollView, Dimensions, StyleSheet, Text,Pressable, TextInput } from "react-native";
import { Label, RadioGroup, XStack, YStack } from 'tamagui'
import type { SizeTokens } from 'tamagui'
const { width } = Dimensions.get('window');
const { height } = Dimensions.get('window');
import { RadioButton } from 'react-native-paper';
import * as Progress from "react-native-progress";
import { ChapterNavigationButton } from "@/components/ChapterNavigateButton";
import { RelativePathString, router } from "expo-router";
import { useChapterProgressContext } from "@/contexts/AuthContext";
import { useAuth } from "@/hooks/useAuth";
import { updateChapter3Progress } from "@/hooks/Chapter3Activity";
//import { useChapterProgressContext } from "@/contexts/AuthContext";


const Activity4 = () => {
    const { user, pending } = useAuth();
    const {updateChapterProgress, setCurrPage} = useChapterProgressContext();

    useEffect(() => {
        setCurrPage('activity4');
    }, [])

    return (
        <YStack margin={"$4"} gap={"$4"}>
            <View style={{width: '100%',}}>
                <Text style={{fontSize: 18,}}>
                    When you're calmed down, write a short and simple belief statement addressing the 
                    challenging thoughts and emotions you observed earlier. For example, if stress is 
                    from difficult schoolwork, your belief statement could be "I'm developing strategies 
                    to manage stress and avoid procrastination" or "I can master challenging emotions by 
                    staying focused on my goals."
                </Text>
                <Image source={require('@/assets/images/img_believe.png')} style={{width: '100%', height: 200, marginVertical: '5%'}}/>
                <Text style={styles.textBox}>
                You can use your belief statement like a lighthouse during tough times. 
                You can also connect your belief statement with your breathing, making 
                it a part of your new, positive mindset with each breath. For instance,
                when you breathe in, think, "I am not defined by my challenges," and 
                when you breathe out, think, "I am learning new ways to improve."
                </Text>
            </View>

            <ChapterNavigationButton
                prev={"/(app)/chapter3/content/activity3"}
                next={() => {
                    updateChapterProgress("chapter3", "activity4");
                    updateChapter3Progress(user!.uid, "4_activity4");
                    router.push("/(app)/chapter3/content/activity5" as RelativePathString);
                }}
            />

        </YStack>
    );
  }
  
  const styles = StyleSheet.create({
    textBox: {
        marginTop: '5%',
        fontSize: 18,
    }
  });

  export default Activity4;