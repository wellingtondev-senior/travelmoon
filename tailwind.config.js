/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/utils/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic':
          'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
      },
      colors: {
        'purple': '#6E2C8E',
        'gray': '#D9DBD0',
        'gray-200': '#f7f7f7',
        'gray-500': '#97979a',
        'green': '#CED051',
        'green-100': "#BFD059",
        'green-800': '#274726',
        'green-700': '#808E2C',
        'black-300': '#181a20',
        'black-200': '#222328',
        'success': '#00a86b'
      }
    },
  },
  plugins: [],
}


