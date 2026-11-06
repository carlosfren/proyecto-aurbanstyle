// Configuración de Karma + Jasmine para los componentes React (TypeScript).
// Karma abre un navegador real (Chrome headless), Jasmine ejecuta las pruebas
// y webpack + Babel compilan TSX. Con --coverage se instrumenta con Istanbul.
const path = require("path");

module.exports = function (config) {
  const conCobertura = process.argv.includes("--coverage");

  config.set({
    basePath: "",
    frameworks: ["jasmine", "webpack"],
    plugins: [
      "karma-jasmine",
      "karma-webpack",
      "karma-chrome-launcher",
      "karma-sourcemap-loader",
      "karma-spec-reporter",
      "karma-coverage",
      "karma-jasmine-html-reporter",
    ],
    files: [{ pattern: "src/**/*.spec.{ts,tsx}", watched: false }],
    preprocessors: { "src/**/*.spec.{ts,tsx}": ["webpack", "sourcemap"] },

    webpack: {
      mode: "development",
      devtool: "inline-source-map",
      resolve: { extensions: [".tsx", ".ts", ".js"] },
      module: {
        rules: [
          {
            test: /\.(ts|tsx)$/,
            exclude: /node_modules/,
            use: {
              loader: "babel-loader",
              options: {
                presets: [
                  ["@babel/preset-env", { targets: { chrome: "100" } }],
                  ["@babel/preset-react", { runtime: "automatic" }],
                  "@babel/preset-typescript",
                ],
                plugins: conCobertura
                  ? [["istanbul", { exclude: ["**/*.spec.*", "src/test/**", "src/main.tsx"] }]]
                  : [],
              },
            },
          },
        ],
      },
    },

    reporters: conCobertura
      ? ["spec", "kjhtml", "coverage"]
      : ["spec", "kjhtml"],
    coverageReporter: {
      dir: path.join(__dirname, "coverage"),
      subdir: ".",
      reporters: [{ type: "html" }, { type: "text-summary" }, { type: "lcovonly" }],
    },

    browsers: ["ChromeHeadlessSinSandbox"],
    customLaunchers: {
      ChromeHeadlessSinSandbox: {
        base: "ChromeHeadless",
        flags: ["--no-sandbox", "--disable-gpu"],
      },
    },
    client: { jasmine: { random: true } },
    restartOnFileChange: true,
  });
};
