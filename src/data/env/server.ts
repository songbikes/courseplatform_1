import { createEnv } from "@t3-oss/env-nextjs";
import { z } from "zod";

export const env = createEnv({
  server: {
    DB_PASSWORD: z.string().min(1),
    DB_USER: z.string().min(1),
    DB_NAME: z.string().min(1),
    DB_HOST: z.string().min(1),
  },
  experimental__runtimeEnv: process.env,
});

//this file reads values from the .env file and then validate them
//if they are not valid, it will throw an error
//and then send the values to db.ts and drizzle.config.ts