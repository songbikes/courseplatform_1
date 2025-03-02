import { id, createdAt, updatedAt } from '../schemaHelper'
import { integer, pgEnum, pgTable, text } from "drizzle-orm/pg-core";
import { relations } from "drizzle-orm";
import { CourseProductTable } from './courseProduct';

export const prodyctStatus = ["public", "private"] as const;
export type ProductStatus = (typeof prodyctStatus)[number];
export const ProductStatusEnum = pgEnum("product_status", prodyctStatus);

export const ProductTable = pgTable("products", {
  id,
  name: text().notNull(),
  description: text().notNull(),
  imageUrl: text().notNull(),
  priceInDollars: integer().notNull(),
  status: ProductStatusEnum().notNull().default("private"),
  createdAt,
  updatedAt,
});

// product is gonna have many to many relationship but we can't create a many ot many table in Drizzle unless we create a join table in between them
export const ProductRelationships = relations( ProductTable, 
  ({ many}) => ({
  courseProducts: many(CourseProductTable)
 }));

 //this is the top level of the schema, 
 // each product can have many courses, 
 // each course can have many sections, 
 // each section can have many lessons