/** @type {import('tailwindcss').Config} */
module.exports = {
	content: [
		"./app/**/*.{js,ts,jsx,tsx}", // Next.js 13 app directory
		"./pages/**/*.{js,ts,jsx,tsx}", // pages directory if you use it
		"./components/**/*.{js,ts,jsx,tsx}", // any components
	],
	theme: {
		extend: {},
	},
	plugins: [],
};
