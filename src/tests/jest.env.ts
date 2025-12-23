import dotenv from "dotenv";

dotenv.config({ path: ".env.test" });

console.log("🧪 Running tests with DB:", process.env.DB_NAME);
// console.log("🧪 Running USER DB:",process.env.DB_USER)
