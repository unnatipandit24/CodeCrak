import { View, Text, TextInput, TouchableOpacity, FlatList, Alert, ScrollView } from 'react-native';
import React, { useState, useEffect } from 'react';
import { Ionicons } from '@expo/vector-icons';
import { auth, db } from "@/src/firebase.config";
import { doc, getDoc, setDoc } from "firebase/firestore";

type Project = {
  id: string;
  title: string;
  summary: string;
  url: string;
};

export default function Projects() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [title, setTitle] = useState('');
  const [summary, setSummary] = useState('');
  const [url, setUrl] = useState('');


  useEffect(() => {
    const loadProjects = async () => {
      const uid = auth.currentUser?.uid;
      if (!uid) return;

      const snap = await getDoc(doc(db, "users", uid));
      if (snap.exists()) {
        const data = snap.data();
        setProjects(data?.projects || []);
      }
    };

    loadProjects();
  }, []);


  const addProject = async () => {
    if (!title || !summary || !url) {
      Alert.alert('Error', 'Please fill all fields');
      return;
    }

    if (projects.length >= 3) {
      Alert.alert('Limit Reached', 'You can only add up to 3 projects');
      return;
    }

    const newProject: Project = {
      id: Date.now().toString(),
      title,
      summary,
      url,
    };

    const updatedProjects = [...projects, newProject];
    setProjects(updatedProjects);

    // Save to Firestore
    const uid = auth.currentUser?.uid;
    if (uid) {
      await setDoc(
        doc(db, "users", uid),
        { projects: updatedProjects },
        { merge: true }
      );
    }

    setTitle('');
    setSummary('');
    setUrl('');
  };


  const deleteProject = async (id: string) => {
    const updatedProjects = projects.filter((project) => project.id !== id);
    setProjects(updatedProjects);

    const uid = auth.currentUser?.uid;
    if (uid) {
      await setDoc(
        doc(db, "users", uid),
        { projects: updatedProjects },
        { merge: true }
      );
    }
  };

  return (
    <ScrollView contentContainerStyle={{ padding: 20, backgroundColor: "#f5d0c5", flexGrow: 1 }}>
      <Text className="text-4xl font-bold text-clay mb-6 text-center pb-10">My Projects</Text>

      <TextInput
        placeholder="Project Title"
        placeholderTextColor="#ccc"
        value={title}
        onChangeText={setTitle}
        className="bg-white text-black px-4 py-3 rounded-xl mb-4 border border-black"
      />
      <TextInput
        placeholder="Project Description"
        placeholderTextColor="#ccc"
        value={summary}
        onChangeText={setSummary}
        className="bg-white text-black px-4 py-3 rounded-xl mb-4 border border-black"
      />
      <TextInput
        placeholder="Project URL"
        placeholderTextColor="#ccc"
        value={url}
        onChangeText={setUrl}
        className="bg-white text-black px-4 py-3 rounded-xl mb-4 border border-black"
      />

      <TouchableOpacity
        onPress={addProject}
        className="py-3 rounded-xl mb-6 bg-clay"
      >
        <Text className="text-center font-bold text-almond">
          Add Project
        </Text>
      </TouchableOpacity>

      {/* Display Projects */}
      {projects.length > 0 && (
        <FlatList
          data={projects}
          keyExtractor={(item) => item.id}
          renderItem={({ item, index }) => (
            <View className="flex-row justify-between items-start bg-mahogany p-4 rounded-xl mb-4 border border-almond">
              <View className="flex-1 pr-2">
                <Text className="text-almond font-bold text-lg">
                  {index + 1}. {item.title}
                </Text>
                <Text className="text-white my-1">{item.summary}</Text>
                <Text className="text-blue-400">{item.url}</Text>
              </View>
              <TouchableOpacity onPress={() => deleteProject(item.id)}>
                <Ionicons name="trash-outline" size={24} color="#E0745E" />
              </TouchableOpacity>
            </View>
          )}
        />
      )}
    </ScrollView>
  );
}
