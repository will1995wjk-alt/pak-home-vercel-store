import { integer, pgTable, serial, text, timestamp } from "drizzle-orm/pg-core";

export const productReviews = pgTable("product_reviews", {
  id: serial("id").primaryKey(),
  productHandle: text("product_handle").notNull(),
  productId: text("product_id"),
  authorName: text("author_name").notNull(),
  rating: integer("rating").notNull(),
  title: text("title"),
  body: text("body").notNull(),
  createdAt: timestamp("created_at", { withTimezone: true }).notNull().defaultNow()
});

export type ProductReview = typeof productReviews.$inferSelect;
