module.exports = {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        arkham: {
          background: "#1b1b1b",
          panel: "#121212",
          border: "#2e2e2e",
          mist: "#4caf50", // зелёное свечение
          fog: "#6c5ce7", // фиолетовый акцент
          copper: "#a0522d", // бронзовые детали
          text: "#e0e0e0",
        },
      },
      fontFamily: {
        gothic: ['"EB Garamond"', "serif"],
      },
    },
  },
  plugins: [],
};
