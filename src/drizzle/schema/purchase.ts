import { pgTable, integer, jsonb, uuid, text, timestamp } from "drizzle-orm/pg-core";
import { createdAt, id, updatedAt } from "../schemaHelper";
import { relations } from "drizzle-orm";
import { UserTable } from "./user";
import { ProductTable } from "./product";

export const PurchaseTable = pgTable("purchases", {
  id,
  pricePaidInCents: integer().notNull(),
  productDetails: jsonb().notNull().$type<{name: string, description: string, imageUrl: string }>(),
  userId: uuid().notNull().references(()=> UserTable.id, { onDelete: "cascade"}),
  productId: uuid().notNull().references(()=> ProductTable.id, { onDelete: "restrict"}),
  stripeSessionId: text().notNull().unique(),
  refundedAt: timestamp({ withTimezone: true }),
  createdAt,
  updatedAt,
});

export const PurchaseRelationships = relations(
  PurchaseTable,
  ({ one }) => ({
    user: one(UserTable, {
      fields: [PurchaseTable.userId],
      references: [UserTable.id],
    }),
    product: one(ProductTable, {
      fields: [PurchaseTable.productId],
      references: [ProductTable.id],
    }),
  })
);

// pricePaidInCents is in cents because we don't want to deal with floating point numbers
// this is a Stripe handles everything
// productDetails is a JSON object that contains the name, description and imageUrl of the product at the time of purchase, in case any contents of the course a user has purchased is changed this is to ensure we can show the original content to the user 