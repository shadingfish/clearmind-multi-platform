/* 
export const chapter2activity2title: Record<string, Record<string, string>> = {
    "chapter1": {
        "1_Opening": "Opening",
        "2_Activity1_0": "Prioritize Your Life Values",
        "2_Activity1_1": "Discover Procrastination Reasons",
        "3_Activity1_2_Discover": "Procrastination Tendencies",
        "4_Activity1_2_Questions": "Tendencies Questions",
        "5_Time_Management": "Willingness to Carry On",
        "6_Summary": "Summary"
    },
    "chapter2": {
        "1_Opening": "Opening",
        "2_Activity2_1": "Your Challenging Emotions",
        "3_Passengers_On_The_Bus": "Passengers On The Bus",
        "4_Example": "Example of Driving the bus",
        "6_Diagram": "Identify your passengers",
        "7_Willingness_to_Carry_On": "Willingness to Carry On",
        "8_Summary": "Summary"
    },
    "chapter3": {
        "opening": "Opening",
        "activity1": "Label the Passengers on the Bus",
        "activity2": "Identify how it feels in your body",
        "activity3": "Learn How to Meditate",
        "activity4": "Make a Belief Statement",
        "activity5": "Be Aware of Cognitive Distortions",
        "activity6": "Reflecting on Cognitive Distortions",
        "summary": "Summary"
    },
    "chapter4": {
        "opening": "Opening",
        "activity1": "Introduce a New Framework",
        "activity2": "Commit to a New Goal",
        "activity3": "Identify Your Passengers",
        "activity4": "Willingness to Carry On",
        "summary": "Summary",
        "activity5": "Introduce Goal Tracker"
    }
} */

/* 
ch1:
{"1_Opening": "1", 
"2_Activity1_0": "0", 
"2_Activity1_1": "0", 
"3_Activity1_2_Discover": "0", 
"4_Activity1_2_Questions": "0", 
"5_Time_Management": "0", 
"6_Summary": "0"}

ch2: 
{"1_Opening": "1", 
"2_Activity2_1": "1", 
"3_Passengers_On_The_Bus": "1", 
"4_Example": "1", 
"6_Diagram": "1", 
"7_Willingness_to_Carry_On": "0", 
"8_Summary": "0"}
*/

export const chapterProgressData: Record<string, Record<string, boolean>> = {
  chapter3: {
    opening: false,
    activity1: false,
    activity2: false,
    activity3: false,
    activity4: false,
    activity5: false,
    activity6: false,
    summary: false,
  },
  chapter4: {
    opening: false,
    activity1: false,
    activity2: false,
    summary: false,
  },
};
/* export const chapterProgressData: Record<string, Record<string, boolean>> = {
    "chapter1": {
        "1_Opening": false,
        "2_Activity1_0": false,
        "2_Activity1_1": false,
        "3_Activity1_2_Discover": false,
        "4_Activity1_2_Questions": false,
        "5_Time_Management": false,
        "6_Summary": false
    },
    "chapter2": {
        "1_Opening": false,
        "2_Activity2_1": false,
        "3_Passengers_On_The_Bus": false,
        "4_Example": false,
        "6_Diagram": false,
        "7_Willingness_to_Carry_On": false,
        "8_Summary": false
    },
    "chapter3": {
        "opening": false,
        "activity1": false,
        "activity2": false,
        "activity3": false,
        "activity4": false,
        "activity5": false,
        "activity6": false,
        "summary": false
    },
    "chapter4": {
        "opening": false,
        "activity1": false,
        "activity2": false,
        "summary": false
    }

} */

/* 
ch1:
{"1_Opening": "1", 
"2_Activity1_0": "0", 
"2_Activity1_1": "0", 
"3_Activity1_2_Discover": "0", 
"4_Activity1_2_Questions": "0", 
"5_Time_Management": "0", 
"6_Summary": "0"}

ch2: 
{"1_Opening": "1", 
"2_Activity2_1": "1", 
"3_Passengers_On_The_Bus": "1", 
"4_Example": "1", 
"6_Diagram": "1", 
"7_Willingness_to_Carry_On": "0", 
"8_Summary": "0"}
*/

export const chapterName2SidebarActivity: Record<
  string,
  Record<string, string>
> = {
  chapter1: {
    "1_Opening": "opening",
    "2_Activity1_0": "activity0",
    "2_Activity1_1": "activity1",
    "3_Activity1_2_Discover": "activity2_1",
    "4_Activity1_2_Questions": "activity2_2",
    "5_Time_Management": "activity3",
    "6_Summary": "summary",
  },
  chapter2: {
    "1_Opening": "opening",
    "2_Activity2_1": "activity1",
    "3_Passengers_On_The_Bus": "activity2",
    "4_Example": "activity3",
    "6_Diagram": "activity4",
    "7_Willingness_to_Carry_On": "activity5",
    "8_Summary": "summary",
  },
  chapter3: {
    "0_opening": "opening",
    "1_activity1": "activity1",
    "2_activity2": "activity2",
    "3_activity3": "activity3",
    "4_activity4": "activity4",
    "5_activity5": "activity5",
    "7_activity7": "activity7",
    "8_activity8": "activity8",
    "9_summary": "summary",
  },
  chapter4: {
    "1_Opening": "opening",
    "2_Activity4_1": "activity1",
    "3_Activity4_2": "activity2",
    "4_Activity4_3": "activity3",
    "5_Activity4_4": "activity4",
    "6_Summary": "summary",
    "7_Activity4_5_intro_tracker": "activity5",
  },
};

export const chapter2activity2title: Record<string, Record<string, string>> = {
  chapter1: {
    opening: "Opening",
    activity0: "Prioritize Your Life Values",
    activity1: "Discover Procrastination Reasons",
    activity2_1: "Procrastination Tendencies",
    activity2_2: "Tendencies Questions",
    activity3: "How to Use the App",
    summary: "Summary",
  },
  chapter2: {
    opening: "Opening",
    activity1: "Your Challenging Emotions",
    activity2: "Passengers On The Bus",
    activity3: "Example of Driving the bus",
    activity4: "Identify your passengers",
    activity5: "Willingness to Carry On",
    summary: "Summary",
  },
  chapter3: {
    opening: "Opening",
    activity1: "Label the Passengers on the Bus",
    activity2: "Identify How it Feels in Your Body",
    activity3: "Learn How to Meditate",
    activity4: "Make a Belief Statement",
    activity5: "Be Aware of Cognitive Distortions",
    activity7: "Summary of Cognitive Distortions",
    activity8: "Reflecting on Cognitive Distortions",
    summary: "Summary",
  },
  chapter4: {
    opening: "Opening",
    activity1: "Introduce a New Framework",
    activity2: "Commit to a New Goal",
    activity3: "Identify Your Passengers",
    activity4: "Willingness to Carry On",
    summary: "Summary",
    activity5: "Introduce Goal Tracker",
  },
};
