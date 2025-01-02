import React, { useState, useEffect} from "react";
import { View, Image, SafeAreaView, ScrollView, Dimensions, StyleSheet, Text,Pressable, TextInput } from "react-native";
import { Label, RadioGroup, XStack, YStack } from 'tamagui'
import type { SizeTokens } from 'tamagui'
const { width } = Dimensions.get('window');
const { height } = Dimensions.get('window');
import { RadioButton } from 'react-native-paper';

export default function Page1() {
    const [age, setAge] = useState("");
    const [major, setMajor] = useState("");

    const [gender, setGender] = useState("");
    const [selectedValue, setSelectedValue] = useState('option1');


    return (

        <View></View>
    )

    };