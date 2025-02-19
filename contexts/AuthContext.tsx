import { createContext, useContext, useEffect, useState } from "react";
import { auth } from "@/constants/firebaseConfig";
import { onAuthStateChanged } from "firebase/auth";
import { useRouter } from "expo-router";
import {chapterName2SidebarActivity, chapterProgressData} from "../constants/chapterData"; //just temporary
import { useAuth } from "@/hooks/useAuth";
import { Chapter1, Chapter2, ChapterProgress } from "@/constants/data";
import { getChapter2Progress } from "@/hooks/Chapter2Activity";
import { getChapter1Progress, initChapter1Progress } from "@/hooks/Chapter1Activity";

// Define the shape of the context
interface ChapterProgressContextType {
  userData: Record<string, Record<string, boolean>>;
  setUserData: React.Dispatch<React.SetStateAction<Record<string, Record<string, boolean>>>>;
  currPage: string,
  setCurrPage: (data: string) => void;
  updateChapterProgress: (chapter: string, activity: string) => void;
  isFinished: (chapter: string) => boolean;
  chap1Percent: number;
  chap2Percent: number;
  chap3Percent: number;
  chap4Percent: number;
}

// Create the context with an initial default value
const ChapterProgressContext = createContext<ChapterProgressContextType | undefined>(undefined);



// Context Provider Component
export function ChapterProgressProvider({ children }: { children: React.ReactNode }) {
  const [userData, setUserData] = useState<Record<string, Record<string, boolean>>>({});
  const [currPage, setCurrPage] = useState<string>(""); //set to the title of the page and then you should know which chapter you're in modal anyway
  const [chap1Percent, setChap1Percent] = useState(0);
  const [chap2Percent, setChap2Percent] = useState(0);
  const [chap3Percent, setChap3Percent] = useState(0);
  const [chap4Percent, setChap4Percent] = useState(0);

  const { user, pending } = useAuth();
  const [ch1progress, setCh1Progress] = useState<ChapterProgress>(
    Chapter1.EmptyProgress
  );
  const [ch2progress, setCh2Progress] = useState<ChapterProgress>(
    Chapter2.EmptyProgress
  );

  const getProgressStats = (progress: Record<string, boolean>) => {
    const values = Object.values(progress);
    const trueCount = values.filter((value) => value === true).length;
    const totalCount = values.length;
    
    return Math.round((trueCount / totalCount) * 100) // Progress in percentage
  };


  useEffect(() => {
    if (userData["chapter1"] && userData["chapter2"] && userData["chapter3"] && userData["chapter4"]) {
      setChap1Percent(getProgressStats(userData["chapter1"]));
      setChap2Percent(getProgressStats(userData["chapter2"]));
      setChap3Percent(getProgressStats(userData["chapter3"]));
      setChap4Percent(getProgressStats(userData["chapter4"]));
      console.log('chap2percent', chap2Percent);
    }
  }, [userData])

  useEffect(() => {
    if (user) {
      //get ch1 progress
      getChapter1Progress(user.uid)
        .then((res) => {
          if (res != null) {
            setCh1Progress(res);
          } else {
            console.log("No progress found, initializing...");
            initChapter1Progress(user.uid);
          }
        })
      .catch((err) => console.log("Error fetching Chapter1 progress:", err));

      //get ch2 progress
      getChapter2Progress(user.uid)
        .then((res) => {
          if (res != null) {
            const curProgress = res;
            delete curProgress["5_Identify_your_passengers"];
            setCh2Progress(curProgress);
          } else {
            console.log("error no progress");
          }
        })
        .catch((err) => console.log(err));

      //add chapter3 progress

      //add chapter4 progress
    }
  }, [pending]);

  const mapChapterProgress = (
    chapterData: Record<string, string>,
    mapping: Record<string, string>
  ): Map<string, boolean> => {
    const result = new Map<string, boolean>();
  
    // Iterate over the mapping keys to maintain order
    for (const key of Object.keys(mapping)) {
      if (key in chapterData) {
        result.set(mapping[key], chapterData[key] === "1");
      }
    }
  
    return result;
  };

    useEffect(() => {
        if (ch1progress && ch2progress) { //should be all chapters
          //setUserData(chapterProgressData); //this would actually just be a backend call

          setUserData(
            {
              "chapter1": Object.fromEntries(mapChapterProgress(ch1progress, chapterName2SidebarActivity["chapter1"])),
              "chapter2": Object.fromEntries(mapChapterProgress(ch2progress, chapterName2SidebarActivity["chapter2"])),
              "chapter3": chapterProgressData["chapter3"], //change to backend
              "chapter4": chapterProgressData["chapter4"], //change to backend
            }
          )
          //console.log('userdata:', userData);
          console.log('ch context chapter1 progress:', ch1progress);
          console.log('ch context chapter2 progress:', ch2progress);
        }

      
    }, []); //run when authcontext is mounted


    //this should be called in a use effect in every activity. just pass the chapter# and activity# (opening, summary, activity#)
    const updateChapterProgress = (chapter: string, activity: string) => {
      
      setUserData((prevUserData: Record<string, Record<string, boolean>>): Record<string, Record<string, boolean>> => ({
          ...prevUserData,
          [chapter]: {
              ...prevUserData[chapter],
              [activity]: true
          }
      }));

      //setCurrPage(activity);

    }

    //checks if a chapter is finished
    const isFinished = (chapter: string) => {
      let trueCount = Object.values(userData[chapter]).filter(value => value).length;

      return(trueCount == Object.values(userData[chapter]).length); //return true if all activities are finished
    }

    /* useEffect(() => {
      console.log('userData', userData);
    }, [userData]) */

  return (
    <ChapterProgressContext.Provider value={{ userData, setUserData, currPage, setCurrPage, updateChapterProgress, isFinished, chap1Percent, chap2Percent, chap3Percent, chap4Percent }}>
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
