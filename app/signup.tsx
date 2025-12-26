import { View, Text, TextInput, TouchableOpacity, Alert } from "react-native";
import { useState } from "react";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { router } from "expo-router";
import { doc, setDoc } from "firebase/firestore";
import { db, auth } from "@/src/firebase.config";


export default function Signup() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSignup = async () => {
    if (!email || !password || !confirmPassword) {
      Alert.alert("Error", "Please fill all fields");
      return;
    }

    if (password !== confirmPassword) {
      Alert.alert("Error", "Passwords do not match");
      return;
    }

    if (password.length < 8) {
      Alert.alert("Error", "Password must be at least 8 characters");
      return;
    }

    try {
      setLoading(true);
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );

      const user = userCredential.user;

      if (user) {
        await setDoc(doc(db, "users", user.uid), {
          profile: {
            name: "",
            role: "",
            summary: "",
          },
        });

      }


      console.log("User created:", userCredential.user.email);

      router.replace("/(tabs)/profile");
    } catch (error: any) {
      Alert.alert("Signup Failed", error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <View className="flex-1 bg-clay justify-center px-6">
      <Text className="text-4xl font-bold text-almond text-center mb-2 pb-4">
        Create Account
      </Text>

      <TextInput
        placeholder="Email"
        placeholderTextColor="#050609"
        className="bg-white text-black px-4 py-3 rounded-xl mb-4"
        keyboardType="email-address"
        autoCapitalize="none"
        value={email}
        onChangeText={setEmail}
      />

      <TextInput
        placeholder="Password"
        placeholderTextColor="#050609"
        className="bg-white text-black px-4 py-3 rounded-xl mb-4"
        secureTextEntry
        value={password}
        onChangeText={setPassword}
      />

      <TextInput
        placeholder="Confirm Password"
        placeholderTextColor="#050609"
        className="bg-white text-black px-4 py-3 rounded-xl mb-6"
        secureTextEntry
        value={confirmPassword}
        onChangeText={setConfirmPassword}
      />

      <TouchableOpacity
        className="bg-almond py-3 rounded-xl"
        onPress={handleSignup}
        disabled={loading}
      >
        <Text className="text-center font-semibold">
          {loading ? "Creating account..." : "Sign Up"}
        </Text>
      </TouchableOpacity>

      {/* Login Link */}
      <Text className="text-white text-center mt-6">
        Already have an account?{" "}
        <Text
          className="text-almond font-semibold"
          onPress={() => router.back()}
        >
          Login
        </Text>
      </Text>
    </View>
  );
}
