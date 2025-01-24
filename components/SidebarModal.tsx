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

const { width } = Dimensions.get("window");

const SidebarModal: React.FC<{ visible: boolean; onClose: () => void }> = ({
  visible,
  onClose,
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
    const tempPart3 = {
        "Opening": true,
        "Label the Passengers on the Bus": false,
        "Identify how it feels in your body": true,
        "Learn How to Meditate": false,
        "Make a Belief Statement": true,
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

    const navigation = useNavigation(); // Access navigation object

    const handleNavigate = (screenName: string) => {
        onClose(); // Close the modal
        //navigation.navigate(screenName); // Navigate to the desired screen
    };

    const [part1Progress, setPart1Progress] = useState(tempPart1); //load in from context
    const [part2Progress, setPart2Progress] = useState(tempPart2); //load in from context
    const [part3Progress, setPart3Progress] = useState(tempPart3); //load in from context
    const [part4Progress, setPart4Progress] = useState({}); //load in from context

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
                        <Pressable key={key} style={styles.subTitleContainer}>
                            <View style={{width: 25}}>
                                {value ?
                                    <Ionicons name="checkmark" size={20} color="black" />
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

                    <Text style={{...styles.chapTitle, marginTop: '5%'}}>
                        Part 2: Understanding
                    </Text>

                    {Object.entries(part2Progress).map(([key, value]) => (
                        <Pressable key={key} style={styles.subTitleContainer}>
                            <View style={{width: 25}}>
                                {value ?
                                    <Ionicons name="checkmark" size={20} color="black" />
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

                    <Text style={{...styles.chapTitle, marginTop: '5%'}}>
                        Part 3: Practice
                    </Text>

                    {Object.entries(part3Progress).map(([key, value]) => (
                        <Pressable key={key} style={styles.subTitleContainer}>
                            <View style={{width: 25}}>
                                {value ?
                                    <Ionicons name="checkmark" size={20} color="black" />
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

                    <Text style={{...styles.chapTitle, marginTop: '5%'}}>
                        Part 4: Determination
                    </Text>

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
    width: width * 0.75, // Covers 75% of the screen width
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
        marginTop: '3%'
    }
});

export default SidebarModal;