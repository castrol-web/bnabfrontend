module.exports = {
  locales: ['en'],
  output: './src/i18n/$LOCALE.json',
  input: ['src/**/*.{js,jsx,ts,tsx}'],
  keySeparator: false,
  namespaceSeparator: false,
  useKeysAsDefaultValue: true,
};
