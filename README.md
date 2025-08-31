# 🚀 Codemurf Labs
### Next.js Website + VS Code Extension Monorepo

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![Next.js](https://img.shields.io/badge/Next.js-15.3.3-black)](https://nextjs.org/)
[![React](https://img.shields.io/badge/React-18.3.1-blue)](https://reactjs.org/)
[![VS Code Extension](https://img.shields.io/badge/VS%20Code-Extension-007ACC)](https://code.visualstudio.com/)

## 📋 Project Overview

**Codemurf Labs** is a comprehensive development platform that combines:
- 🌐 **Modern Next.js Website** - Professional web presence with advanced features
- 🔧 **VS Code Extension** - Powerful IDE extension for enhanced development experience

## 🏗️ Project Structure

```
codemurf-labs/
├── 📁 website/                    # Next.js Website (Current Directory)
│   ├── src/
│   │   ├── app/                   # App Router (Next.js 13+)
│   │   ├── components/            # Reusable React Components
│   │   └── lib/                   # Utilities & Libraries
│   ├── public/                    # Static Assets
│   └── package.json
├── 📁 extension/                  # VS Code Extension (To be created)
│   ├── src/                       # Extension Source Code
│   ├── package.json
│   └── README.md
├── 📁 docs/                       # Documentation
├── .gitignore                     # Git Ignore Rules
└── README.md                      # This File
```

## 🚀 Quick Start

### Prerequisites
- Node.js 18+ 
- npm or yarn
- VS Code
- Git

### 🌐 Website Development

```powershell
# Navigate to project root
cd "d:\Codemurf\gennext"

# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build
```

### 🔧 Extension Development (Coming Soon)

```powershell
# Navigate to extension directory
cd extension

# Install dependencies
npm install

# Compile extension
npm run compile

# Open in Extension Development Host
code --extensionDevelopmentPath .
```

## 🛠️ Available Scripts

### Website Scripts
- `npm run dev` - Start development server with Turbopack
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run lint` - Run ESLint

### Extension Scripts (Coming Soon)
- `npm run compile` - Compile TypeScript
- `npm run watch` - Watch mode for development
- `npm run test` - Run tests
- `npm run package` - Package extension (.vsix)

## 🔐 Git Repository Setup Guide

### 1. GitHub Authentication Setup
```powershell
# Install GitHub CLI
winget install GitHub.cli

# Login to GitHub
gh auth login

# Setup SSH (Recommended)
ssh-keygen -t ed25519 -C "your-email@example.com"
```

### 2. Repository Creation
```powershell
# Create private repository
gh repo create codemurf-labs --private --description "Next.js Website + VS Code Extension"

# Add remote origin
git remote add origin https://github.com/yourusername/codemurf-labs.git
```

### 3. VS Code Git Integration
```json
// .vscode/settings.json
{
  "git.autofetch": true,
  "git.confirmSync": false,
  "git.enableSmartCommit": true,
  "git.postCommitCommand": "push"
}
```

## 🔐 Security & Authentication

This repository uses advanced Git authentication:
- 🔒 **Private Repository** - Full privacy protection
- 🎫 **Personal Access Tokens** - Secure authentication
- 🌐 **GitHub CLI Integration** - Seamless VS Code integration
- 🔑 **SSH Key Support** - Enhanced security

## 📚 Technology Stack

### Website
- **Framework**: Next.js 15.3.3
- **UI Library**: React 18.3.1
- **Styling**: Tailwind CSS 4
- **Animations**: Framer Motion, Lottie
- **Icons**: Tabler Icons, Lucide React

### Extension (Coming Soon)
- **Language**: TypeScript
- **Framework**: VS Code Extension API
- **Build Tool**: webpack
- **Testing**: Mocha

## 🤝 Contributing

1. Fork the repository
2. Create feature branch (`git checkout -b feature/amazing-feature`)
3. Commit changes (`git commit -m 'Add amazing feature'`)
4. Push to branch (`git push origin feature/amazing-feature`)
5. Open Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🔗 Links

- [Website Demo](https://codemurf.com)
- [Extension Marketplace](https://marketplace.visualstudio.com/items?itemName=codemurf-labs.extension)
- [Documentation](./docs/README.md)

## 📞 Support

For support, email support@codemurf.com or join our [Discord](https://discord.gg/codemurf).

---

**Made with ❤️ by Codemurf Labs Team**
