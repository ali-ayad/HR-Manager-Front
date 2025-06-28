module.exports = {
  content: [
    './src/**/*.{js,jsx,ts,tsx}',
    './node_modules/@tremor/**/*.{js,ts,jsx,tsx,mjs}', // covers all Tremor components
  ],
  safelist: [
    {
      pattern: /^ant-/, // for Ant Design classes
    },
  ],
  theme: {
    extend: {},
  },
  plugins: [],
};
