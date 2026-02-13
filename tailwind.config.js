/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./front/**/*.html", "./front/**/*.js"], // Garanta que ele olhe para a pasta front
  theme: {
    fontFamily: {
      'rajdhani': ['Rajdhani', 'sans-serif'],
      'orbitron': ['Orbitron', 'sans-serif'],
    },
    extend: {
      dropShadow:{
        dropyellow: '0 0 4px #FF9D00',
        dropred: '0 0 10px #521014',
      },
      colors: {
        backgroundred: '#2C1013',
        strokered: '#521014',
        insidered: '#280A0D',
        cyberyellow: '#F0B537',
        cyberblue: '#5EF6FF',
        cyberorange: '#F75049',
        pureblack: '#000000', 
        purewhite: '#FFFFFF',
      },
    },
  },
  plugins: [],
}