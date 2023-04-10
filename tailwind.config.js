module.exports = {
  purge: ['./src/**/*.{js,jsx,ts,tsx}', './index.html'],
  darkMode: false,
  theme: {
    extend: {},
  },
  content: [
    "./node_modules/flowbite/**/*.{js, ts,tsx, jsx}"
  ],
  variants: {
    extend: {
      transitionProperty: {
        height: 'height'
      }
    },
  },
  plugins: [
    require('flowbite/plugin')
  ]
}