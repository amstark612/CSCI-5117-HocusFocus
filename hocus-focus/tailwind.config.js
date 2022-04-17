module.exports = {
  content: [
    './src/**/*.{vue,js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {},
		fontFamily: {
			'sans': ['Fira Code'],
		},
    colors: {
      transparent: 'transparent',
      current: 'currentColor',
      'pastel-green': {
        100: '#dfeac3',
        200: '#c6da95',
        300: '#adc965',
        400: '#94b540',
        500: '#6f8830',
      },
      'pastel-blue': {
        100: '#f0faf8',
        200: '#c3eae4',
        300: '#89d5c9',
        400: '#68cabb',
        500: '#40b5a4',
      },
      'pastel-yellow': {
        100: '#feeed8',
        200: '#fbd49d',
        300: '#fac172',
        400: '#f8a93a',
        500: '#ec8d09',
      },
      'pastel-orange': {
        100: '#ffe1d6',
        200: '#ffb499',
        300: '#ff8357',
        400: '#ff5a1f',
        500: '#e03c00',
      },
      'pastel-red': {
        100: '#f4c0b8',
        200: '#ec9183',
        300: '#e25b45',
        400: '#d43921',
        500: '#9f2b19',
      },
    }
  },
  plugins: [],
}