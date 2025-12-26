import { View, Text, TextInput, TouchableOpacity, Alert } from "react-native";
import { useState } from "react";
import { signInWithEmailAndPassword } from "firebase/auth";
import { router } from "expo-router";
import { auth } from "@/src/firebase.config";

export default function Index() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleLogin = async () => {
    if (!email || !password) {
      Alert.alert("Error", "Please fill all fields");
      return;
    }

    try {
      setLoading(true);
      const userCredential = await signInWithEmailAndPassword(
        auth,
        email,
        password
      );

      console.log("Logged in:", userCredential.user.email);

      
      router.replace("/(tabs)/profile");
    } catch (error: any) {
      Alert.alert("Login Failed", error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <View className="flex-1 bg-clay justify-center px-6">
      <Text className="text-4xl font-bold text-almond text-center mb-2 pb-4">
        CodeCrak
      </Text>

      <TextInput
        placeholder="Email"
        placeholderTextColor="#050609"
        className="bg-white text-black borderColor-black px-4 py-3 rounded-xl mb-4"
        keyboardType="email-address"
        autoCapitalize="none"
        value={email}
        onChangeText={setEmail}
      />

      <TextInput
        placeholder="Password"
        placeholderTextColor= "#050609"
        className="bg-white text-black borderColor-black px-4 py-3 rounded-xl mb-4"
        secureTextEntry
        value={password}
        onChangeText={setPassword}
      />

      <TouchableOpacity
        className="bg-almond py-3 rounded-xl"
        onPress={handleLogin}
        disabled={loading}
      >
        <Text className="text-center ">
          {loading ? "Logging in..." : "Login"}
        </Text>
      </TouchableOpacity>

      {/* Signup Link */}
      <Text className="text-white text-center mt-6">
        Don’t have an account?{" "}
        <Text
          className="text-almond font-semibold"
          onPress={() => router.push("/signup")}
        >
          Sign Up
        </Text>
      </Text>
    </View>
  );
}
