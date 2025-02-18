// contexts/Chapter3Context.tsx

import { createContext, useContext, useEffect, useState } from "react";
import { auth } from "@/constants/firebaseConfig";
import { onAuthStateChanged } from "firebase/auth";
import { useRouter } from "expo-router";
import {chapterProgressData} from "../constants/chapterData"; //just temporary

// Define the shape of the context
interface Chapter1ContextType {
  chapterData: any;
  updateChapterData: (activity: string, data: any) => void;
}


const Chapter1Context = createContext<Chapter1ContextType | undefined>(undefined);

export function Chapter1Provider({ children }: { children: React.ReactNode }) {
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
      console.log('chapter1 context mounted');
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
      <Chapter1Context.Provider value={{ chapterData, updateChapterData }}>
        {children}
      </Chapter1Context.Provider>
    );
  }
  
  // Custom Hook for Using the Context
  export function useChapter1Context() {
    const context = useContext(Chapter1Context);
    if (!context) {
      throw new Error("useChapter1Context must be used within an AuthProvider");
    }
    return context;
  }
  
