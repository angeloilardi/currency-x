/** @type {import('tailwindcss').Config}*/
const config = {
	content: ['./src/**/*.{html,js,svelte,ts}'],

	theme: {
		extend: {
			fontFamily: {
				piazzolla: 'piazzolla, sans-serif',
			},
		}
	},

	plugins: []
};

module.exports = config;
