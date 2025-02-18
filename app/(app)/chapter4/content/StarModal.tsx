// CogDistortModal.tsx
import { useChapter3Context } from '@/contexts/Chapter3Context';
import React, { useEffect, useState } from 'react';
import {
  Modal,
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  TouchableWithoutFeedback,
  Pressable,
  ScrollView,
  ImageSourcePropType,
  Image,
} from 'react-native';

type Activity6Questions = {
  whichCogDistPaths: Set<string>;
  hasCogDist: {[key: string]: boolean};
};

interface CogDistortModalProps {
  isVisible: boolean;
  onClose: () => void;
  title: string;
}

const CogDistortModal: React.FC<CogDistortModalProps> = ({ isVisible, onClose, title }) => {

    const label2description : Record<string, string> = {
        "Specific": 'You need to be specific about your goal because vague goals can make success feel out of reach. Being specific helps you plan effectively and narrow your focus to what truly matters. For example, instead of setting a vague goal like "I want to be fit," a specific goal would be "I want to lose 20 pounds within three months through daily 30-minute exercise sessions and maintaining a balanced diet."',
        "Trackable": "You need a mechanism to track and measure your progress to keep on track and see how you're doing with your goal. Set a reasonable time frame to give you a sense of urgency and motivation. For example, if you want to improve your fitness and plan to run 3 miles twice a week, keep a fitness journal. In the journal, record the date, the distance you run, how long it takes, and how you feel during your run. Over time, this record will show how you're doing and motivate you to stick with your goal.",
        "Achievable": "Pushing your limits while keeping your goals realistically attainable is essential. You should evaluate your available resources and abilities to ensure that your goals align with what you can realistically achieve. It would be beneficial to take your past experiences and other people's experiences with similar goals into account, which helps you to evaluate the feasibility of your goals.",
        "Relevant": "Your goals should be relevant to your life. You want to ensure your goal aligns with your values and long-term ambitions. This alignment between your goals and values is crucial because it provides a profound sense of purpose and motivation. How does this goal connect with your values and the person you're striving to be?"
    }

    const label2image: Record<string, ImageSourcePropType> = {
        Specific: require("@/assets/images/star_s.png"),
        Trackable: require("@/assets/images/star_t.png"),
        Achievable: require("@/assets/images/star_a.png"),
        Relevant: require("@/assets/images/star_r.png"),
      };

  return (
    <Modal
      transparent={true}
      visible={isVisible}
      animationType="fade"
      onRequestClose={onClose}
    >
      <TouchableWithoutFeedback onPress={onClose} accessible={false}>
        <View style={styles.overlay}>
          <TouchableWithoutFeedback>
            <View style={styles.modal}>
                <View style={{flexDirection: 'row', alignItems: 'center', justifyContent: 'center'}}>
                    <Image source={label2image[title]} style={{width: 50, height: 50}}/>
                    <Text style={styles.modalText}>{title}</Text>
                </View>
                <ScrollView style={styles.innerBox}
                  >
                    <Text style={{fontSize: 16, padding: '5%'}}>
                        {label2description[title]}
                    </Text>
                </ScrollView>
                <Pressable style={styles.closeButton} onPress={onClose}>
                    <Text style={styles.closeButtonText}>CONFIRM</Text>
                </Pressable>
            </View>
          </TouchableWithoutFeedback>
        </View>
      </TouchableWithoutFeedback>
    </Modal>
  );
};

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modal: {
    width: '80%',
    height: '60%',
    padding: 20,
    backgroundColor: '#54B363',
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
    justifyContent: 'center',

  },
  modalText: {
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'center',
    marginLeft: '3%'
  },
  closeButton: {
    backgroundColor: '#D3D3D3',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 8,
    alignSelf: 'center',
  },
  closeButtonText: {
    color: 'black',
    fontSize: 16,
    fontWeight: '600',
  },
  innerBox: {
    alignSelf: 'center',
    backgroundColor: "#FFFFC5",
    marginVertical: '5%',
    borderRadius: 10,
  }
});

export default CogDistortModal;