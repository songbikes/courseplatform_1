export * from "./schema/course";
export * from "./schema/courseProduct";
export * from "./schema/courseSection";
export * from "./schema/lesson";
export * from "./schema/product";
export * from "./schema/purchase";
export * from "./schema/user";
export * from "./schema/userCourseAccess";
export * from "./schema/userLessonComplete";

//these are all the tables that we have in the database
//and we are exporting them so that we can use them in other files
//Drizzle needs to konw about all the structure of the tables in the database from here
//and then it will create the tables in the database