# 🚀 Ultra Beginner Guide — Create an Application (No Experience Needed)

This guide is made for **complete beginners**. Even if you **have never coded before**, you can follow every step.

---

## 🧰 Before You Start — Install the Basic Tools

### 1️⃣ Install Node.js

> **Node.js** is a tool that lets you run JavaScript applications on your computer.

1. Go to the official website: [nodejs.org](https://nodejs.org)
2. Click the green “Download (LTS)” button  
   *(Add a screenshot of the Download button here)*
3. Open the downloaded file and install it (just click “Next” until the end)
4. To check the installation:
   - Open the **terminal** (on Windows, search for “Command Prompt” or “Terminal” in the Start menu)
   - Type:
     ```
     node -v
     ```
   - If you see a version number (e.g., v20.0.0), it’s working!

> **Tip:** If you get an error, try installing again or make sure you downloaded the “LTS” version.

---

### 2️⃣ Install **Git** (optional but recommended)

> **Git** helps you save and share your code easily.

1. Go to: [git-scm.com/downloads](https://git-scm.com/downloads)
2. Download and install (just click “Next” until “Finish”)
3. To check:
   - Open the terminal and type:
     ```
     git --version
     ```
   - If you see a version number, it’s working!

---

## 📱 1. Create a **Flutter** Application (mobile & web)

### a) Install Flutter

> **Flutter** lets you build apps for Android, iOS, and the web with the same code.

1. Go to: [docs.flutter.dev/get-started/install](https://docs.flutter.dev/get-started/install)
2. Download the **Flutter SDK** for your system (Windows, Mac, Linux)
3. Follow the official installation tutorial  
   *(Add a screenshot of the SDK download here)*

### b) Create and Run the App

1. Open the terminal
2. Type:
   ```
   flutter create my_flutter_app
   cd my_flutter_app
   flutter run
   ```
3. The app will start on an emulator or your phone (depending on your setup)

> **Tip:** If you get an error, check that Flutter is installed and your phone or emulator is connected.

---

## 🌐 2. Create a **React Web App (with Vite)**

> **React** is a tool for building interactive websites.  
> **Vite** helps you start a React project quickly.

1. Open the terminal
2. Type:
   ```
   npm create vite@latest my-react-app -- --template react
   cd my-react-app
   npm install
   npm run dev
   ```
3. Open the link shown in the terminal (e.g., http://localhost:5173) in your browser

> **Tip:** If you get an error, make sure Node.js is installed.

---

## 📲 3. Create a **React Native Mobile App (with Expo)**

> **React Native** lets you build mobile apps with JavaScript.  
> **Expo** makes creating and testing apps easier.

1. Open the terminal
2. Type:
   ```
   npm install --global expo-cli
   expo init my-expo-app
   cd my-expo-app
   expo start
   ```
3. Scan the QR code with your phone (you need the **Expo Go** app from the Play Store / App Store)

> **Tip:** If you don’t see the QR code, make sure you’re in the project folder and Expo is installed.

---

## 🆘 FAQ & Tips

- **Can’t find the terminal?** On Windows, search for “Command Prompt” or “Terminal” in the Start menu.
- **A command doesn’t work?** Check that the tools are installed, restart the terminal, or reboot your computer.
- **Need help?** Search on Google or ask on [Stack Overflow](https://stackoverflow.com/).

---

## 🎉 Quick Summary

| Technology            | Creation Command                                         |
|-----------------------|---------------------------------------------------------|
| Flutter               | `flutter create my_flutter_app`                         |
| React Web (Vite)      | `npm create vite@latest my-react-app -- --template react`|
| React Native (Expo)   | `expo init my-expo-app`                                 |

---

## Next Steps

Once you have finished the installation, you can start integrating the required Devaito APIs by going to the **API Management** section.


