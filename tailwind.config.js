/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        "custom-green": '#22C55E',
        "maze-background": '#374151'
      },
      keyframes: {
        wallExpand: {
          '0%': { transform: "scale(0.7)" },
          '100%': { transform: "scale(1)" },
        },
        traversed: {
          '0%': { transform: "scale(0.3)", backgroundColor:"#9333eabf"},
          '50%': { backgroundColor:"#4f46e5bf"},
          '75%': { transform: "scale(1.2)", backgroundColor:"#3b82f6bf"},
          '100%':{transform:"scale(1)",backgroundColor:"#22d3ee"}
        },
        path:{
          '0%': { transform: "scale(0.3)", backgroundColor:"#e11d48bf"},
          '50%': { backgroundColor:"#ea580cbf"},
          '75%': { transform: "scale(1.2)", backgroundColor:"#fb923cbf"},
          '90%': { transform: "scale(0.8)", backgroundColor:"#fde68a"},
          '100%':{transform:"scale(1)"}
        }
      },
      animation: {
        wallExpand: 'wallExpand 0.5s ease-out',
        traversed: 'traversed 1s ease-in-out',
        path: 'path 1s ease-in-out',
      }
    },
  },
  plugins: [],
}

