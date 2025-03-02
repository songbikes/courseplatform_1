import { pgTable, primaryKey, uuid } from "drizzle-orm/pg-core";
import { CourseTable } from "./course";
import { ProductTable } from "./product";
import { createdAt, updatedAt } from "../schemaHelper";
import { relations } from "drizzle-orm";

//foreign key is a column that creates a relationship between two tables. It is a column that points to the primary key of another table.
export const CourseProductTable = pgTable("course_products", {
  courseId: uuid().notNull().references(()=> CourseTable.id, { onDelete: "restrict"}),
  productId: uuid().notNull().references(()=> ProductTable.id, { onDelete: "cascade"}),
  createdAt,
  updatedAt,
}, 
t => [primaryKey({ columns: [t.courseId, t.productId] })]
);

export const CourseProductRelationships = relations( 
  CourseProductTable, 
  ({ one }) => ({
  course: one(CourseTable, {
    fields: [CourseProductTable.courseId],
    references: [CourseTable.id],
  }),
  product: one(ProductTable, {
    fields: [CourseProductTable.courseId],
    references: [ProductTable.id],
  }),
  
}));