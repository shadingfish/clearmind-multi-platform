// app/index.tsx
//import MainScreen from "./screens/MainScreen";
import Page1 from "../components/PreSurvey/Page1";
import Page2 from "../components/PreSurvey/Page2";
import Page3 from "../components/PreSurvey/Page3";
import Page4 from "../components/PreSurvey/Page4";
import NewPage from "../components/PreSurvey/newPage";
import CurrPage from "../components/PreSurvey/CurrPage";

export default function Index() {
  //return <MainScreen />;
  return <CurrPage/>;
}