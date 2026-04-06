import { type User, type InsertUser, users, type Order, type InsertOrder, orders } from "../shared/schema.js";
import { randomUUID } from "crypto";
import session from "express-session";
import createMemoryStore from "memorystore";
import connectPg from "connect-pg-simple";
import { db } from "./db.js";
import { eq, sql } from "drizzle-orm";

const MemoryStore = createMemoryStore(session);
const PostgresStore = connectPg(session);

export interface IStorage {
  getUser(id: string): Promise<User | undefined>;
  getUserByEmail(email: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;
  // Admin methods
  getAllUsers(): Promise<User[]>;
  updateUserRole(id: string, role: string): Promise<User>;
  updateUserStatus(id: string, status: string): Promise<User>;
  deleteUser(id: string): Promise<void>;
  // Order methods
  createOrder(order: InsertOrder): Promise<Order>;
  getOrdersByUser(userId: string): Promise<Order[]>;
  getAllOrders(): Promise<Order[]>;
  updateOrderStatus(id: string, status: string): Promise<Order>;
  
  sessionStore: session.Store;
}

export class MemStorage implements IStorage {
  private users: Map<string, User>;
  private orders: Map<string, Order>;
  sessionStore: session.Store;

  constructor() {
    this.users = new Map();
    this.orders = new Map();
    this.sessionStore = new MemoryStore({
      checkPeriod: 86400000,
    });
    console.log("Using MemoryStore for sessions.");
  }

  async getUser(id: string): Promise<User | undefined> {
    return this.users.get(id);
  }

  async getUserByEmail(email: string): Promise<User | undefined> {
    return Array.from(this.users.values()).find(
      (user) => user.email === email,
    );
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const id = randomUUID();
    const user: User = { 
      ...insertUser, 
      id,
      phoneNumber: insertUser.phoneNumber ?? null,
      address: insertUser.address ?? null,
      role: "user",
      status: "active"
    };
    this.users.set(id, user);
    return user;
  }

  async updateUserProfile(id: string, updates: Partial<InsertUser>): Promise<User> {
    const user = this.users.get(id);
    if (!user) throw new Error("User not found");
    const updatedUser = { ...user, ...updates };
    this.users.set(id, updatedUser);
    return updatedUser;
  }

  async getAllUsers(): Promise<User[]> {
    return Array.from(this.users.values());
  }

  async updateUserRole(id: string, role: string): Promise<User> {
    const user = this.users.get(id);
    if (!user) throw new Error("User not found");
    const updatedUser = { ...user, role };
    this.users.set(id, updatedUser);
    return updatedUser;
  }

  async updateUserStatus(id: string, status: string): Promise<User> {
    const user = this.users.get(id);
    if (!user) throw new Error("User not found");
    const updatedUser = { ...user, status };
    this.users.set(id, updatedUser);
    return updatedUser;
  }

  async deleteUser(id: string): Promise<void> {
    this.users.delete(id);
  }

  async createOrder(insertOrder: InsertOrder): Promise<Order> {
    const id = randomUUID();
    const order: Order = { 
      ...insertOrder, 
      id, 
      status: "pending", 
      createdAt: new Date().toISOString() 
    };
    this.orders.set(id, order);
    return order;
  }

  async getOrdersByUser(userId: string): Promise<Order[]> {
    return Array.from(this.orders.values()).filter(o => o.userId === userId);
  }

  async getAllOrders(): Promise<Order[]> {
    return Array.from(this.orders.values());
  }

  async updateOrderStatus(id: string, status: string): Promise<Order> {
    const order = this.orders.get(id);
    if (!order) throw new Error("Order not found");
    const updatedOrder = { ...order, status };
    this.orders.set(id, updatedOrder);
    return updatedOrder;
  }
}

export class DatabaseStorage implements IStorage {
  sessionStore: session.Store;

  constructor() {
    // SECURITY NOTE: It is unsafe to commit secrets to version control.
    // If you must hardcode for debugging, do not commit this file.
    const MANUAL_CONNECTION_STRING = "postgresql://neondb_owner:npg_1lDkTsO6dEcR@ep-super-shape-ahtilgy7.c-3.us-east-1.aws.neon.tech/neondb?sslmode=require";

    // The DB connection for users (via 'db' import) is handled separately in db.ts
    this.sessionStore = new MemoryStore({
      checkPeriod: 86400000,
    });
    console.log("Using DatabaseStorage for User data.");
  }

  async getUser(id: string): Promise<User | undefined> {
    if (!db) throw new Error("Database not initialized");
    const [user] = await db.select().from(users).where(eq(users.id, id));
    return user;
  }

  async getUserByEmail(email: string): Promise<User | undefined> {
    if (!db) throw new Error("Database not initialized");
    const [user] = await db.select().from(users).where(eq(users.email, email));
    return user;
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    if (!db) throw new Error("Database not initialized");
    
    // Bootstrap logic: If no users exist, make the first one an admin
    const allUsers = await this.getAllUsers();
    const role = allUsers.length === 0 ? "admin" : "user";
    
    const [user] = await db.insert(users).values({
      ...insertUser,
      role,
      status: "active"
    }).returning();
    return user;
  }

  async updateUserProfile(id: string, updates: Partial<InsertUser>): Promise<User> {
    if (!db) throw new Error("Database not initialized");
    const [user] = await db.update(users).set(updates).where(eq(users.id, id)).returning();
    return user;
  }

  async getAllUsers(): Promise<User[]> {
    if (!db) throw new Error("Database not initialized");
    return await db.select().from(users);
  }

  async updateUserRole(id: string, role: string): Promise<User> {
    if (!db) throw new Error("Database not initialized");
    const [user] = await db.update(users).set({ role }).where(eq(users.id, id)).returning();
    return user;
  }

  async updateUserStatus(id: string, status: string): Promise<User> {
    if (!db) throw new Error("Database not initialized");
    const [user] = await db.update(users).set({ status }).where(eq(users.id, id)).returning();
    return user;
  }

  async deleteUser(id: string): Promise<void> {
    if (!db) throw new Error("Database not initialized");
    await db.delete(users).where(eq(users.id, id));
  }

  async createOrder(insertOrder: InsertOrder): Promise<Order> {
    if (!db) throw new Error("Database not initialized");
    const [order] = await db.insert(orders).values(insertOrder).returning();
    return order;
  }

  async getOrdersByUser(userId: string): Promise<Order[]> {
    if (!db) throw new Error("Database not initialized");
    return await db.select().from(orders).where(eq(orders.userId, userId));
  }

  async getAllOrders(): Promise<Order[]> {
    if (!db) throw new Error("Database not initialized");
    return await db.select().from(orders);
  }

  async updateOrderStatus(id: string, status: string): Promise<Order> {
    if (!db) throw new Error("Database not initialized");
    const [order] = await db.update(orders).set({ status }).where(eq(orders.id, id)).returning();
    return order;
  }
}

// Safer initialization logic
function initializeStorage() {
  try {
    const storage = new DatabaseStorage();
    // Test the connection asynchronously. If it fails later, it will log, but we won't crash synchronously.
    if (db) {
       db.execute(sql`SELECT 1`).catch((err: any) => {
          console.error("Database connection failed during initialization check. Ensure your DATABASE_URL is correct and the server is reachable.", err.message);
       });
    }
    return storage;
  } catch (err) {
    console.error("Failed to initialize DatabaseStorage, falling back to MemStorage:", err);
    return new MemStorage();
  }
}

export const storage = initializeStorage();