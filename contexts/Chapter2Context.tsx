import { createContext, useContext, useEffect, useState } from "react";
import { auth } from "@/constants/firebaseConfig";
import { onAuthStateChanged } from "firebase/auth";
import { useRouter } from "expo-router";
import {chapterProgressData} from "../constants/chapterData"; //just temporary

// Define the shape of the context
interface Chapter2ContextType {
  chapterData: any;
  updateChapterData: (activity: string, data: any) => void;
}


const Chapter2Context = createContext<Chapter2ContextType | undefined>(undefined);

export function Chapter2Provider({ children }: { children: React.ReactNode }) {
    const [chapterData, setChapterData] = useState({}); 
    //this is in format:
    /*
    
    {
      "question1": "....blah blah",
      "question2": "....blah blah",
      ...
    }
    
    */
  
      //this should be called in a use effect in every activity. just pass the chapter# and activity# (opening, summary, activity#)
    const updateChapterData = (activity: string, data: any) => {
        setChapterData((prevData) => (
            {
                ...prevData,
                [activity]: data
            }
            )
        )
  
    }

    useEffect(() => {
      console.log('chapter2 context mounted');
    }, [])
  
    return (
      <Chapter2Context.Provider value={{ chapterData, updateChapterData }}>
        {children}
      </Chapter2Context.Provider>
    );
  }
  
  // Custom Hook for Using the Context
  export function useChapter2Context() {
    const context = useContext(Chapter2Context);
    if (!context) {
      throw new Error("useChapter2Context must be used within an AuthProvider");
    }
    return context;
  }
  
