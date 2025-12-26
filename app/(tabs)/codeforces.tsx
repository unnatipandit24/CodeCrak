import { useEffect, useState } from "react";
import { View, Text, TextInput, TouchableOpacity, Alert, ActivityIndicator } from "react-native";
import { auth, db } from "@/src/firebase.config";
import { doc, getDoc, setDoc } from "firebase/firestore";
import { CodeforcesStats, getCodeforcesStats } from "@/src/codeforcesapi";

export default function Codeforces() {
  const [username, setUsername] = useState("");
  const [stats, setStats] = useState<CodeforcesStats | null>(null);
  const [loading, setLoading] = useState(false);

  const uid = auth.currentUser?.uid;

  // Load username from Firestore
  useEffect(() => {
    const loadUsername = async () => {
      if (!uid) return;
      const snap = await getDoc(doc(db, "users", uid));
      if (snap.exists()) {
        setUsername(snap.data()?.codeforces?.username || "");
      }
    };
    loadUsername();
  }, [uid]);

  // Fetch stats
  const fetchStats = async () => {
    if (!username) {
      Alert.alert("Error", "Enter your Codeforces username first");
      return;
    }
    setLoading(true);
    const data = await getCodeforcesStats(username);
    if (!data) Alert.alert("Error", "Failed to fetch stats");
    setStats(data);
    setLoading(false);

    // Store username in Firestore
    if (uid) {
      await setDoc(
        doc(db, "users", uid),
        { codeforces: { username } },
        { merge: true }
      );
    }
  };

  return (
    <View style={{ flex: 1, padding: 20, backgroundColor: "#f5d0c5" }}>
      <TextInput
        placeholder="Enter Codeforces username"
        value={username}
        onChangeText={setUsername}
        style={{
          backgroundColor: "white",
          padding: 12,
          borderRadius: 10,
          marginBottom: 10,
        }}
      />
      <TouchableOpacity
        onPress={fetchStats}
        style={{ backgroundColor: "#E0745E", padding: 12, borderRadius: 10, marginBottom: 20 }}
      >
        <Text style={{ textAlign: "center", color: "white", fontWeight: "bold" }}>
          Fetch Stats
        </Text>
      </TouchableOpacity>

      {loading && <ActivityIndicator size="large" color="#E0745E" />}

      {stats && (
        <View>
          <Text rounded->Max Rating: {stats.maxRating}</Text>
          <Text>Max Rank: {stats.maxRank}</Text>
        </View>
      )}
    </View>
  );
}
