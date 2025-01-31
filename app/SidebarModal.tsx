import React, { useState } from "react";
import {
  Modal,
  StyleSheet,
  View,
  Text,
  TouchableWithoutFeedback,
  Dimensions,
  SafeAreaView,
  ScrollView,
  Pressable,
} from "react-native";
import Ionicons from "@expo/vector-icons/Ionicons";
import { useNavigation } from "@react-navigation/native";
import { RelativePathString, router } from "expo-router";
import { useAuthContext } from "@/contexts/AuthContext";

const { width } = Dimensions.get("window");

const SidebarModal: React.FC<{ visible: boolean; onClose: () => void; chapterName: string }> = ({
  visible,
  onClose,
  chapterName
}) => {

    // this will become context:
    const tempPart1 = {
        "Opening": true,
        "Prioritize Your Life Values": false,
        "Discover Procrastination Reasons": true,
        "Procrastination Tendencies": false,
        "Tendencies Questions": true,
        "How to Use the App": true,
        "Summary": true,
    }
    const tempPart2 = {
        "Opening": true,
        "Your Challenging Emotions": false,
        "Passengers On The Bus": true,
        "Example of Driving the bus": false,
        "Identify your passengers": true,
        "Willingness to Carry On": true,
        "Summary": true,
    }
    const tempPart3: Record<string, boolean> = {
        "Opening": false,
        "Label the Passengers on the Bus": false,
        "Identify how it feels in your body": false,
        "Learn How to Meditate": false,
        "Make a Belief Statement": false,
        "Be Aware of Cognitive Distortions": false,
        "Summary of Cognitive Distortions": false,
        "Reflecting on Cognitive Distortions in Various Procrastination Types": false,
        "Part 3 Summary": false,
    }
    const tempPart4 = {
        "Opening": true,
        "Prioritize Your Life Values": false,
        "Discover Procrastination Reasons": true,
        "Procrastination Tendencies": false,
        "Tendencies Questions": true,
        "How to Use the App": true,
        "Summary": true,
    }

    const chapter2_title2activityNum: Record<string, string> = {
        "Opening": "opening",
        "Your Challenging Emotions": "activity1",
        "Passengers On The Bus": "activity2",
        "Example of Driving the bus": "activity3",
        "Identify your passengers": "activity4",
        "Willingness to Carry On": "activity5",
        "Summary": "summary",
    }

    const chapter3_title2activityNum: Record<string, string> = {
        "Opening": "opening",
        "Label the Passengers on the Bus": "activity1",
        "Identify how it feels in your body": "activity2",
        "Learn How to Meditate": "activity3",
        "Make a Belief Statement": "activity4",
        "Be Aware of Cognitive Distortions": "activity5",
        "Summary of Cognitive Distortions": "activity7",
        "Reflecting on Cognitive Distortions in Various Procrastination Types": "activity8",
        "Part 3 Summary": "summary",
    }

    const { userData, setUserData, currPage } = useAuthContext();
    console.log('userData', userData)

    const [part1Progress, setPart1Progress] = useState(userData["chapter1"]); //load in from context
    const [part2Progress, setPart2Progress] = useState(userData["chapter2"]); //load in from context
    const [part3Progress, setPart3Progress] = useState(userData["chapter3"]); //load in from context
    const [part4Progress, setPart4Progress] = useState(userData["chapter4"]); //load in from context

    const navigateToScreen = (chapterName: string, screenName: string, value: boolean) => {
        if (!value) {
            console.log('not unlocked yet')
            return;
        }
        console.log('we clicked')
        const route = `/(app)/${chapterName}/content/${screenName}`; //we have to 
        router.push(route as RelativePathString);
        onClose();
    };

  return (
    <Modal
      transparent
      visible={visible}
      animationType="none"
      onRequestClose={onClose}
    >
      <TouchableWithoutFeedback onPress={onClose}>
        {/* Shadowed background */}
        <View style={styles.overlay}>
          <TouchableWithoutFeedback>
            {/* Modal content */}
            <SafeAreaView style={styles.modalContainer}>
                <ScrollView style={styles.textContainer}>
                    <Text style={styles.chapTitle}>
                        Part 1: Discovery
                    </Text>
                    {Object.entries(part1Progress).map(([key, value]) => (
                        <Pressable key={key} style={[styles.subTitleContainer, currPage === key && chapterName === "chapter1" && { backgroundColor: '#FFA500' }]}>
                            <View style={{width: 25}}>
                                {value ?
                                    ( currPage != key || chapterName != "chapter1" ?
                                        <Ionicons name="checkmark" size={20} color="black" /> :
                                        <Ionicons name="arrow-forward" size={20} color="black" />
                                    )
                                    :
                                    <Ionicons name="ellipse-outline" size={12} color="grey" style={{marginLeft: 3}}/>
                                }
                            </View>
                            { value ?
                                <Text style={{fontSize: 16}}>{key}</Text> 
                            
                                :
                                <Text style={{fontSize: 16, color: "grey"}}>{key}</Text>
                            }
                        </Pressable>
                    ))}

                    <Text style={{...styles.chapTitle, marginTop: '5%'}}>
                        Part 2: Understanding
                    </Text>

                    {Object.entries(part2Progress).map(([key, value]) => (
                        <Pressable key={key} style={[styles.subTitleContainer, currPage === key && chapterName === "chapter2" && { backgroundColor: '#FFA500' }]} onPress={() => navigateToScreen("chapter2", chapter2_title2activityNum[key], value)}>
                            <View style={{width: 25}}>
                                {value ?
                                    ( currPage != key || chapterName != "chapter2" ?
                                        <Ionicons name="checkmark" size={20} color="black" /> :
                                        <Ionicons name="arrow-forward" size={20} color="black" />
                                    )
                                    :
                                    <Ionicons name="ellipse-outline" size={12} color="grey" style={{marginLeft: 3}}/>
                                }
                            </View>
                            { value ?
                                ( currPage != key || chapterName != "chapter2" ?
                                    <Text style={{fontSize: 16}}>{key}</Text> :
                                    <Text style={{fontSize: 16, fontWeight: "bold"}}>{key}</Text>
                                )
                                :
                                <Text style={{fontSize: 16, color: "grey"}}>{key}</Text>
                            }
                        </Pressable>
                    ))}

                    <Text style={{...styles.chapTitle, marginTop: '5%'}}>
                        Part 3: Practice
                    </Text>

                    {Object.entries(part3Progress).map(([key, value]) => (
                        <Pressable key={key} style={[styles.subTitleContainer, currPage === key && chapterName === "chapter3" && { backgroundColor: '#FFA500' }]} onPress={() => navigateToScreen("chapter3", chapter3_title2activityNum[key], value)}>
                            <View style={{width: 25}}>
                                {value ?
                                    ( currPage != key || chapterName != "chapter3" ?
                                        <Ionicons name="checkmark" size={20} color="black" /> :
                                        <Ionicons name="arrow-forward" size={20} color="black" />
                                    )
                                    :
                                    <Ionicons name="ellipse-outline" size={12} color="grey" style={{marginLeft: 3}}/>
                                }
                            </View>
                            { value ?
                                ( currPage != key || chapterName != "chapter3" ?
                                    <Text style={{fontSize: 16}}>{key}</Text> :
                                    <View>
                                        <Text style={{fontSize: 16, fontWeight: "bold"}}>{key}</Text>
                                    </View>
                                ) :
                                <Text style={{fontSize: 16, color: "grey"}}>{key}</Text>
                            }
                        </Pressable>
                    ))}

                    <Text style={{...styles.chapTitle, marginTop: '5%'}}>
                        Part 4: Determination
                    </Text>

                    {Object.entries(part4Progress).map(([key, value]) => (
                        <Pressable key={key} style={styles.subTitleContainer}>
                            <View style={{width: 25}}>
                                {value ?
                                    ( currPage != key || chapterName != "chapter4" ?
                                        <Ionicons name="checkmark" size={20} color="black" /> :
                                        <Ionicons name="arrow-forward" size={20} color="black" />
                                    )
                                    :
                                    <Ionicons name="ellipse-outline" size={12} color="grey" style={{marginLeft: 3}}/>
                                }
                            </View>
                            { value ?
                                <Text style={{fontSize: 16}}>{key}</Text> :
                                <Text style={{fontSize: 16, color: "grey"}}>{key}</Text>
                            }
                        </Pressable>
                    ))}

                </ScrollView>
            </SafeAreaView>
          </TouchableWithoutFeedback>
        </View>
      </TouchableWithoutFeedback>
    </Modal>
  );
};

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.5)", // Shadowed background
  },
  modalContainer: {
    position: "absolute",
    top: 0,
    bottom: 0,
    right: 0,
    width: width * 0.70, // Covers 75% of the screen width
    backgroundColor: "white",
    flex: 1,
  },
  textContainer: {
    margin: '5%',
  },
  chapTitle: {
    fontSize: 20,
    fontWeight: "bold"
  },
  statusText: {
    width: 80, // Set a fixed width for consistent alignment
    textAlign: 'left', // Ensure left alignment
    },
    keyText: {
        flex: 1, // Take remaining space
        textAlign: 'left', // Ensure left alignment
    },
    subTitleContainer: {
        flexDirection: 'row', 
        alignItems: 'center', 
        marginTop: '3%',
        borderRadius: 5,
        padding: '0.5%',
        //width: '97%'
    }
});

export default SidebarModal;