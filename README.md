# Expo_go-Burger-App

CRED Operations in Expo go - Burger App

## Overview

Burger Days is a fully functional Expo-based burger ordering app designed for both Android and iOS. With real-time data integration via Firebase Firestore, users can browse the menu, add items to their cart, and place orders effortlessly. Built with React Native, Expo, and TypeScript, this app offers an engaging and modern user experience for ordering burgers on the go.

## Special Features

- **Real-time Menu Updates:**  
  Automatically reflects changes from the Firebase Firestore database, ensuring users always see the latest menu.

- **Customizable Cart & Order Process:**  
  Adjust item quantities directly from both the Menu and Cart screens. A non-interactive toast message confirms items are added to the cart.

- **Seamless Navigation:**  
  Built using React Navigation for smooth transitions between screens (Menu, Cart, Order Confirmation, etc.).

- **Cross-Platform Compatibility:**  
  Developed with Expo and React Native, ensuring the app works on both Android and iOS devices.

## Technology Stack

- **React Native**
- **Expo SDK (v52.0.37)**
- **Firebase (v11.3.1)**
- **React Navigation (Bottom Tabs v7.2.0, Stack v7.1.1)**
- **TypeScript**

## Prerequisites

- **Node.js & npm:**  
  Ensure Node.js is installed. Verify your versions with:
  ```bash
  node --version
  npm --version
  ```

## Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/YOUR_USERNAME/burger_days.git
   cd burger_days
   ```

2. Install the dependencies:

   ```bash
   npm install
   ```

3. Configure Firebase:

   Update `firebase.ts` with your Firebase project configuration:

   ```ts
   // firebase.ts
   const firebaseConfig = {
     apiKey: "YOUR_API_KEY",
     authDomain: "YOUR_AUTH_DOMAIN",
     projectId: "YOUR_PROJECT_ID",
     storageBucket: "YOUR_STORAGE_BUCKET",
     messagingSenderId: "YOUR_MESSAGING_SENDER_ID",
     appId: "YOUR_APP_ID",
   };
   ```

## Running the App

To start the development server, run:

```bash
npx expo start
```

This command starts the Expo development server, allowing you to run the app on your device or simulator:

Android: expo start --android
iOS: expo start --ios
Web: expo start --web

## Firebase Setup

1. Create a Firebase project in the [Firebase Console](https://console.firebase.google.com/).

2. Add a Firestore database to your project and create a collection called `items`. Each document in the collection should include at least the following fields:

   - `name`: The name of the burger.
   - `imgUrl`: A URL pointing to an image of the burger.
   - `desc`: A description of the burger.

3. Replace the Firebase configuration in `firebase.ts` with your project's configuration.

## npm & Expo SDK Versions

1. npm: (Ensure you are using your current local npm version)
2. Expo SDK: v52.0.37
3. Firebase: v11.3.1
4. React Navigation: Bottom Tabs v7.2.0, Stack v7.1.1

## Working

[![Watch the Demo](https://img.youtube.com/vi/S5lp1sMSfJ4/0.jpg)](https://www.youtube.com/watch?v=S5lp1sMSfJ4)

