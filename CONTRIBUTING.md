# Contributing to Autogen Labs

First off, thank you for considering contributing to Autogen Labs! 🎉

## 📋 Table of Contents
- [Code of Conduct](#code-of-conduct)
- [Getting Started](#getting-started)
- [Development Process](#development-process)
- [Project Structure](#project-structure)
- [Pull Request Process](#pull-request-process)
- [Style Guidelines](#style-guidelines)

## 📜 Code of Conduct

This project and everyone participating in it is governed by our Code of Conduct. By participating, you are expected to uphold this code.

## 🚀 Getting Started

### Prerequisites
- Node.js (v18 or higher)
- npm or yarn
- VS Code (latest version)
- Git

### Local Development Setup

1. **Fork the repository**
2. **Clone your fork**
   ```powershell
   git clone https://github.com/YOUR_USERNAME/autogen-labs.git
   cd autogen-labs
   ```

3. **Install dependencies**
   ```powershell
   # Website dependencies
   npm install
   
   # Extension dependencies
   cd extension
   npm install
   cd ..
   ```

4. **Start development**
   ```powershell
   # Start Next.js dev server
   npm run dev
   
   # For extension development, press F5 in VS Code
   ```

## 🔄 Development Process

### Branch Naming Convention
- `feature/your-feature-name` - New features
- `bugfix/issue-description` - Bug fixes
- `docs/update-description` - Documentation updates
- `refactor/component-name` - Code refactoring

### Commit Message Convention
We follow the [Conventional Commits](https://www.conventionalcommits.org/) specification:

```
type(scope): description

[optional body]

[optional footer]
```

**Types:**
- `feat`: New feature
- `fix`: Bug fix
- `docs`: Documentation only changes
- `style`: Changes that don't affect meaning (white-space, formatting, etc)
- `refactor`: Code change that neither fixes a bug nor adds a feature
- `test`: Adding missing tests or correcting existing tests
- `chore`: Changes to build process or auxiliary tools

**Examples:**
```
feat(website): add new hero section component
fix(extension): resolve syntax highlighting issue
docs(readme): update installation instructions
```

## 📁 Project Structure

```
autogen-labs/
├── 📁 src/                    # Next.js Website
│   ├── 📁 app/               # App Router
│   ├── 📁 components/        # React Components
│   └── 📁 lib/              # Utilities
├── 📁 extension/             # VS Code Extension
│   ├── 📁 src/              # Extension Source
│   └── 📁 out/              # Compiled Files
├── 📁 public/               # Static Assets
└── 📁 .github/              # GitHub Configuration
```

## 🔧 Development Guidelines

### Website Development (Next.js)
- Use functional components with hooks
- Follow the existing folder structure
- Use Tailwind CSS for styling
- Ensure responsive design
- Add proper TypeScript types (if using TS)

### Extension Development
- Follow VS Code extension guidelines
- Use proper VS Code API patterns
- Add comprehensive error handling
- Include proper documentation

### Code Style
- Use Prettier for formatting
- Follow ESLint rules
- Use meaningful variable names
- Add comments for complex logic
- Keep functions small and focused

## 🚀 Pull Request Process

1. **Create a feature branch**
   ```powershell
   git checkout -b feature/amazing-feature
   ```

2. **Make your changes**
   - Write clean, readable code
   - Add tests if applicable
   - Update documentation

3. **Test your changes**
   ```powershell
   # Test website
   npm run build
   npm run lint
   
   # Test extension
   cd extension
   npm run compile
   npm test
   ```

4. **Commit your changes**
   ```powershell
   git add .
   git commit -m "feat: add amazing feature"
   ```

5. **Push to your fork**
   ```powershell
   git push origin feature/amazing-feature
   ```

6. **Create Pull Request**
   - Use our PR template
   - Link related issues
   - Add screenshots if UI changes
   - Ensure CI passes

### Pull Request Checklist
- [ ] Code follows style guidelines
- [ ] Self-review completed
- [ ] Comments added for complex code
- [ ] Documentation updated
- [ ] No breaking changes (or clearly documented)
- [ ] Tests pass locally
- [ ] Screenshots added for UI changes

## 🧪 Testing

### Website Testing
```powershell
npm run lint          # ESLint
npm run build         # Build test
npm test             # Unit tests (if available)
```

### Extension Testing
```powershell
cd extension
npm run compile      # Compile TypeScript
npm test            # Run extension tests
```

## 📚 Resources

- [Next.js Documentation](https://nextjs.org/docs)
- [VS Code Extension API](https://code.visualstudio.com/api)
- [Tailwind CSS Documentation](https://tailwindcss.com/docs)
- [React Documentation](https://react.dev)

## 🤝 Getting Help

- **Discord**: [Join our community](https://discord.gg/autogen-labs)
- **GitHub Issues**: Report bugs or request features
- **Email**: autogencodelabs@gmail.com

## 📄 License

By contributing to Autogen Labs, you agree that your contributions will be licensed under its MIT License.

---

Thank you for contributing to Autogen Labs! 🚀
