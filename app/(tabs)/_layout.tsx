import { Tabs, useRouter } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import { TouchableOpacity, Alert } from "react-native";
import { auth } from "@/src/firebase.config";
import { signOut } from "firebase/auth";

export default function TabLayout() {
  const router = useRouter();

  const handleLogout = async () => {
    try {
      await signOut(auth);
      router.replace("/"); 
    } catch (error: any) {
      Alert.alert("Logout Failed", error.message);
    }
  };

  return (
    <Tabs
      screenOptions={{
        headerShown: true,
        tabBarActiveTintColor: "mahogany",
        tabBarInactiveTintColor: "gray",
        headerRight: () => (
          <TouchableOpacity
            style={{ marginRight: 15 }}
            onPress={handleLogout}
          >
            <Ionicons name="log-out-outline" size={24} color="black" />
          </TouchableOpacity>
        ),
      }}
    >
      <Tabs.Screen
        name="profile"
        options={{
          title: "Profile",
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="person" color={color} size={size} />
          ),
        }}
      />
      <Tabs.Screen
        name="leetcode"
        options={{
          title: "LeetCode",
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="logo-buffer" color={color} size={size} />
          ),
        }}
      />
      <Tabs.Screen
        name="codeforces"
        options={{
          title: "Codeforces",
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="code-slash" color={color} size={size} />
          ),
        }}
      />
      <Tabs.Screen
        name="projects"
        options={{
          title: "Projects",
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="folder" color={color} size={size} />
          ),
        }}
      />
    </Tabs>
  );
}
