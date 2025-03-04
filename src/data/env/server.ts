import { createEnv } from "@t3-oss/env-nextjs";
import { z } from "zod";

export const env = createEnv({
  server: {
    DB_PASSWORD: z.string().min(1),
    DB_USER: z.string().min(1),
    DB_NAME: z.string().min(1),
    DB_HOST: z.string().min(1),
    CLERK_SECRET_KEY: z.string().min(1),
    CLERK_WEBHOOK_SECRET: z.string().min(1),
  },
  experimental__runtimeEnv: process.env,
});
//這是一個用來讀取.env文件的文件 並由此文件來驗證.env文件中的值
//如果值不對，將會拋出錯誤 比如說是不是string 或者是不是至少有個值
//this file reads values from the .env file and then validate them
//if they are not valid, it will throw an error
//and then send the values to db.ts and drizzle.config.ts