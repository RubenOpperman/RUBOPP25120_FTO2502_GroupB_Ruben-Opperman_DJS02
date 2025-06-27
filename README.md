# 🎧 Podcast Explorer App

A responsive web application that showcases podcasts using dynamic rendering and modular JavaScript. Built with **Javascript**, **TailwindCSS**, and a clean, component-based architecture.

## 🚀 Features

- 🎙️ Listens-friendly podcast cards with cover image, title, and genre tags
- 📅 "Time ago" last updated info for each podcast
- 📂 Modal popup with full description, genre tags, and season breakdown
- 🎨 Responsive layout using TailwindCSS
- 📁 Modular codebase for maintainability (renderers, data manager, entry point)

## 🧱 Project Structure

```
DJS01/
├── assets/                    # Static assets (icons, images, etc.)
├── node_modules/              # Project dependencies (auto-generated)
├── src/
│   ├── scripts/               # Modular JavaScript files
│   │   ├── dataManager.js         # Utility functions (genres, dates, rendering)
│   │   ├── initialData.js         # Podcast, genres, and seasons data
│   │   ├── main.js                # App entry point
│   │   ├── renderModal.js         # Modal logic and UI rendering
│   │   └── renderPodcasts.js      # Podcast card rendering
│   ├── input.css              # TailwindCSS source file
│   └── output.css             # Compiled CSS
├── .gitignore                 # Git ignored files
├── index.html                 # Main HTML file
├── package.json               # Project metadata and scripts
├── package-lock.json          # Dependency lock file
└── README.md                  # Project documentation

```

## 🧪 Tech Stack

- **HTML5**
- **TailwindCSS**
- **Vanilla JavaScript (ES6 Modules)**

## 🛠️ Setup Instructions

1. Clone the repository:

```bash
git clone https://github.com/RubenOpperman/RUBOPP25120_FTO2502_GroupB_Ruben-Opperman_DJS01.git
```

2. Open the program and run on live server.
