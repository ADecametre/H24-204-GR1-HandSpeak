import type { Config } from "tailwindcss";

const config: Config = {
	content: [
		"./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
		"./src/components/**/*.{js,ts,jsx,tsx,mdx}",
		"./src/app/**/*.{js,ts,jsx,tsx,mdx}",
	],
	theme: {
		extend: {
			backgroundImage: {
				"gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
				"gradient-conic":
					"conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
			},
			keyframes: {
				polse: {
					"0%": {
						transform: "scale(1)",
						boxShadow: "0 0 0 0 rgba(34,139,230,1)",
					},
					"70%": {
						transform: "scale(1.2)",
						boxShadow: "0 0 0 10px rgba(34,139,230,0)",
					},
					"100%": {
						transform: "scale(1)",
					},
				},
			},
			animation: {
				polse: "polse 2s infinite",
			},
		},
	},
	plugins: [],
};
export default config;
