import { UserRole } from "@/drizzle/schema";

export {}

declare global {
  interface CustomJwtSessionClaims {
    dbId?: string;
    role?: UserRole;
  }
  interface UserPublicMetadata {
    dbId?: string;
    role?: UserRole;
  }
}
//這個檔案擴展Clerk的TypeScript類型定義 以確保TypeScript能識別這些自訂義字段 用來處理clerk的用戶和數據庫的交互