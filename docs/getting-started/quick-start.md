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

## 🌐 4. Create a **Vue.js** Web App (with Vite)

> **Vue.js** is a progressive JavaScript framework for building user interfaces.

1. Open your terminal  
2. Run:
   ```
   npm create vite@latest my-vue-app -- --template vue
   cd my-vue-app
   npm install
   npm run dev
   ```
3. Open the link shown in the terminal (e.g., http://localhost:5173) in your browser

---

## 🌐 5. Create an **Angular** Web App

> **Angular** is a popular framework for building web applications.

1. Open your terminal  
2. Run:
   ```
   npm install -g @angular/cli
   ng new my-angular-app
   cd my-angular-app
   ng serve
   ```
3. Open the link shown in the terminal (e.g., http://localhost:4200) in your browser

---

## 🧩 6. Create a Devaito Plugin Project

A plugin is a small app or module that adds new features to Devaito (for example: analytics, chat, payment, or custom integrations).  
To start building a plugin, you usually create a project in your favorite framework (React, Vue, Angular, etc.) and use the Devaito APIs.

**General steps:**

1. Choose your framework (React, Vue, Angular, etc.)
2. Follow the quick start instructions above to create your project
3. Use the [Devaito API documentation](../api-management/usage.md) to connect your plugin to Devaito
4. Add your custom logic and UI
5. Test your plugin locally
6. Prepare for publishing on the Devaito App Store

> For a full example, see the [API usage guide](../api-management/usage.md) for code samples in each framework.

---

## 💎 7. Create a Ruby Application

> **Ruby** is a dynamic programming language often used for web development (for example, with Ruby on Rails).

1. Open your terminal  
2. Run:
   ```
   gem install rails
   rails new my-ruby-app
   cd my-ruby-app
   rails server
   ```
3. Open the link shown in the terminal (e.g., http://localhost:3000) in your browser

> **Tip:** If you get an error, make sure Ruby and Rails are installed.  
> You can download Ruby from [ruby-lang.org](https://www.ruby-lang.org/en/downloads/) and follow the official installation guide.

---

## ⚡ 8. Create a Next.js Web App

> **Next.js** is a powerful React framework for building fast, modern web applications.

1. Open your terminal  
2. Run:
   ```
   npx create-next-app@latest my-next-app
   cd my-next-app
   npm run dev
   ```
3. Open the link shown in the terminal (e.g., http://localhost:3000) in your browser

---

## 🐘 9. Create a PHP Application

> **PHP** is a widely-used scripting language for web development.  
> You can use frameworks like Laravel or start with plain PHP.

**Laravel example:**

1. Open your terminal  
2. Run:
   ```
   composer create-project laravel/laravel my-php-app
   cd my-php-app
   php artisan serve
   ```
3. Open the link shown in the terminal (e.g., http://localhost:8000) in your browser

**Plain PHP example:**

1. Create a folder (e.g., `my-php-app`)
2. Add a file named `index.php` with:
   ```php
   <?php echo "Hello, Devaito!"; ?>
   ```
3. Start a local server (if you have PHP installed):
   ```
   php -S localhost:8000
   ```
4. Open [http://localhost:8000](http://localhost:8000) in your browser

---

## 🎉 Quick Summary

| Technology            | Creation Command                                         |
|-----------------------|---------------------------------------------------------|
| Flutter               | `flutter create my_flutter_app`                         |
| React Web (Vite)      | `npm create vite@latest my-react-app -- --template react`|
| React Native (Expo)   | `expo init my-expo-app`                                 |
| Vue.js Web (Vite)     | `npm create vite@latest my-vue-app -- --template vue`   |
| Angular Web           | `ng new my-angular-app`                                 |
| Ruby on Rails         | `rails new my-ruby-app`                                 |
| Next.js Web           | `npx create-next-app@latest my-next-app`                |
| Laravel (PHP)         | `composer create-project laravel/laravel my-php-app`    |

---

## Next Steps

Once you have finished the installation, you can start integrating the required Devaito APIs by going to the **API Management** section.


