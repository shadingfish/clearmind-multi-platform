

 export const chapter2activity2title: Record<string, Record<string, string>> = {
    "chapter1": {
        "opening": "Opening",
        "activity1": "Prioritize Your Life Values",
        "activity2": "Discover Procrastination Reasons",
        "activity3": "Procrastination Tendencies",
        "activity4": "Tendencies Questions",
        "activity5": "Willingness to Carry On",
        "summary": "Summary"
    },
    "chapter2": {
        "opening": "Opening",
        "activity1": "Your Challenging Emotions",
        "activity2": "Passengers On The Bus",
        "activity3": "Example of Driving the bus",
        "activity4": "Identify your passengers",
        "activity5": "Willingness to Carry On",
        "summary": "Summary"
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
        "activity1": "Prioritize Your Life Values",
        "activity2": "Discover Procrastination Reasons",
        "summary": "Summary"
    }
}//add chapter 4 in later


export const chapterProgressData: Record<string, Record<string, boolean>> = {
    "chapter1": {
        "opening": true,
        "activity1": false,
        "activity2": false,
        "activity3": false,
        "activity4": false,
        "activity5": false,
        "summary": false
    },
    "chapter2": {
        "opening": true,
        "activity1": false,
        "activity2": false,
        "activity3": false,
        "activity4": false,
        "activity5": false,
        "summary": false
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

}


/*

//just temporary
    const tempPart1: Record<string, boolean> = {
        "Opening": true,
        "Prioritize Your Life Values": true,
        "Discover Procrastination Reasons": true,
        "Procrastination Tendencies": true,
        "Tendencies Questions": true,
        "How to Use the App": true,
        "Summary": true,
    }
    const tempPart2: Record<string, boolean> = {
        "Opening": true,
        "Your Challenging Emotions": false,
        "Passengers On The Bus": false,
        "Example of Driving the bus": false,
        "Identify your passengers": false,
        "Willingness to Carry On": false,
        "Summary": false,
    }
    const tempPart3: Record<string, boolean> = {
        "Opening": false,
        "Label the Passengers on the Bus": false,
        "Identify how it feels in your body": false,
        "Learn How to Meditate": false,
        "Make a Belief Statement": false,
        "Be Aware of Cognitive Distortions": false,
        "Reflecting on Cognitive Distortions": false,
        "Summary": false,
    }
    const tempPart4: Record<string, boolean> = {
        "Opening": false,
        "Prioritize Your Life Values": false,
        "Discover Procrastination Reasons": false,
        "Procrastination Tendencies": false,
        "Tendencies Questions": false,
        "How to Use the App": false,
        "Summary": false,
    }

    const visited_chapters: Record<string, Record<string, boolean>> = {
        "chapter1": tempPart1,
        "chapter2": tempPart2,
        "chapter3": tempPart3,
        "chapter4": tempPart4
    }

    const title2activityNum: Record<string, string> = {
        "Opening": "opening",
        "Your Challenging Emotions": "activity1",
        "Passengers On The Bus": "activity2",
        "Example of Driving the bus": "activity3",
        "Identify your passengers": "activity4",
        "Willingness to Carry On": "activity5",
        "Summary": "summary",
    }




*/