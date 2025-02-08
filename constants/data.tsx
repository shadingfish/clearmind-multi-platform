export type ChapterProgress = {
  [keyof: string]: string;
};

export const Chapter2 = {
  RadioQuestion: [
    {
      question:
        "1. You have a challenging assignment that is due tomorrow, you should:",
      option1: "Put off studying and constantly check social media",
      option2: "Complete the assignment regardless of what your minds say",
      correctOption: "second",
      correctText:
        "You got it! Complete the assignment regardless of what your minds say is an example of driving with your passengers. You don’t let your passengers control your journey.",
      incorrectText:
        "Not quite right! You are letting your challenging passengers control your journey, and you can't make progress towards your destination if you follow what your passengers want you to do. ",
    },
    {
      question:
        "2. You find yourself at a crossroad, considering a significant change in your life: going to your dream college in a new city and you feel uncertain and fearful that you will be all on your own there. You should:",
      option1: "Embrace the uncertainty and fear and go to your dream school",
      option2: "Decline the offer letter and go to a local college",
      correctOption: "first",
      correctText:
        "You got it! Embracing the uncertainty and fear and going to your dream school is an example of driving with your passengers. You don’t let your passengers impede your goals.",
      incorrectText:
        "Not quite right! You are letting your challenging passengers control your journey, and you can't make progress towards your destination if you follow what your passengers want you to do.",
    },
    {
      question:
        "3. You failed a course that was required for your major and you have to retake it. You’ve been depressed recently. You should:",
      option1: "Ignore and suppress these emotions",
      option2:
        "Allow yourself to feel sad but open to seek support from friends and family",
      correctOption: "second",
      correctText:
        "You got it! Allowing yourself to feel sad but open to seek support from friends and family is an example of driving with your passengers toward your academic goal. You should allow the challenging passengers on the bus, but don't let them impede your progress.",
      incorrectText:
        "Not quite right! Ignoring and suppressing your emotions is like throwing your passengers off the bus. You are letting your challenging passengers control the journey, and you can't make progress toward your destination if you follow what your passengers want you to do.",
    },
    {
      question:
        "4. You've always wanted to learn to play the guitar since you were young. However, once you started taking lessons, you realized it was more time-consuming and complicated than you thought. You should:",
      option1: "Give up on playing guitar",
      option2:
        "Embrace the learning process and don’t solely focus on the end result",
      correctOption: "second",
      correctText:
        "You got it! Embracing the learning process and not solely focusing on the end result is an example of driving with your passengers. Allow the challenging passengers on the bus, but don't let them impede your goals.",
      incorrectText:
        "Not quite right! Giving up on playing guitar halfway is like letting your challenging passengers control your journey, hindering progress toward your destination.",
    },
    {
      question:
        "5. Your doctor has advised you to lose weight and followed a healthier diet, but one day you find yourself craving junk food. You should:",
      option1:
        "Practice mindful eating and ask yourself if you're really hungry",
      option2: "Eat whatever you want and commit to the diet next time",
      correctOption: "first",
      correctText:
        "Well done! Practicing mindful eating and questioning whether you're truly hungry is an example of driving with your passengers. You allow them on the bus but don’t let them steer you away from your goals.",
      incorrectText:
        "Not quite right! Eating whatever you want and committing to the diet later is an example of doing what your passengers told you to do. If you let them take control, you won’t make progress toward your destination.",
    },
  ],
  SummaryQuestionData: [
    {
      text: "1. How could regular practice of the “Passengers on the Bus“ exercise improve your emotional well-being and help overcome procrastination urges? ",
      placeholder: "Input your answer for question1",
      id: "question1",
      useRadio: false,
    },
    {
      text: "2. How can the “Passengers on the Bus” exercise help you reframe your mindset toward your values/goals? ",
      placeholder: "Input your answer for question2",
      id: "question2",
      useRadio: false,
    },
    {
      text: "3. What new insights have you gained about the relationship between your values/goals and procrastination tendencies?",
      placeholder: "Input your answer for question3",
      id: "question3",
      useRadio: false,
    },
    {
      text: "4. Rate the effectiveness of this chapter in managing your procrastination on a scale of 1 to 5, where 1 is “not effective” and 5 is “extremely effective.“",
      placeholder: "Input your answer for question1",
      id: "question4",
      useRadio: true,
    },
  ],
  Activity: [
    {
      name: "OPENING",
      icon: require("assets/images/icon_opening.png"),
      icon_done: require("assets/images/icon_opening_done.png"),
      progress_index: "1_Opening",
      route: "/(app)/chapter2/content/opening",
    },
    {
      name: "YOUR CHALLENGING EMOTIONS",
      icon: require("assets/images/icon_practice.png"),
      icon_done: require("assets/images/icon_practice_done.png"),
      progress_index: "2_Activity2_1",
      route: "/(app)/chapter2/content/activity1",
    },
    {
      name: "PASSENGERS ON THE BUS",
      icon: require("assets/images/icon_text.png"),
      icon_done: require("assets/images/icon_text_done.png"),
      progress_index: "3_Passengers_On_The_Bus",
      route: "/(app)/chapter2/content/activity2",
    },
    {
      name: "EXAMPLE OF DRIVING THE BUS",
      icon: require("assets/images/icon_practice.png"),
      icon_done: require("assets/images/icon_practice_done.png"),
      progress_index: "4_Example",
      route: "/(app)/chapter2/content/activity3",
    },
    {
      name: "IDENTIFY YOUR PASSENGERS",
      icon: require("assets/images/icon_diagram.png"),
      icon_done: require("assets/images/icon_diagram_done.png"),
      progress_index: "6_Diagram",
      route: "/(app)/chapter2/content/activity4",
    },
    {
      name: "WILLINGNESS TO CARRY ON",
      icon: require("assets/images/icon_practice.png"),
      icon_done: require("assets/images/icon_practice_done.png"),
      progress_index: "7_Willingness_to_Carry_On",
      route: "/(app)/chapter2/content/activity5",
    },
    {
      name: "SUMMARY",
      icon: require("assets/images/icon_summary.png"),
      icon_done: require("assets/images/icon_summary_done.png"),
      progress_index: "8_Summary",
      route: "/(app)/chapter2/content/summary",
    },
  ],
  EmptyProgress: {
    "1_Opening": "0",
    "2_Activity2_1": "0",
    "3_Passengers_On_The_Bus": "0",
    "4_Example": "0",
    "5_Identify_your_passengers": "0",
    "6_Diagram": "0",
    "7_Willingness_to_Carry_On": "0",
    "8_Summary": "0",
  },
};
