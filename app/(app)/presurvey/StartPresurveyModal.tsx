import React, { useEffect, useState } from 'react';
import {
  Modal,
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  TouchableWithoutFeedback,
  Pressable,
  ScrollView
} from 'react-native';

interface StartPresurveyModalProps {
  isVisible: boolean;
  onClose: () => void;
  setStartPresurvey: (data: boolean) => void;
}

const StartPresurveyModal: React.FC<StartPresurveyModalProps> = ({ isVisible, onClose, setStartPresurvey}) => {
    const handleOnClose = () => {
        onClose();
    }
    const handleStart = () => {
        setStartPresurvey(true);
        onClose();
    }

  return (
    <Modal
      transparent={true}
      visible={isVisible}
      animationType="fade"
      onRequestClose={handleOnClose}
    >
      <TouchableWithoutFeedback onPress={handleOnClose} accessible={false}>
        <View style={styles.overlay}>
          <TouchableWithoutFeedback>
            <View style={styles.modal}>
              <Text style={styles.modalText}>ClearMind Pre-Survey</Text>
                <ScrollView style={styles.innerBox}
                  >
                    <Text style={styles.innerText}>
                        Welcome to ClearMind!
                    </Text>
                    <Text style={styles.innerText}>
                        You are going to learn new ways of managing procrastination through the app. 
                        Before, we would like you to mark your starting point with a short survey.
                        You will check your improvement once you complete the app.
                    </Text>
                    <Text style={styles.innerText}>
                        The survey will take approximately 10 minutes to complete.
                    </Text>

                </ScrollView>
                <Pressable style={styles.closeButton} onPress={handleStart}> {/* on press should say we should push the route */}
                    <Text style={styles.closeButtonText}>START</Text>
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
    height: '40%',
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
    fontSize: 18,
    marginBottom: 20,
    textAlign: 'center',
    fontWeight: 'bold'
  },
  closeButton: {
    backgroundColor: '#D3D3D3',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 8,
    width: 200,
    alignSelf: 'center',
    alignContent: 'center',
    justifyContent: 'center'
  },
  closeButtonText: {
    color: 'black',
    fontSize: 16,
    fontWeight: '600',
    textAlign: 'center'
  },
  innerBox: {
    alignSelf: 'center',
    backgroundColor: "#FFFFC5",
    marginBottom: '5%',
    borderRadius: 10,
    padding: '5%',
  },
  innerText: {
    fontSize: 16,
    marginBottom: '3%'
  }
});

export default StartPresurveyModal;