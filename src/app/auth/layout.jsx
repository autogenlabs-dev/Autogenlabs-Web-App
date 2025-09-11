import "../globals.css";

// Fallback font configuration to prevent build failures
const fontConfig = {
    variable: "--font-geist-sans",
    className: "font-sans",
};

const monoFontConfig = {
    variable: "--font-geist-mono", 
    className: "font-mono",
};

export const metadata = {
    title: "Sign In | Codemurf",
    description: "Sign in to your Codemurf account",
};

export default function AuthLayout({ children }) {
    return children;
}

