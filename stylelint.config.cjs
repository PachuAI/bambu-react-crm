module.exports = {
  extends: ["stylelint-config-standard", "stylelint-config-tailwindcss"],
  ignoreFiles: ["dist/**"],
  rules: {
    "no-empty-source": true
  }
};