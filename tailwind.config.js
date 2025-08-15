/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      fontFamily: {
        'roboto': ['var(--font-roboto)', 'sans-serif'],
      },
      colors: {
        'bg-primary': '#F8F7F4',
        'text-primary': '#000000',
      },
      backgroundColor: {
        'default': '#F8F7F4',
      }
    },
  },
  plugins: [],
}