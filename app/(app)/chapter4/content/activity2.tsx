import { ChapterNavigationButton } from "@/components/ChapterNavigateButton";
import colors from "@/constants/colors";
import { hasEmptyValues } from "@/constants/helper";
import { useChapterProgressContext } from "@/contexts/AuthContext";
import {
  getChapter4Activity2,
  setChapter4Activity2,
  updateChapter4Progress,
} from "@/hooks/Chapter4Activity";
import { useAuth } from "@/hooks/useAuth";
import { useToastController } from "@tamagui/toast";
import { RelativePathString, useRouter } from "expo-router";
import React, { useEffect, useState } from "react";
import {
  Image,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { Input, YStack } from "tamagui";
import StarModal from "./StarModal";

type Ch4Activity2Questions = {
  S: string;
  T: string;
  A: string;
  R: string;
};

const Activity2 = () => {
  const toast = useToastController();
  const { user, pending } = useAuth();

  const router = useRouter();
  const { bottom } = useSafeAreaInsets();

  const [currTitle, setCurrTitle] = useState("");
  const [isModalVisible, setIsModalVisible] = useState(false);

  const { updateChapterProgress, setCurrPage } = useChapterProgressContext();

  useEffect(() => {
    setCurrPage("activity2");
  }, []);

  const [questions, setQuestions] = useState<Ch4Activity2Questions>({
    S: "",
    T: "",
    A: "",
    R: "",
  });

  const openModal = (title: string) => {
    setCurrTitle(title);
    setIsModalVisible(true);
  };

  const closeModal = () => {
    setIsModalVisible(false);
    setCurrTitle("");
  };

  const STAR = {
    Specific: require("@/assets/images/star_s.png"),
    Trackable: require("@/assets/images/star_t.png"),
    Achievable: require("@/assets/images/star_a.png"),
    Relevant: require("@/assets/images/star_r.png"),
  };

  const updateQuestion = (
    field: keyof Ch4Activity2Questions,
    value: string
  ) => {
    setQuestions((prev) => {
      const updatedQuestions = { ...prev, [field]: value };
      return updatedQuestions;
    });
  };

  useEffect(() => {
    if (user) {
      getChapter4Activity2(user.uid)
        .then((snapshot) => {
          if (snapshot.exists()) {
            const answer = snapshot.data();
            for (const [key, value] of Object.entries(answer)) {
              updateQuestion(
                key as keyof Ch4Activity2Questions,
                value as string
              );
            }
          }
        })
        .catch((err) => console.log("Error get chapter 4 activity2: " + err));
    }
  }, [pending]);

  return (
    <ScrollView automaticallyAdjustKeyboardInsets={true}>
      <YStack margin={"$4"} gap={"$4"} paddingBottom={bottom}>
        <StarModal
          isVisible={isModalVisible}
          onClose={closeModal}
          title={currTitle}
        />
        <Text style={{ fontSize: 18 }}>
          Let's first introduce the STAR framework for goal setting. The STAR
          framework can be applied to create well-defined and achievable goals.
          STAR stands for{" "}
          <Text style={{ fontWeight: "bold" }}>
            Specific, Trackable, Achievable, and Relevant.{" "}
          </Text>
          Here's a breakdown of each component:
        </Text>
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-evenly",
          }}
        >
          {Object.entries(STAR).map(([label, image], index) => (
            <Pressable
              key={index}
              style={styles.item}
              onPress={() => openModal(label)}
            >
              <Image source={image} style={{ width: 70, height: 70 }} />
              <Text style={{ color: "grey" }}>{label}</Text>
            </Pressable>
          ))}
        </View>

        <Text style={{ alignSelf: "center", marginVertical: "2%" }}>
          (Click to see more detailed information)
        </Text>

        <Text style={{ fontSize: 18, marginBottom: "3%" }}>
          Now it's time to set a goal that is specific, measurable, attainable,
          and relevant to overcome your urge to procrastinate for the upcoming
          week. While this framework can be applied to various aspects of your
          life, for now, let's concentrate on conquering procrastination.
        </Text>

        <YStack gap={"$3"}>
          <Input
            unstyled
            placeholder={"Specific:"}
            borderColor={colors.border}
            borderWidth={3}
            borderRadius={7}
            size="$4"
            width={"100%"}
            alignSelf="center"
            value={questions.S}
            onChangeText={(text) => updateQuestion("S", text)}
          />
          <Input
            unstyled
            placeholder={"Trackable:"}
            borderColor={colors.border}
            borderWidth={3}
            borderRadius={7}
            size="$4"
            width={"100%"}
            alignSelf="center"
            value={questions.T}
            onChangeText={(text) => updateQuestion("T", text)}
          />
          <Input
            unstyled
            placeholder={"Achievable:"}
            borderColor={colors.border}
            borderWidth={3}
            borderRadius={7}
            size="$4"
            width={"100%"}
            alignSelf="center"
            value={questions.A}
            onChangeText={(text) => updateQuestion("A", text)}
          />
          <Input
            unstyled
            placeholder={"Relevant:"}
            borderColor={colors.border}
            borderWidth={3}
            borderRadius={7}
            size="$4"
            width={"100%"}
            alignSelf="center"
            value={questions.R}
            onChangeText={(text) => updateQuestion("R", text)}
          />
        </YStack>

        <Text style={{ color: "grey", fontWeight: "bold" }}>Example:</Text>
        <YStack gap={"$3"}>
          <Text style={{ color: "grey" }}>
            <Text style={{ fontWeight: "bold" }}>Specific:</Text> Next week, I
            commit to dedicating at least two hours of concentrated work to my
            final review every day.
          </Text>
          <Text style={{ color: "grey" }}>
            <Text style={{ fontWeight: "bold" }}>Trackable:</Text> Starting next
            Monday, I will follow this routine for the upcoming week.
          </Text>
          <Text style={{ color: "grey" }}>
            <Text style={{ fontWeight: "bold" }}>Achievable:</Text> I will break
            down my final review into seven parts, which is manageable alongside
            my other responsibilities.
          </Text>
          <Text style={{ color: "grey", marginBottom: "3%" }}>
            <Text style={{ fontWeight: "bold" }}>Relevant:</Text> This goal
            helps me to perform better on my test and align with my values of
            productivity and reducing procrastination tendencies.
          </Text>
        </YStack>

        <ChapterNavigationButton
          prev={"/(app)/chapter4/content/activity1"}
          next={() => {
            if (hasEmptyValues(questions)) {
              toast.show("Empty Input");
            } else {
              updateChapter4Progress(user!.uid, "3_Activity4_2");
              updateChapterProgress("chapter4", "activity2");
              setChapter4Activity2(user!.uid, questions);
              router.push(
                "/(app)/chapter4/content/activity3" as RelativePathString
              );
            }
          }}
        />
      </YStack>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  item: {
    width: "100%", // Ensures equal width
    flex: 1, // Makes all items take equal height
    backgroundColor: "white",
    borderRadius: 10,
    justifyContent: "center",
    alignItems: "center",
    shadowColor: "#000", // Box shadow
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 5,
    elevation: 5, // For Android shadow
    marginVertical: 5, // Add spacing between boxes
    height: 100,
    marginHorizontal: "1%",
  },
});

export default Activity2;
