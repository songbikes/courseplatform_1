import { integer, pgEnum, pgTable, text, uuid } from "drizzle-orm/pg-core";
import { desc, relations } from "drizzle-orm";
import { createdAt, id, updatedAt } from "../schemaHelper";
import { CourseSectionTable } from "./courseSection";
import { UserLessonCompleteTable } from "./userLessonComplete"; // Ensure this path is correct and the file exists

export const  lessonStatuses = ["public", "private", "preview" ] as const;
export type LessonSectionStatus = (typeof lessonStatuses)[number];
export const lessonStatusEnum = pgEnum("lesson_section_status", lessonStatuses);

//default to private to make sure that we will never have in-progress draft stuff being shown to users, we will always have to explicitly set it to public once we're ready to release it
//order is used to sort the sections in the course so that we can drag around to change the order
export const LessonTable = pgTable("lessons", {
  id,
  name: text().notNull(),
  description: text(),
  youtubeVideoId: text().notNull(),
  order: integer().notNull(),
  status: lessonStatusEnum().notNull().default("private"), 
  sectionId: uuid().notNull().references(() => CourseSectionTable.id, { onDelete: "cascade" }),
  createdAt,
  updatedAt,
});

export const LessonRelationships = relations(
  LessonTable, 
  ({ many, one }) => ({
    section: one(CourseSectionTable, {
      fields: [LessonTable.sectionId],
      references: [CourseSectionTable.id],
    }),
    userLessonComplete: many(UserLessonCompleteTable)
  })
);