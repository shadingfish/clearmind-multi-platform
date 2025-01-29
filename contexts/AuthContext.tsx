import { createContext, useContext, useEffect, useState } from "react";
import { auth } from "@/constants/firebaseConfig";
import { onAuthStateChanged } from "firebase/auth";
import { useRouter } from "expo-router";

// Define the shape of the context
interface AuthContextType {
  isSignedIn: boolean;
  pending: boolean;
  userData: Record<string, Record<string, Boolean>>;
  setUserData: (data: Record<string, Record<string, Boolean>>) => void;
}

// Create the context with an initial default value
const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Context Provider Component
export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [isSignedIn, setIsSignedIn] = useState(false);
  const [pending, setPending] = useState(true);
  const [userData, setUserData] = useState<Record<string, Record<string, Boolean>>>({});

  const router = useRouter();

    //add logic to connect to backend
  /* useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setIsSignedIn(true);
        setUserData({ uid: user.uid, email: user.email || "" }); // Example user data
      } else {
        setIsSignedIn(false);
        setUserData({});
        router.replace("/(login)");
      }
      setPending(false);
    });

    return () => unsubscribe();
  }, []); */

    //just temporary
    const tempPart1: Record<string, Boolean> = {
        "Opening": true,
        "Prioritize Your Life Values": false,
        "Discover Procrastination Reasons": false,
        "Procrastination Tendencies": false,
        "Tendencies Questions": false,
        "How to Use the App": false,
        "Summary": false,
    }
    const tempPart2: Record<string, Boolean> = {
        "Opening": false,
        "Your Challenging Emotions": false,
        "Passengers On The Bus": false,
        "Example of Driving the bus": false,
        "Identify your passengers": false,
        "Willingness to Carry On": false,
        "Summary": false,
    }
    const tempPart3: Record<string, Boolean> = {
        "Opening": false,
        "Label the Passengers on the Bus": false,
        "Identify how it feels in your body": false,
        "Learn How to Meditate": false,
        "Make a Belief Statement": false,
    }
    const tempPart4: Record<string, Boolean> = {
        "Opening": false,
        "Prioritize Your Life Values": false,
        "Discover Procrastination Reasons": false,
        "Procrastination Tendencies": false,
        "Tendencies Questions": false,
        "How to Use the App": false,
        "Summary": false,
    }

    const visited_chapters: Record<string, Record<string, Boolean>> = {
        "Part1": tempPart1,
        "Part2": tempPart2,
        "Part3": tempPart3,
        "Part4": tempPart4
    }

    useEffect(() => {
        setUserData(visited_chapters);

    }, []);

  return (
    <AuthContext.Provider value={{ isSignedIn, pending, userData, setUserData }}>
      {children}
    </AuthContext.Provider>
  );
}

// Custom Hook for Using the Context
export function useAuthContext() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuthContext must be used within an AuthProvider");
  }
  return context;
}
