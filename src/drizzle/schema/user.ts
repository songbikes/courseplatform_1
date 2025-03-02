import { pgEnum, pgTable, text, timestamp } from "drizzle-orm/pg-core";
import { relations } from "drizzle-orm";
import { createdAt, updatedAt, id } from "../schemaHelper";
import { UserCourseAccessTable } from "./userCourseAccess";

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