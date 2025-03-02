import { integer, pgEnum, pgTable, text, uuid } from "drizzle-orm/pg-core";
import { relations } from "drizzle-orm";
import { createdAt, id, updatedAt } from "../schemaHelper";
import { CourseTable } from "./course";

export const  courseSectionStatuses = ["public", "private"] as const;
export type CourseSectionStatus = (typeof courseSectionStatuses)[number];
export const courseSectionStatusEnum = pgEnum("course_section_status", courseSectionStatuses);

//default to private to make sure that we will never have in-progress draft stuff being shown to users, we will always have to explicitly set it to public once we're ready to release it
//order is used to sort the sections in the course so that we can drag around to change the order
export const CourseSectionTable = pgTable("course_sections", {
  id,
  name: text().notNull(),
  status: courseSectionStatusEnum().notNull().default("private"), 
  order: integer().notNull(),
  courseId: uuid().notNull().references(() => CourseTable.id, { onDelete: "cascade" }),
  createdAt,
  updatedAt,
});

export const CourseSectionRelationships = relations(
  CourseSectionTable, 
  ({ many, one }) => ({
    course: one(CourseTable, {
      fields: [CourseSectionTable.courseId],
      references: [CourseTable.id],
    }),
  })
);