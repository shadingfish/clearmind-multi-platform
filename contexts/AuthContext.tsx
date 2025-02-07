import { createContext, useContext, useEffect, useState } from "react";
import { auth } from "@/constants/firebaseConfig";
import { onAuthStateChanged } from "firebase/auth";
import { useRouter } from "expo-router";
import {chapterProgressData} from "../constants/chapterData"; //just temporary

// Define the shape of the context
interface ChapterProgressContextType {
  userData: Record<string, Record<string, boolean>>;
  setUserData: React.Dispatch<React.SetStateAction<Record<string, Record<string, boolean>>>>;
  currPage: string,
  setCurrPage: (data: string) => void;
  updateChapterProgress: (chapter: string, activity: string) => void;
}

// Create the context with an initial default value
const ChapterProgressContext = createContext<ChapterProgressContextType | undefined>(undefined);

// Context Provider Component
export function ChapterProgressProvider({ children }: { children: React.ReactNode }) {
  const [userData, setUserData] = useState<Record<string, Record<string, boolean>>>({});
  const [currPage, setCurrPage] = useState<string>(""); //set to the title of the page and then you should know which chapter you're in modal anyway

    useEffect(() => {
        setUserData(chapterProgressData); //this would actually just be a backend call

    }, []);


    //this should be called in a use effect in every activity. just pass the chapter# and activity# (opening, summary, activity#)
    const updateChapterProgress = (chapter: string, activity: string) => {
      
      setUserData((prevUserData: Record<string, Record<string, boolean>>): Record<string, Record<string, boolean>> => ({
          ...prevUserData,
          [chapter]: {
              ...prevUserData.chapter2,
              [activity]: true
          }
      }));

      setCurrPage(activity);

    }

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
    <ChapterProgressContext.Provider value={{ userData, setUserData, currPage, setCurrPage, updateChapterProgress }}>
      {children}
    </ChapterProgressContext.Provider>
  );
}

// Custom Hook for Using the Context
export function useChapterProgressContext() {
  const context = useContext(ChapterProgressContext);
  if (!context) {
    throw new Error("useChapterProgressContext must be used within an AuthProvider");
  }
  return context;
}
