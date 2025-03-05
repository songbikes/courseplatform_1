import { pgEnum, pgTable, text, timestamp } from "drizzle-orm/pg-core";
import { relations } from "drizzle-orm";
import { createdAt, updatedAt, id } from "../schemaHelper";
import { UserCourseAccessTable } from "./userCourseAccess";
//the 3 lines below shows the pattern of defining fixed options in Drizzle ORM.
//the first line defines the options we want
// the second line gives the options a type that typescript can understand
//the third line creates a enum type that postgreSQL can understand
//第一行設定我們要的值 第二行把那些值定義成typescript可辨識的類型 第三行用enum這個我不知道為什麼已經限制只有兩個選項了 還要在用一個聽說但我也不知道為什麼會更嚴格的enum把要得值包進去 可能是因為要跟postgreSQL溝通吧 總之這是後端的東西
export const userRoles = ["admin", "user"] as const;
export type UserRole = (typeof userRoles)[number];
export const userRoleEnum = pgEnum("user_role", userRoles);

export const UserTable = pgTable("users", {
  id,
  clerkUserId: text().notNull().unique(),
  email: text().notNull().unique(),
  name: text().notNull(),
  role: userRoleEnum().notNull().default("user"),
  imageUrl: text(),
  deletedAt: timestamp({ withTimezone: true }), // soft delete as we don't want to lose track of for example the total sales of a course
  createdAt,
  updatedAt,
});

export const UserRelationships = relations( 
  UserTable, 
  ({ many}) => ({
    userCourseAccesses: many(UserCourseAccessTable),
 })
);

//how users can interact with the contents or course products to be specific
//定義用戶的基本訊息的表格，包括用戶的名字、郵箱、角色、頭像等
//用戶的角色有兩種，分別是admin和user
//這些會傳到schema.ts中 然後再傳到db.ts中