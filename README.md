# CodeCrak

CodeCrak is a **developer-focused mobile application** that helps students and early-career engineers present their **coding profiles, skills, and personality** in one unified platform. The app bridges the gap between **candidates and recruiters** by combining competitive programming stats, and video introductions into a single shareable profile.

---

## Problem Statement

Recruiters often rely only on resumes, which fail to reflect a candidate’s **actual coding consistency, problem-solving skills, and growth** across platforms like LeetCode and Codeforces. Candidates, on the other hand, struggle to present all their achievements in one place.

**CodeCrak solves this by creating a single, verified developer profile powered by real-time data.**

---

## ✨ Key Features

* 🔐 **Secure Authentication** using Firebase (Login / Signup)
* 📊 **LeetCode Profile Integration**

  * Problems solved
  * Easy / Medium / Hard breakdown
  * Contest rating & ranking
* 🏁 **Codeforces Profile Integration**

  * Current rating
  * Global ranking
  * Total problems solved
* 📄 **Resume Upload & Profile Builder**
* 🎥 **Video Introduction** to showcase communication skills
* 🧑‍💼 **Role-based Profiles** (Student / Recruiter)
* ☁️ **Persistent Data Storage** using Firebase

---

## 🛠 Tech Stack

### Frontend

* **React Native**
* **TypeScript**
* **Expo**

### Backend & Services

* **Firebase Authentication**
* **Firebase Firestore**

### APIs Used

* **LeetCode API** (via community wrapper)
* **Codeforces Official API**

---

## 🏗 App Architecture

* Modular API layer (`leetcodeApi.ts`, `codeforcesApi.ts`)
* Firebase used for:

  * User authentication
  * Storing usernames, roles, and profile metadata
* Platform stats fetched dynamically using usernames
* Clean separation of:

  * UI Components
  * API Services
  * Screens & Navigation

---

## 📱 Screens Implemented

* Login / Signup Screen
* Profile Setup Screen
* Competitive Programming Dashboard
* Project Display Dashboard
* Video Introduction Upload
* Recruiter View (read-only candidate profiles)

---

## 🔒 Security & Best Practices

* Sensitive keys stored in `.env` (not committed)
* Firebase rules to restrict unauthorized access
* API calls handled via service layers

---

## 🎯 Use Cases

* Students showcasing verified coding skills
* Recruiters filtering candidates based on real performance
* Hackathon participants sharing live coding stats
* Portfolio alternative for software engineers

---

## 🚧 Future Enhancements

* GitHub profile integration
* Skill-based candidate ranking
* In-app messaging between recruiters and candidates
* AI-based profile analysis & suggestions

---

