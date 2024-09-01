# TaskApp - React Native Frontend

This is the mobile frontend application for TaskApp developed with React Native. This project allows users to manage tasks through a user-friendly interface.

# Prerequisites

#### 1. Set Up Your Backend Environment Before setting up the frontend, make sure to configure the backend by following the instructions in the [reactNative_Backend repository](https://github.com/grpuertoa/reactNative_Backend). Refer to the README in that repository for details on configuring and running the backend.

Make sure you have the following installed on your computer:
 - **Node.js** (recommended LTS version): [Download Node.js](https://nodejs.org/) 
 - **Git**: [Download Git](https://git-scm.com/) - 
 - **Expo CLI**: This will be used to run and test the application.
	Expo CLI is used to manage your React Native projects. Install Expo CLI globally using npm:
	- `npm install -g expo-cli`
 - **Android Studio (recommended)**: Required for running an Android emulator: [Download ](https://developer.android.com/studio)..
 - **Java Development Kit (JDK)**: Required for Android development: JDK from the [official website](https://www.oracle.com/java/technologies/javase-downloads.html).
 
## Clone the Repository

Clone the frontend repository to your local machine using Git:

Set a desired directory for the repository

```bash 
git clone https://github.com/grpuertoa/reactNative.git
cd reactNative
```
## Install Project Dependencies

Navigate to the project directory root and install the required dependencies:

```bash 
npm install
```
## Set Up Environment Variables

Create a `.env` file in the taskApp folder in the project directory with the following content, having in mind this is just a test app and the following env works for en Android emulator:

First, go to the taskApp folder:
```bash 
cd taskApp
```
Then, create a .env file (make sure it doesn't have other extentions as .txt or any, just and only .env), and paste this content, then save:
```bash 
REACT_APP_API_URL=http://10.0.2.2:3000/api/
```
## Install and Configure Android Studio

1.  **Download Android Studio** from the [official website](https://developer.android.com/studio).
2.  **Install Android Studio** following the setup instructions.
3.  **Open Android Studio** and install the required Android SDK and emulator components.
4.  **Set Up the Android Emulator**:
    -   Go to "Tools" > "AVD Manager".
    -   Create a new virtual device or use an existing one.
    -   Start the emulator.
    - 
## Install  JDK 

You can download the JDK from the [official website](https://www.oracle.com/java/technologies/javase-downloads.html) and follow the installation process.

## Configure Environment Variables

You need to configure the following environment variables on your machine:

-   **`ANDROID_HOME`**: This should point to the directory where the Android SDK is installed. By default, it is usually located at:
    
    -   **macOS**: `/Users/<YourUsername>/Library/Android/sdk`
    -   **Windows**: `C:\Users\<YourUsername>\AppData\Local\Android\Sdk`
    -   **Linux**: `/home/<YourUsername>/Android/Sdk`
-   **`JAVA_HOME`**: This should point to the directory where the JDK is installed. The default path is usually something like:
    
    -   **Windows**: `C:\Program Files\Java\jdk<version>`
    -   **macOS/Linux**: `/usr/lib/jvm/java-<version>`

To set these variables on **Windows**:

1.  Open System Properties (Control Panel > System and Security > System).
2.  Click "Advanced system settings".
3.  Click "Environment Variables".
4.  Add new user variables for `ANDROID_HOME` and `JAVA_HOME` with name and location as explained before.

To set these variables on **macOS/Linux**:

1.  Open a terminal.
    
2.  Edit your shell profile file (`.bashrc`, `.zshrc`, etc.) and add the following lines:

```bash 
export ANDROID_HOME=/path/to/android-sdk 
export JAVA_HOME=/path/to/java-sdk 
export PATH=$PATH:$ANDROID_HOME/tools:$ANDROID_HOME/platform-tools
```
3. Save the file and run `source ~/.bashrc` or `source ~/.zshrc` to apply the changes.

## Run the App on the Emulator

Use Expo to run the app on your Android emulator while the emulator is already running on Android Studio:
inside the reactNative folder:
make sure you are inside taskApp folder and run:

```bash 
npx expo start -c
```

This command will open Expo DevTools in your terminal, and you can choose to run the app on an Android emulator from there.
