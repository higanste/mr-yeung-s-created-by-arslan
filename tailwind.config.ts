import type { Config } from "tailwindcss";

const config: Config = {
    content: [
        "./app/**/*.{js,ts,jsx,tsx,mdx}",
        "./components/**/*.{js,ts,jsx,tsx,mdx}",
        "./lib/**/*.{js,ts,jsx,tsx,mdx}",
    ],
    theme: {
        extend: {
            colors: {
                'neon-cyan': '#00f2ea',
                'neon-pink': '#ff0055',
                'neon-green': '#0aff00',
                'bg-deep': '#050505',
                'bg-surface': '#0a0a0a',
            },
            fontFamily: {
                'space-grotesk': ['var(--font-space-grotesk)', 'sans-serif'],
            },
        },
    },
    plugins: [],
};
export default config;
