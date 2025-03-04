import { db } from "@/drizzle/db";
import { UserTable } from "@/drizzle/schema";
import { eq } from "drizzle-orm";

//this file is for user's interaction with database
//inserting user into database
export async function insertUser(data: typeof UserTable.$inferInsert) {
  const [newUser] = await db
  .insert(UserTable)
  .values(data)
  .returning()
  .onConflictDoUpdate({
    target: [UserTable.clerkUserId],
    set: data,
  });

  if (newUser == null) {
    throw new Error("Failed to create user");
  }
  return newUser;
}
//update user
export async function updateUser(
  { clerkUserId }: { clerkUserId: string },
  data: Partial<typeof UserTable.$inferInsert>) {
  const [updatedUser] = await db
  .update(UserTable)
  .set(data)
  .where(eq(UserTable.clerkUserId, clerkUserId))
  .returning()

  if (updatedUser == null) {
    throw new Error("Failed to update user");
  }
  return updatedUser;
}
//delete user
export async function deleteUser(
  { clerkUserId }: { clerkUserId: string }) {
  const [deletedUser] = await db
  .update(UserTable)
  .set({
    deletedAt: new Date(),
    email: "redacted@deleted.com",
    name: "Deleted User",
    clerkUserId: "deleted",
    imageUrl: null,
  })
  .where(eq(UserTable.clerkUserId, clerkUserId))
  .returning()

  if (deletedUser == null) {
    throw new Error("Failed to update user");
  }
  return deletedUser;
}
//這個檔案是用來儲存處理用戶和數據庫的交互的函數 提供給其他文件使用像是route.ts
//包括插入用戶、更新用戶、刪除用戶
//這些操作都是在數據庫中進行的 並且都是用drizzle-orm這個庫來完成的
//用async/await來完成的 因為是異步操作
//用try/catch來捕獲錯誤的 並且拋出錯誤
//UserTable是在user.ts中定義的然後再傳到schema.ts中 所以這裡import直接從schema.ts中import
//以後這個黨名可能要更直觀些