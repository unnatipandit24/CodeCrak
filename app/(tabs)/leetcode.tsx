import { View, Text, TextInput, TouchableOpacity, ActivityIndicator, ScrollView, Alert } from "react-native";
import { useState } from "react";
import { getLeetCodeStats } from "@/src/leetcodeapi";


export default function LeetCode() {
  const [username, setUsername] = useState("");
  const [stats, setStats] = useState<any>(null);
  const [loading, setLoading] = useState(false);

  const fetchStats = async () => {
    if (!username) {
      Alert.alert("Error", "Please enter your LeetCode username");
      return;
    }

    try {
      setLoading(true);
      const data = await getLeetCodeStats(username);
      setStats(data);
    } catch (error) {
      Alert.alert("Error", "Failed to fetch stats");
    } finally {
      setLoading(false);
    }
  };

  return (
    <ScrollView contentContainerStyle={{ padding: 20, backgroundColor: "#f5d0c5", flexGrow: 1 }}>
      <TextInput
        placeholder="Enter LeetCode Username"
        value={username}
        onChangeText={setUsername}
        style={{
          backgroundColor: "white",
          padding: 10,
          borderRadius: 10,
          marginBottom: 10,
        }}
      />
      <TouchableOpacity
        onPress={fetchStats}
        style={{
          backgroundColor: "mahogany",
          padding: 10,
          borderRadius: 10,
          marginBottom: 20,
        }}
      >
        <Text style={{ color: "white", textAlign: "center", fontWeight: "bold" }}>Fetch Stats</Text>
      </TouchableOpacity>

      {loading && <ActivityIndicator size="large" color="mahogany" />}

      {stats && (
        <View>
          <Text style={{ fontSize: 18, fontWeight: "bold" }}>LeetCode Stats for {username}</Text>
          <Text>Total Questions Solved: {stats.totalSolved}</Text>
          <Text>Easy: {stats.easySolved}</Text>
          <Text>Medium: {stats.mediumSolved}</Text>
          <Text>Hard: {stats.hardSolved}</Text>
          <Text>Contest Rating: {stats.rating}</Text>
        </View>
      )}
    </ScrollView>
  );
}
