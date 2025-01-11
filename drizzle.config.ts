import dotenv from "dotenv";
import { defineConfig } from "drizzle-kit";

dotenv.config({ path: ".env.local" });
export default defineConfig({
    out: "./drizzle",
    schema: "./src/db/schema",
    dialect: "postgresql",
    dbCredentials: {
        url: process.env.DB_URL!,
    },
});