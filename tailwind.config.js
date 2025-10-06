/** @type {import('tailwindcss').Config} */
module.exports = {
	content: [
		"./app/**/*.{js,ts,jsx,tsx}", // Next.js 13 app directory
		"./pages/**/*.{js,ts,jsx,tsx}", // pages directory if you use it
		"./components/**/*.{js,ts,jsx,tsx}", // any components
		"./src/**/*.{js,ts,jsx,tsx}", // src directory
	],
	theme: {
		extend: {
			fontFamily: {
				'grotesk': ['"Space Grotesk"', 'sans-serif'],
				'dm': ['"DM Sans"', 'sans-serif'],
				'outfit': ['"Outfit"', 'sans-serif'],
				'retro': ['"VT323"', '"Press Start 2P"', '"Courier New"', 'monospace'],
			},
		},
	},
	plugins: [],
};
