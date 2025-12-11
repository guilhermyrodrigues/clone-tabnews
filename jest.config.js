const nextJest = require("next/jest");
const dotenv = require("dotenv");

dotenv.config({ path: ".env.development" }); // Or just '.env' if you use the default

const createJestConfig = nextJest({ dir: "." });

const jestConfig = createJestConfig({
  moduleDirectories: ["node_modules", "<rootDir>/"],
  testTimeout: 60000,
});

module.exports = jestConfig;
