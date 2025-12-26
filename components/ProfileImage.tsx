import { useState } from "react";
import { View, TouchableOpacity, Image } from "react-native";
import * as ImagePicker from "expo-image-picker";
import { Ionicons } from "@expo/vector-icons";

export default function ProfileImage() {
  const [image, setImage] = useState<string | null>(null);

  // Pick image (LOCAL ONLY)
  const pickImage = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 0.7,
    });

    if (!result.canceled) {
      setImage(result.assets[0].uri);
    }
  };

  return (
    <View className="relative">
      {/* Avatar */}
      <View
        style={{
          width: 120,
          height: 120,
          borderRadius: 60,
          backgroundColor: "#E5E7EB",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        {image ? (
          <Image
            source={{ uri: image }}
            style={{
              width: 120,
              height: 120,
              borderRadius: 60,
            }}
          />
        ) : (
          <Ionicons name="person" size={64} color="#9CA3AF" />
        )}
      </View>

      {/* Pencil Icon */}
      <TouchableOpacity
        onPress={pickImage}
        style={{
          position: "absolute",
          bottom: 5,
          right: 5,
          backgroundColor: "#111827",
          padding: 8,
          borderRadius: 20,
        }}
      >
        <Ionicons name="pencil" size={16} color="white" />
      </TouchableOpacity>
    </View>
  );
}
