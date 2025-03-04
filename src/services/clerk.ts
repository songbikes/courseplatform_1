import { UserRole } from "@/drizzle/schema";
import { clerkClient } from "@clerk/nextjs/server";

const client = await clerkClient();

export async function syncClerkUserMetadata(user: {  
  id: string,
  clerkUserId: string,
  role: UserRole,
}) {
  return client.users.updateUserMetadata(user.clerkUserId, {
    publicMetadata: {
      dbId: user.id,
      role: user.role,
    },
  });
}
//這個檔案是用來處理clerk的用戶和數據庫的交互
//包括更新clerk用戶的metadata