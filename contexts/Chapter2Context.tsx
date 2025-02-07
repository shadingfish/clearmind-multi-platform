import { createContext, useContext, useEffect, useState } from "react";
import { auth } from "@/constants/firebaseConfig";
import { onAuthStateChanged } from "firebase/auth";
import { useRouter } from "expo-router";
import {chapterProgressData} from "../constants/chapterData"; //just temporary

// Define the shape of the context
interface Chapter2ContextType {
  chapter2Data: any;
  updateChapterData: (activity: string, data: any) => void;
}


const Chapter2Context = createContext<Chapter2ContextType | undefined>(undefined);

export function Chapter2Provider({ children }: { children: React.ReactNode }) {
    const [chapter2Data, setChapter2Data] = useState({}); 
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
        setChapter2Data((prevData) => (
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
  
      /*
      
      useEffect(() => {
        setUserData((prevUserData: Record<string, Record<string, boolean>>): Record<string, Record<string, boolean>> => ({
            ...prevUserData,
            "chapter2": {
                ...prevUserData.chapter2,
                "Passengers On The Bus": true
            }
        }));
  
        setCurrPage("Passengers On The Bus");
      }, []);
      
      */
  
    return (
      <Chapter2Context.Provider value={{ chapter2Data, updateChapterData }}>
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
  
