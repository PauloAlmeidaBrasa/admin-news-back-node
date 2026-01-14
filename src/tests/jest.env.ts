import dotenv from "dotenv";


if (process.env.CI) {
  dotenv.config({ path: ".env.tests-pipeline", override: true });
} else {
  dotenv.config({ path: ".env.test", override: true });
}
