/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors:{
        "custom-green":'#22C55E',
        "maze-background":'#374151'
      },
      keyframes: {
        wallExpand: {
          '0%': {transform:"scale(0.7)"},
          '100%': { transform:"scale(1)" },
        },
      },
      animation: {
        wallExpand: 'wallExpand 0.5s ease-out',
      }
    },
  },
  plugins: [],
}

