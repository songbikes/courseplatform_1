import { headers } from "next/headers";
import { env } from "@/data/env/server";
import { Webhook } from "svix";
import { WebhookEvent } from "@clerk/nextjs/server";
import { deleteUser, insertUser, updateUser } from "@/features/users/db/users";
import { syncClerkUserMetadata } from "@/services/clerk";

//驗證請求 使用加密簽名確保請求確實來自clerk 而不是其他來源
export async function POST(req: Request) {
  const headerPayload = await headers();
  const svixId = headerPayload.get("svix-id");
  const svixTimestamp = headerPayload.get("svix-timestamp");
  const svixSignature = headerPayload.get("svix-signature");

  if (!svixId || !svixTimestamp || !svixSignature) {
    return new Response("Error Occured -- no svix headers", 
      { status: 401 });
  }

  const payload = await req.json();
  const body = JSON.stringify(payload);

  const wh = new Webhook(env.CLERK_WEBHOOK_SECRET)
  let event: WebhookEvent;
  try {
    event = wh.verify(body, {
      "svix-id": svixId,
      "svix-timestamp": svixTimestamp,
      "svix-signature": svixSignature
    }) as WebhookEvent;
  } catch (err) {
    console.error("Error verifying webhook", err);
    return new Response("Error Occured", 
      { status: 400 });
  }
  //the code above are pretty much from Clerk docs, and the code below are specific code for the project
  //提取用戶信息 並且根據不同的webhook類型來創建用戶、更新用戶、刪除用戶
  switch (event.type) {
    case "user.created":
    case "user.updated": {
      const email = event.data.email_addresses.find(
        email => email.id === event.data.primary_email_address_id
      )?.email_address
      const name = `${event.data.first_name} ${event.data.last_name}`.trim()
      if (email == null) return new Response("No email", { status: 400 });
      if (name === '') return new Response("No name", { status: 400 });

      if (event.type === "user.created") {
        const user = await insertUser({
          clerkUserId: event.data.id,
          email,
          name,
          imageUrl: event.data.image_url,
          role: "user",
        });

        await syncClerkUserMetadata(user);
      } else {
        await updateUser(
          { clerkUserId: event.data.id }, {
          email,
          name,
          imageUrl: event.data.image_url,
          role: event.data.public_metadata.role,
        }
      )}
      break
    }
    case "user.deleted": {
      if (event.data.id) {
        await deleteUser(
          { clerkUserId: event.data.id as string });
      }
      break
    }
  }
  return new Response("", { status: 200 });
}
//這是一個核心文件 連接clerk的webhook和數據庫 這個檔案會導出一個POST函數
//POST這個函數會接收一個請求對象 並且從請求對象中獲取svix-id、svix-timestamp、svix-signature
//這個檔案會接收clerk的webhook並且根據webhook的類型來創建用戶、更新用戶、刪除用戶
//雖然在users.ts中也有創建用戶、更新用戶、刪除用戶的操作
//但是這裡是根據clerk的webhook來執行的 要兩邊都有的原因是因為clerk的webhook是異步的
//所以要在這裡再執行一次以確保數據庫中的數據是最新的 可是再執行一次的時候要確保不會重複創建用戶
//所以要先查詢數據庫中是否有這個用戶 如果有就更新 如果沒有就創建
//這裡的操作都是用async/await來完成的 因為是異步操作
//用try/catch來捕獲錯誤的 並且拋出錯誤

//[Clerk系统] → [发送Webhook请求] → [route.ts处理请求] → [操作数据库] → [同步回Clerk]

//從users.ts導入insertUser、updateUser、deleteUser函數 這些函數是用來操作數據庫的
//從clerk.ts導入syncClerkUserMetadata函數 這個函數是用來更新clerk用戶的metadata 保持雙向同步
//從env.ts導入env 這個文件是用來設置環境變量的

//用switch/case來判斷webhook的類型 並且根據不同的類型來執行不同的操作
//如果是user.created或者user.updated的話 就提取用戶信息 並且根據是否有用戶信息來創建用戶或者更新用戶
//如果是user.deleted的話 就刪除用戶
//最後返回一個空的Response對象 並且返回200狀態碼