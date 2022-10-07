/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      keyframes: {
        scrollLeft: {
          '0%': {
            transform: 'translateX(0)',
            opacity: '1',
          },
          '75%': {
            transform: 'translateX(0)',
            opacity: '1',
          },
          '100%': {
            transform: 'translateX(-200%)',
            opacity: '0',
          },
        },
        headShake: {
          '0%': {
            transform: 'translateX(0)'
          },
          '6.5%': {
            transform: 'translateX(-6px) rotateY(-9deg)'
          },
          '18.5%': {
            transform: 'translateX(5px) rotateY(7deg)'
          },
          '31.5%': {
            transform: 'translateX(-3px) rotateY(-5deg)'
          },
          '43.5%': {
            transform: 'translateX(2px) rotateY(3deg)'
          },
          '50%': {
            transform: 'translateX(0)'
          }
        },
        wiggle: {
          '0%, 100%': {
            transform: 'rotate(-3deg)'
          },
          '50%': {
            transform: 'rotate(3deg)'
          },
        },
      },
      animation: {
        headShake: 'headShake 2s infinite',
        wiggle: 'wiggle 1s ease-in-out infinite',
        scrollLeft: 'scrollLeft 3s linear infinite'
      }
    },
  },
  plugins: [],
}