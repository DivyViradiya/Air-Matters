import { sql } from "drizzle-orm";
import { pgTable, text, varchar } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

export const users = pgTable("users", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  email: text("email").notNull().unique(),
  name: text("name").notNull(),
  password: text("password").notNull(),
  phoneNumber: text("phone_number"),
  address: text("address"),
  role: text("role").notNull().default("user"), // 'user' or 'admin'
  status: text("status").notNull().default("active"), // 'active' or 'blocked'
});

export const orders = pgTable("orders", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  userId: varchar("user_id").notNull(),
  productId: text("product_id").notNull(),
  productName: text("product_name").notNull(),
  amount: text("amount").notNull(),
  status: text("status").notNull().default("pending"), // 'pending', 'shipped', 'delivered'
  createdAt: text("created_at").notNull().default(sql`CURRENT_TIMESTAMP`),
});

export const insertUserSchema = createInsertSchema(users).pick({
  email: true,
  name: true,
  password: true,
  phoneNumber: true,
  address: true,
});

export const updateUserSchema = createInsertSchema(users).pick({
  name: true,
  phoneNumber: true,
  address: true,
}).partial();

export const insertOrderSchema = createInsertSchema(orders).pick({
  userId: true,
  productId: true,
  productName: true,
  amount: true,
});

export type InsertUser = z.infer<typeof insertUserSchema>;
export type UpdateUser = z.infer<typeof updateUserSchema>;
export type User = typeof users.$inferSelect;
export type Order = typeof orders.$inferSelect;
export type InsertOrder = z.infer<typeof insertOrderSchema>;
