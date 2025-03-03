// CogDistortModal.tsx
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

type Activity6Questions = {
  whichCogDistPaths: Set<string>;
  hasCogDist: {[key: string]: boolean};
};

interface CogDistortModalProps {
  isVisible: boolean;
  onClose: () => void;
  title: string;
  setQuestions: React.Dispatch<React.SetStateAction<Activity6Questions>>;
}

const CogDistortModal: React.FC<CogDistortModalProps> = ({ isVisible, onClose, title, setQuestions }) => {
    const label2description: Record<string, string> = {
        "Mental Filtering": "Viewing the world through a negative lens. It involves focusing solely on the negative aspects while entirely disregarding the positive things in one's life.",
        "All-or-nothing thinking": "Polarized thinking. All good (or all bad), all right (or all wrong), everything (or nothing), success (or failure), nothing in between. This distortion can result in unrealistic standards for yourself and others.",
        "Overgeneralization": "Forming a rule or drawing a conclusion based on a single event or a lone piece of negative evidence. Words like \"always\", \"never\", \"forever\", often dominate their thinking. Overgeneralization can lead to an exaggerated belief that all similar future events will result in the same failure or negative experience.",
        "Discounting the positive": "Not fully accepting or believing the good things that have happened to you. Similar to mental filtering; however, in discounting the positive, these good things are actively invalidated or rejected instead of simply being ignored.",
        "Jumping to Conclusions": "Mind reading: Presuming that you have the ability to read others' minds and understand their thoughts. It involves anticipating a specific reaction from someone or attributing thoughts to them that may not be their actual thinking.\n \nFortune telling: Making predictions about how events will unfold in a specific way, based on little or no evidence. Usually a way to avoid facing challenging situations or tasks.",
        "Magnification": "Making your problems and flaws seem much bigger and more important than they really are. It can cause worries to grow rapidly and imagine the worst possible outcomes. Magnification tends to happen when there are uncertainties beyond a person's control.",
        "Emotional Reasoning": "Evaluating yourself or a situation based on emotions at the moment.",
        '"Should" Statements': "Imposing unrealistic expectations about how things or people should be. It can lead to self-criticism, anxiety, and depression instead of approaching situations with flexibility.",
        "Labeling": "Label about oneself or others based on an undesirable event or a few isolated incidents.",
        "Personalization and Blame": "Attributing responsibility to yourself for situations unrelated to your actions or beyond your control. It can lead to self-blame and self-criticism even when you are not responsible.",
    }
    
    // put Example: before
    const label2example: Record<string, string> = {
        "Mental Filtering": "Your colleagues praised your great ideas and clear explanations in a work presentation, but one person had a small suggestion for improving your slides. Instead of focusing on the positive feedback, you felt like the whole presentation was a failure because of that one critique.",
        "All-or-nothing thinking": "Jack set a fitness goal of exercising three times a week. However, in the final week, he was busy at school and couldn't make it to the gym at all. This led him to perceive his entire fitness journey as a failure and gave up on both his fitness goals and routines.",
        "Overgeneralization": "Annie accidentally scratched her car twice while parking on separate occasions. Her parents, based on these incidents, concluded that she was a terrible driver who would continue to damage her car in the future.",
        "Discounting the positive": "Stella did exceptionally well on her Physics class and received top grades consistently. However, she consistently downplays her accomplishments, believing that her success is solely due to easy tests or luck, instead of her hard work.",
        "Jumping to Conclusions": "Justin texted his girlfriend, but she didn't reply immediately. Justin assumed she was upset and wanted to break up, but in reality, she was busy with work and had many meetings. \n \nExample: Sara has a job interview soon, but she's convinced she'll do badly and won't get the job. She's worrying excessively, assuming her future is ruined, even though the interview hasn't happened yet. ",
        "Magnification": "After a minor disagreement with a friend, you started believing that you had damaged your friendship irreparably. You worried that your friend now hated you and feared that no one else would ever want to be friends with you.",
        "Emotional Reasoning": "Lisa wakes up feeling anxious and worried about an upcoming presentation at work. She thinks to herself, \"I feel so anxious; I must be terrible at public speaking.\"",
        "\"Should\" Statements": "You believe that a person in a leadership role should always make decisions quickly and confidently, never showing any uncertainty or seeking input from others.",
        "Labeling": "You notice your new teammate eating pizza after school, and you immediately label them as \"unhealthy\" based solely on their food choice.",
        "Personalization and Blame": "Your friend gets into a minor car accident, and you immediately blame yourself for having recommended the route he took.",
    }

    const problem2technique: Record<string, string> = {
        "Mental Filtering": "Journaling is a helpful way to overcome mental filtering. By keeping a diary and writing down your thoughts and emotions about life events, you can shift your focus from the negatives to actively seeking out neutral or positive aspects of a situation.",
        "All-or-nothing thinking": "To overcome All-or-nothing thinking, recognize that success and progress aren't all-or-nothing. Address this mindset by substituting self-defeating thoughts, becoming more aware of your strengths, and focusing on progress rather than outcomes.",
        "Overgeneralization": "To counter overgeneralization, it's helpful to use more realistic language with a positive tone. Instead of saying, \"I always do that!\" you can say something like, \"That happens occasionally, but I'm committed to improving in the future.\"",
        "Discounting the positive": "To conquer this cognitive distortion, try changing how you explain events. Instead of dismissing positive results as luck, pay more attention to how your strengths, abilities, and hard work played a role in achieving them.",
        "Jumping to Conclusions": "To conquer this cognitive distortion, you can follow the following steps:\n\n  1. Check the facts: Gather as much information as possible before making judgments or decisions. \n\n  2. Challenge your thoughts: Actively question your assumptions and explore alternative explanations. \n\n  3. Communication: Instead of assuming what others think, communicate your concerns and seek direct answers to avoid confusion or misunderstanding. \n\n  4. Try an alternative viewpoint: View the situation from an outsider's standpoint, considering the information needed for a more accurate understanding.",
        "Magnification": "To overcome magnification, you can work on recognizing these exaggerated thoughts and deliberately replacing them with more constructive and positive thinking patterns.",
        "Emotional Reasoning": "You can practice defusion to get distance from your emotions. For example, instead of \"I feel overwhelmed\", you tell yourself, \"I'm aware that I'm feeling overwhelmed.\" This simple shift can promote a more objective and balanced perspective on your emotions.",
        "\"Should\" Statements": "One way to combat this cognitive distortion is to cultivate self-compassion. Swap those unrealistic thoughts with more practical ones and focus on embracing yourself for who you truly are, not who you believe you should be.",
        "Labeling": "To overcome labeling, challenge the validity of your assumptions. Find evidence contradicting your negative thinking, and remember the distinction between personal opinions and objective facts.",
        "Personalization and Blame": "To combat personalization and blame, explore additional factors that could have influenced your situation. Instead of placing all the blame on yourself, consider external circumstances or the actions of others that might have also played a part.",
    }

    const [solPageOn, setSolPageOn] = useState(false);

    const addKeyValue = (key: string, value: boolean) => {

      setQuestions((prev) => {
        const updatedQuestions = { 
            ...prev, 
            hasCogDist: { ...prev.hasCogDist, [key]: value } // Correctly updating hasCogDist
        };

        return updatedQuestions;
      });

    };

    const handleYes = () => {
        addKeyValue(title, true);
        setSolPageOn(true);
    }


    const handleOnClose = () => {
        onClose();
        setSolPageOn(false);
    }

    const handleNo = () => {
        addKeyValue(title, false);
        handleOnClose();
    }

  return (
    <Modal
      transparent={true}
      visible={isVisible}
      animationType="fade"
      onRequestClose={handleOnClose}
    >
      <TouchableWithoutFeedback onPress={handleNo} accessible={false}>
        <View style={styles.overlay}>
          <TouchableWithoutFeedback>
            <View style={styles.modal}>
              <Text style={styles.modalText}>{title}</Text>
                <ScrollView style={styles.innerBox}
                  >
                    { !solPageOn ?
                        <Pressable>
                            <Text style={{padding: '5%', fontSize: 16}}>
                                {label2description[title]}
                            </Text>
                            <Text style={{padding: '5%', fontSize: 16}}>
                                <Text style={{ fontWeight: 'bold' }}>Example: </Text> {label2example[title]}
                            </Text>
                        </Pressable> :
                        <Pressable>
                            <Text style={{padding: '5%', fontSize: 16}}>
                                <Text style={{ fontWeight: 'bold' }}>Solution: </Text> {problem2technique[title]}
                            </Text>
                        </Pressable>
                    }   
                </ScrollView>
                <Text style={{fontSize: 16, textAlign: 'center', marginBottom: '5%'}}>
                    Have you ever experienced this kind of mental filtering?
                </Text>
            { !solPageOn ?
                <View style={{flexDirection: 'row', alignItems: 'center', paddingHorizontal: '5%', justifyContent: 'space-between'}}>
                    <Pressable style={styles.closeButton} onPress={() => handleYes()}>
                        <Text style={styles.closeButtonText}>YES</Text>
                    </Pressable>
                    <Pressable style={styles.closeButton} onPress={handleNo}>
                        <Text style={styles.closeButtonText}>NO</Text>
                    </Pressable>
                </View> :
                <Pressable style={styles.closeButton} onPress={handleOnClose}>
                    <Text style={styles.closeButtonText}>CONFIRM</Text>
                </Pressable>
            }
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
    fontSize: 18,
    marginBottom: 20,
    textAlign: 'center',
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
    marginBottom: '5%',
    borderRadius: 10,
  }
});

export default CogDistortModal;