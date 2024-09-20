/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors:{
        'primary':'#3238f2'
      },
      fontFamily:{
        'display':['Poppins','sans-sarif'],
        'body':['Inter','sans-sarif']
      }
    },
  },
  plugins: [],
};
