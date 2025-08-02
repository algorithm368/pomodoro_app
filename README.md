# 🍅 Zen Pomodoro

A beautiful, minimal Pomodoro timer app built with React Native and Expo. Designed for focused productivity with a zen-inspired user interface.

![Platform Support](https://img.shields.io/badge/platform-iOS%20%7C%20Android%20%7C%20Web-blue)
![React Native](https://img.shields.io/badge/React%20Native-0.79.5-blue)
![Expo](https://img.shields.io/badge/Expo-~53.0.20-black)
![TypeScript](https://img.shields.io/badge/TypeScript-~5.8.3-blue)

## ✨ Features

- **🎯 Focus Timer**: Traditional 25-minute Pomodoro sessions
- **☕ Smart Breaks**: Automatic short (5min) and long (15min) breaks
- **📊 Session Tracking**: Visual progress indicators for completed sessions
- **⚙️ Customizable**: Adjust timer durations to fit your workflow
- **🎨 Zen Design**: Minimal, distraction-free interface
- **📱 Cross-Platform**: Works on iOS, Android, and Web
- **🔄 Auto-Progression**: Seamless transitions between focus and break modes
- **🎉 Celebrations**: Gentle animations when completing sessions

## 🚀 Quick Start

### Prerequisites

- Node.js (v18 or higher)
- npm or yarn
- Expo CLI
- iOS Simulator / Android Emulator (optional)

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/algorithm368/pomodoro_app.git
   cd pomodoro-app
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start the development server**
   ```bash
   npm start
   ```

4. **Run on your device**
   - Scan the QR code with Expo Go app
   - Or press `i` for iOS simulator
   - Or press `a` for Android emulator
   - Or press `w` for web browser

## 📱 Usage

### Basic Operation

1. **Choose your mode**: Focus, Short Break, or Long Break
2. **Start the timer**: Tap the start button to begin your session
3. **Stay focused**: The timer counts down with a beautiful progress ring
4. **Take breaks**: The app automatically suggests breaks after focus sessions
5. **Track progress**: Visual dots show your completed Pomodoro sessions

### Customization

- Tap the **settings icon** (three dots) in the top-right corner
- Adjust timer durations for each mode:
  - **Focus Time**: Default 25 minutes
  - **Short Break**: Default 5 minutes  
  - **Long Break**: Default 15 minutes
- Changes apply immediately to your workflow

### The Pomodoro Technique

1. Work for 25 minutes (1 Pomodoro)
2. Take a 5-minute short break
3. Repeat steps 1-2 three more times
4. Take a 15-30 minute long break
5. Start the cycle again

## 🏗️ Architecture

The app follows a professional, modular architecture:

```
src/
├── components/          # Reusable UI components
│   ├── ModesSelector.tsx
│   ├── TimerDisplay.tsx
│   ├── TimerControls.tsx
│   ├── ProgressIndicator.tsx
│   ├── SettingsModal.tsx
│   └── index.ts
├── hooks/              # Custom React hooks
│   └── usePomodoro.ts  # Main timer logic
├── types/              # TypeScript definitions
│   └── timer.ts
├── constants/          # App constants and theme
│   ├── timer.ts
│   ├── theme.ts
│   └── index.ts
├── utils/              # Utility functions
│   └── timer.ts
├── styles/             # Centralized styling
│   └── pomodoro.ts
└── index.ts           # Main exports
```

## 🛠️ Tech Stack

- **Framework**: React Native with Expo
- **Language**: TypeScript
- **Graphics**: React Native SVG for progress circles
- **Styling**: Expo Linear Gradient for backgrounds
- **Navigation**: Expo Router
- **Development**: Hot reloading, TypeScript support
- **Cross-Platform**: iOS, Android, and Web support

## 📦 Key Dependencies

- `react-native`: ^0.79.5 - Core React Native framework
- `expo`: ~53.0.20 - Expo SDK for development and deployment
- `expo-linear-gradient`: ^14.1.5 - Beautiful gradient backgrounds
- `react-native-svg`: ^15.12.1 - SVG graphics for progress rings
- `typescript`: ~5.8.3 - Type safety and better development experience

## 🎨 Design Philosophy

The app embraces a **zen-inspired design** with:

- **Minimal Interface**: Clean, distraction-free layout
- **Subtle Animations**: Gentle transitions and feedback
- **Soft Colors**: Calming color palette for focus
- **Typography**: Clean, readable fonts with proper spacing
- **Responsive Design**: Adapts beautifully to different screen sizes

## 🔧 Development

### Available Scripts

- `npm start` - Start the Expo development server
- `npm run android` - Run on Android device/emulator
- `npm run ios` - Run on iOS device/simulator
- `npm run web` - Run in web browser
- `npm run lint` - Run ESLint for code quality

### Project Structure

- `/app` - Main application screens and routing
- `/src` - Modular source code (components, hooks, etc.)
- `/assets` - Images, fonts, and static resources
- `/constants` - App-wide constants and configuration

### Building for Production

1. **Build for Android**
   ```bash
   expo build:android
   ```

2. **Build for iOS**
   ```bash
   expo build:ios
   ```

3. **Build for Web**
   ```bash
   expo build:web
   ```

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

1. Fork the project
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- Inspired by the Pomodoro Technique® by Francesco Cirillo
- Zen design principles for mindful productivity
- React Native and Expo communities for excellent tools

## 📞 Support

If you have any questions or need help, please [open an issue](https://github.com/algorithm368/pomodoro_app/issues).

---

**Happy focusing! 🍅✨**