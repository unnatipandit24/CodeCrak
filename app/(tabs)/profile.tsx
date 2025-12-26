import ProfileImage from "@/components/ProfileImage";
import VideoIntroduction from "@/components/videoIntroduction";
import { useEffect, useState } from "react";
import { TextInput, View, Alert, TouchableOpacity, Text } from "react-native";
import { doc, getDoc, setDoc } from "firebase/firestore";
import { auth, db } from "@/src/firebase.config";



export default function Profile() {
  const [name, setName] = useState("");
  const [role, setRole] = useState("");
  const [summary, setSummary] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const loadProfile = async () => {
      const uid = auth.currentUser?.uid;
      if (!uid) return;

      const snap = await getDoc(doc(db, "users", uid));

      if (snap.exists()) {
        const data = snap.data().profile || {};
        setName(data.name || "");
        setRole(data.role || "");
        setSummary(data.summary || "");
      }
    };

    loadProfile();
  }, []);

  const saveProfile = async () => {
    const uid = auth.currentUser?.uid;
    if (!uid) {
      Alert.alert("Error", "User not logged in");
      return;
    }

    try {
      setLoading(true);

      await setDoc(
        doc(db, "users", uid),
        {
          profile: {
            name,
            role,
            summary,
          },
        },
        { merge: true } 
      );

      Alert.alert("Success", "Profile updated");
    } catch (error) {
      console.log("Firestore save error:", error);
      Alert.alert("Error", "Failed to save profile");
    } finally {
      setLoading(false);
    }
  };




  return (
    <View className="flex-1 bg-almond">
      <View className="items-center pt-10 pb-10">
        <ProfileImage />
      </View>
      <View className="items-center">
        <TextInput
          placeholder="Name"
          value={name}
          onChangeText={setName}
          placeholderTextColor="#ccc"
          className="w-4/5 bg-white text-black px-4 py-3 rounded-xl mb-4"
        />

        <TextInput
          placeholder="Role / Position"
          value={role}
          onChangeText={setRole}
          placeholderTextColor="#ccc"
          className="w-4/5 bg-white text-black px-4 py-3 rounded-xl mb-4"
        />

        <TextInput
          placeholder="Work Experience Summary"
          value={summary}
          onChangeText={setSummary}
          placeholderTextColor="#ccc"
          multiline
          numberOfLines={5}
          textAlignVertical="top"
          className="w-4/5 bg-white text-black px-4 py-3 rounded-xl mb-4 h-32"
        />


        <VideoIntroduction />

        <TouchableOpacity
          onPress={saveProfile}
          className=" py-3 rounded-xl w-1/3 mb-6 mt-5"
        >
          <Text className="text-center text-clay font-semibold">
            {loading ? "Saving..." : "Save Profile"}
          </Text>
        </TouchableOpacity>


      </View>
    </View>
  );
}
