import { env } from '@/data/env/server';
import { drizzle } from 'drizzle-orm/node-postgres';
import * as schema  from './schema';

export const db = drizzle({
  schema, 
  connection: {
    password: env.DB_PASSWORD, //password for authentication
    user: env.DB_USER, //user name for authentication
    database: env.DB_NAME, //which specific database we are connecting to, postgres can have multiple databases
    host: env.DB_HOST, //the database server, IP address or domain name
  },
});
//這個文件是用來連接數據庫的
//連接數據庫需要密碼、用戶名、數據庫名、主機名
//import everything from schema.ts and pass it to drizzle so that hook up the database
//and then we can db.query to access the whole bunch of stuff in the database

//drizzle is a function that translates the schema into a database connection
//and then we can use db.query to access the database
//the purpose of this file is to hook up the database
//connection has the password, user, database, and host which are all coming from the env of the server file

//The database runs as a separate program from your app
//Your app needs to connect to it, like enterging a building with some keys
//So can enter the building and access the schema(data tables) in the building
//Schema is the map of your data and connection is how to access it

//additional connection options:
//port: If your PostgreSQL runs on a non-standard port
//ssl: For secure connections
//connectionTimeoutMillis: Timeout settings