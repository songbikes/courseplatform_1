import { defineConfig } from 'drizzle-kit';
import { env } from '@/data/env/server';

export default defineConfig({
  out: "./src/drizzle/migrations", //where the migrations will be stored
  schema: "./src/drizzle/schema.ts", //where the schema is stored
  dialect: "postgresql", //which database type we are using
  strict: true, //if we want to be strict with the schema
  verbose: true, //if we want to see the logs
  dbCredentials: { //credentials to connect to the database
    password: env.DB_PASSWORD,
    user: env.DB_USER,
    database: env.DB_NAME,
    host: env.DB_HOST,
    ssl: false, //if we want to use ssl or not, in local development we typically don't need it
  },
});

//db.ts: Used by your application at runtime to connect to the database
//drizzle.config.ts: Used by development and deployment tools to manage database schema