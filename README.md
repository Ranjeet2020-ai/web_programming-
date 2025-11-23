# React Hooks Media Gallery

A modern React application demonstrating React Hooks, API integration, and responsive design.

## Features

- 📱 Responsive design
- 🎣 React Hooks (useState, useEffect)
- 🌐 API integration with error handling
- 📊 Media gallery with user information
- 🔍 Detailed media view

## Setup

1. Install dependencies:
\`\`\`bash
npm install
\`\`\`

2. Start development server:
\`\`\`bash
npm run dev
\`\`\`

3. Build for production:
\`\`\`bash
npm run build
\`\`\`

## Environment Variables

Create \`.env.local\` file:
\`\`\`env
VITE_MEDIA_API=https://media2.edu.metropolia.fi/media-api/api/v1
VITE_AUTH_API=https://media2.edu.metropolia.fi/auth-api/api/v1
\`\`\`

## Project Structure

\`\`\`
src/
├── components/     # React components
├── views/         # Page components
├── lib/           # Utility functions
└── App.jsx        # Main app component
\`\`\`

## Git Commands

\`\`\`bash
# Create and switch to hooks branch
git checkout -b hooks

# Add all files
git add .

# Commit changes
git commit -m "feat: implement React hooks with API integration"

# Push to GitHub
git push origin hooks
\`\`\`
