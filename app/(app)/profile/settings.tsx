// app/(app)/profile/settings.tsx

import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Alert,
  StyleSheet,
  ScrollView,
  Modal,
} from "react-native";
import { useRouter } from "expo-router";
import { auth, database } from "@/constants/firebaseConfig";
import { writeBatch, getDoc, doc, deleteDoc, collection, getDocs, runTransaction, getFirestore } from "firebase/firestore";
import { EmailAuthProvider, reauthenticateWithCredential, updatePassword } from "firebase/auth";
import { getAuth } from "firebase/auth";
import { Ionicons } from "@expo/vector-icons";

export default function SettingsScreen() {
  const router = useRouter();
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [passwordVisible, setPasswordVisible] = useState({
    old: false,
    new: false,
    confirm: false,
  });
  const [selectedNotification, setSelectedNotification] = useState("Daily");
  const [isModalVisible, setIsModalVisible] = useState(false);
  const db = getFirestore();
  const auth = getAuth();

  const handleChangePassword = async () => {
    if (newPassword !== confirmPassword) {
      Alert.alert("Error", "Passwords do not match.");
      return;
    }

    try {
      const user = auth.currentUser;
      if (!user || !user.email) {
        Alert.alert("Error", "No authenticated user found.");
        return;
      }

      const credential = EmailAuthProvider.credential(user.email, oldPassword);
      await reauthenticateWithCredential(user, credential);
      await updatePassword(user, newPassword);

      Alert.alert("Success", "Password changed successfully.");

    } catch (error: any) {
      console.error("Failed to change password:", error);
      Alert.alert("Error", error.message || "Failed to change password. Please try again.");
    }
  };

  const handleDeleteAccount = async () => {
    try {
      const user = auth.currentUser;
      if (!user) return;
      const userId = user.uid;
  
      console.log("🔍 Scanning Firestore for user data to delete:", userId);
  
      const rootCollections = ["users", "ChapterProgress"];
      const chapters = ["Presurvey", "Chapter1", "Chapter2", "Chapter3", "Chapter4", "Postsurvey"];
  
      let deleteRefs: any[] = [];
  
      // 📌 Collect all root-level user documents
      for (const collectionName of rootCollections) {
        const userDocRef = doc(db, collectionName, userId);
        deleteRefs.push(userDocRef);
      }
  
      // 📌 Collect all user documents inside each Chapter/{activity}/users/{uid}
      for (const chapter of chapters) {
        const chapterRef = collection(db, chapter);
        const activitiesSnapshot = await getDocs(chapterRef);
  
        for (const activityDoc of activitiesSnapshot.docs) {
          const userDocRef = doc(db, `${chapter}/${activityDoc.id}/users`, userId);
          deleteRefs.push(userDocRef);
        }
      }
  
      // **🚀 Run Transaction for Atomic Deletion**
      if (deleteRefs.length === 0) {
        console.error("❌ No user data found for deletion.");
        return;
      }
  
      await runTransaction(db, async (transaction) => {
        for (const docRef of deleteRefs) {
          transaction.delete(docRef);
        }
      });
  
      console.log("✅ Successfully deleted all user data!");
      
      // **🔥 Finally, delete Firebase Auth user**
      await user.delete();
      console.log("✅ User account deleted!");
  
    } catch (error: any) {
      console.error("Error deleting account:", error);
      console.error("Error Code:", error.code);
      console.error("Error Message:", error.message);
      console.error("Error Details:", JSON.stringify(error, null, 2));
      
      Alert.alert("Error", `Failed to delete account: ${error.message}`);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.topSection}>
        <Text style={styles.title}>SETTINGS</Text>
        <TouchableOpacity onPress={() => router.back()} style={styles.closeButton}>
          <Ionicons name="close" size={28} color="white" />
        </TouchableOpacity>
      </View>

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        {/* Change Password */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>CHANGE PASSWORD</Text>

          {["old", "new", "confirm"].map((type, index) => (
            <View key={index} style={styles.inputWrapper}>
              <Text style={styles.label}>
                {type === "old" ? "Old Password:" : type === "new" ? "New Password:" : "Re-Enter New Password:"}
              </Text>
              <View style={styles.inputContainer}>
                <TextInput
                  style={styles.input}
                  secureTextEntry={!passwordVisible[type]}
                  placeholder={type === "old" ? "Old Password" : type === "new" ? "New Password" : "Re-Enter New Password"}
                  value={type === "old" ? oldPassword : type === "new" ? newPassword : confirmPassword}
                  onChangeText={(text) =>
                    type === "old" ? setOldPassword(text) : type === "new" ? setNewPassword(text) : setConfirmPassword(text)
                  }
                />
                <TouchableOpacity onPress={() => setPasswordVisible((prev) => ({ ...prev, [type]: !prev[type] }))}>
                  <Ionicons name={passwordVisible[type] ? "eye" : "eye-off"} size={20} color="#4CAF50" />
                </TouchableOpacity>
              </View>
            </View>
          ))}

          <TouchableOpacity style={styles.button} onPress={handleChangePassword}>
            <Text style={styles.buttonText}>CONFIRM</Text>
          </TouchableOpacity>
        </View>

        {/* 分割线 */}
        <View style={styles.divider} />

        {/* Notification */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>NOTIFICATION</Text>
          <Text>How often do you want to get app notifications?</Text>

          {["Daily", "2-3 times a week", "Once a week", "Never"].map((option) => (
            <TouchableOpacity key={option} style={styles.radioContainer} onPress={() => setSelectedNotification(option)}>
              <View style={styles.radioCircle}>{selectedNotification === option && <View style={styles.radioChecked} />}</View>
              <Text style={styles.radioText}>{option}</Text>
            </TouchableOpacity>
          ))}
        </View>

        {/* 分割线 */}
        <View style={styles.divider} />

        {/* Delete Account */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>DELETE ACCOUNT</Text>
          <TouchableOpacity style={styles.deleteButton} onPress={() => setIsModalVisible(true)}>
            <Text style={styles.deleteText}>DELETE ACCOUNT</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>

      {/* 🔹 删除确认 Modal 🔹 */}
      <Modal visible={isModalVisible} transparent animationType="slide">
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Are you sure?</Text>
            <Text>This action cannot be undone. All your data will be permanently deleted.</Text>

            <TouchableOpacity style={styles.confirmDeleteButton} onPress={handleDeleteAccount}>
              <Text style={styles.confirmDeleteText}>Confirm Delete</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.cancelButton} onPress={() => setIsModalVisible(false)}>
              <Text style={styles.cancelText}>Cancel</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
    topSection: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        paddingHorizontal: 20,
        paddingVertical: 30,
        backgroundColor: "#54B363",
    },
    title: {
        paddingTop: 30,
        fontSize: 24,
        fontWeight: "bold",
        color: "#fff",
        textAlign: "center",
    },
    closeButton: {
        paddingTop: 30,
    },
    modalContainer: { flex: 1, justifyContent: "center", alignItems: "center", backgroundColor: "rgba(0,0,0,0.5)" },
    modalContent: { backgroundColor: "#fff", padding: 20, borderRadius: 10, alignItems: "center" },
    modalTitle: { fontSize: 18, fontWeight: "bold", marginBottom: 10 },
    confirmDeleteButton: { backgroundColor: "#FF3B30", padding: 10, borderRadius: 5, marginTop: 10 },
    confirmDeleteText: { color: "#fff", fontSize: 16, textAlign: "center", fontWeight: "bold" },
    cancelButton: { marginTop: 10 },
    cancelText: { fontSize: 16, color: "#4CAF50" },
  container: { flex: 1, backgroundColor: "#54B363"},
  content: { backgroundColor: "#fff", borderTopLeftRadius: 20, borderTopRightRadius: 20, padding: 20 },

  section: { marginBottom: 20},
  sectionTitle: { fontSize: 18, fontWeight: "bold", color: "#4CAF50", marginBottom: 10 },
  label: { fontSize: 14, color: "#333" },
  inputWrapper: { marginBottom: 10 },
  
  inputContainer: { 
    flexDirection: "row", 
    alignItems: "center", 
    borderWidth: 1, 
    borderColor: "#4CAF50", 
    borderRadius: 5, 
    paddingHorizontal: 10,
  },
  input: { flex: 1, padding: 10, fontSize: 14 },
  button: { backgroundColor: "#4CAF50", padding: 12, borderRadius: 5, alignItems: "center", marginTop: 10 },
  buttonText: { color: "#fff", fontSize: 16, fontWeight: "bold" },

  divider: { height: 1, backgroundColor: "#ddd", marginVertical: 15 },

  radioContainer: { flexDirection: "row", alignItems: "center", marginTop: 10},
  radioCircle: { width: 20, height: 20, borderRadius: 10, borderWidth: 2, borderColor: "#4CAF50", justifyContent: "center", alignItems: "center", marginRight: 10 },
  radioChecked: { width: 12, height: 12, borderRadius: 6, backgroundColor: "#4CAF50" },
  radioText: { fontSize: 14, color: "#333" },

  deleteButton: { backgroundColor: "#FF3B30", padding: 12, borderRadius: 5, alignItems: "center" },
  deleteText: { color: "#fff", fontSize: 16, fontWeight: "bold" },
});