import { View, Text, TouchableOpacity, Alert } from "react-native";
import * as ImagePicker from "expo-image-picker";
import { useState, useRef } from "react"; // Added useRef
import { Ionicons } from "@expo/vector-icons";
import { ResizeMode, Video, AVPlaybackStatus } from "expo-av"; 

export default function VideoIntroduction() {
    const [videoUri, setVideoUri] = useState<string | null>(null);

    // 1. Correctly type the status state
    const [status, setStatus] = useState<AVPlaybackStatus>({} as AVPlaybackStatus);

    // 2. Create a ref for the Video component
    const videoRef = useRef<Video>(null);

    const pickVideo = async () => {
        const result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Videos,
            allowsEditing: true,
            quality: 1,
        });

        if (!result.canceled) {
            setVideoUri(result.assets[0].uri);
        }
    };

    const recordVideo = async () => {
        const { status } = await ImagePicker.requestCameraPermissionsAsync();
        if (status !== "granted") return;

        const result = await ImagePicker.launchCameraAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Videos,
            videoMaxDuration: 60,
            quality: 1,
        });

        if (!result.canceled) {
            setVideoUri(result.assets[0].uri);
        }
    };

    // 3. Helper function for Play/Pause logic
    const handlePlayPause = () => {
        if (!videoRef.current) return;

        // Type guard: check if video is loaded before accessing .isPlaying
        if (status.isLoaded) {
            if (status.isPlaying) {
                videoRef.current.pauseAsync();
            } else {
                videoRef.current.playAsync();
            }
        }
    };

    const handleDeleteVideo = () => {
    Alert.alert(
        "Remove Video",
        "Are you sure you want to delete your video introduction?",
        [
            { text: "Cancel", style: "cancel" },
            {
                text: "Delete",
                style: "destructive",
                onPress: async () => {
                    if (videoRef.current) {
                        await videoRef.current.stopAsync();
                    }
                    setVideoUri(null);
                    setStatus({} as AVPlaybackStatus);
                },
            },
        ]
    );
};

    return (
        <View className="w-4/5 mt-4">
            <View className="bg-slate-100 border border-dashed border-slate-400 rounded-xl h-48 overflow-hidden justify-center items-center">
                {videoUri ? (
                    <>
                        <TouchableOpacity
                            activeOpacity={1}
                            className="w-full h-full"
                            onPress={handlePlayPause}
                        >
                            <Video
                                ref={videoRef} // Attached the ref
                                source={{ uri: videoUri }}
                                useNativeControls={false} // This REMOVES the black shadow
                                resizeMode={ResizeMode.COVER}
                                isLooping
                                shouldPlay
                                onPlaybackStatusUpdate={status => setStatus(status)}
                                style={{ width: "100%", height: "100%" }}
                            />

                            {/* 4. Optional: Add a subtle play icon overlay when paused */}
                            {status.isLoaded && !status.isPlaying && (
                                <View className="absolute inset-0 justify-center items-center bg-black/10">
                                    <Ionicons name="play-circle" size={50} color="white" />
                                </View>
                            )}
                        </TouchableOpacity>

                        <TouchableOpacity
                            onPress={handleDeleteVideo}
                            className="absolute top-2 left-2 bg-red-600/80 p-2 rounded-full z-10"
                        >
                            <Ionicons name="trash" size={18} color="white" />
                        </TouchableOpacity>
                        <TouchableOpacity
                            onPress={pickVideo}
                            className="absolute top-2 right-2 bg-black/70 p-2 rounded-full z-10"
                        >
                            <Ionicons name="pencil" size={18} color="white" />
                        </TouchableOpacity>
                    </>
                ) : (
                    <>
                        <Ionicons name="videocam" size={36} color="#475569" />
                        <Text className="font-semibold mt-2 text-slate-700">
                            Add Video Introduction
                        </Text>
                        <Text className="text-sm text-slate-500 text-center mt-1 px-4">
                            Record or upload a 30–60 sec intro video
                        </Text>

                        <View className="flex-row mt-4 gap-4">
                            <TouchableOpacity
                                onPress={recordVideo}
                                className="bg-black px-4 py-2 rounded-lg"
                            >
                                <Text className="text-white">Record</Text>
                            </TouchableOpacity>

                            <TouchableOpacity
                                onPress={pickVideo}
                                className="bg-slate-700 px-4 py-2 rounded-lg"
                            >
                                <Text className="text-white">Upload</Text>
                            </TouchableOpacity>
                        </View>
                    </>
                )}
            </View>
        </View>
    );
}