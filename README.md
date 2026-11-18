# FantasyLab6 – Visual Effects and Animations

## Project Description

This project is a simple medieval fantasy game start screen. It was created with React Native, Expo and TypeScript for Laboratory 6.

The main purpose of this project is to learn how to use animations, custom fonts, images and screen orientation in a mobile application.

## Features

- Medieval wooden background
- Game title and version loaded from a text file
- MedievalSharp font using the useFonts hook
- Two animated torches using Lottie JSON
- A flying dragon animation
- The dragon moves from left to right every 5 seconds with a random path
- Portrait screen orientation
- Start Game button with a press effect
- Error handling for invalid game information

## Technologies

- React Native
- Expo
- TypeScript
- React Native Animated API
- Lottie React Native
- Expo Font
- Expo File System
- Expo Screen Orientation

## How It Works

The application reads the game title, version and subtitle from gameInfo.txt.

The useFonts hook loads a medieval-style font. Lottie displays two burning torches on the screen.

The Animated API moves the dragon across the background. Every 5 seconds, the dragon starts a new flight with a random path.

The Start Game button changes its appearance when pressed.

If the game information is invalid, the application uses default values and shows a warning message.

## How to Run

1. Install dependencies:

   `npm install`

2. Start the Expo server:

   `npx expo start`

3. Open the application with Expo Go or an emulator.

## Conclusion

In this laboratory, I learned how to use animations and visual effects in React Native. I also learned how to load text files, use custom fonts and control screen orientation.