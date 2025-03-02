import { env } from '@/data/env/server';
import { drizzle } from 'drizzle-orm/node-postgres';
import * as schema  from './schema';

export const db = drizzle({
  schema, 
  connection: {
    password: env.DB_PASSWORD,
    user: env.DB_USER,
    database: env.DB_NAME,
    host: env.DB_HOST,
  },
});

//import everything from schema.ts and pass it to drizzle so that hook up the database
//and then we can db.query to access the whole bunch of stuff in the database