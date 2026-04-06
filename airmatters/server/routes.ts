import type { Express, Request, Response, NextFunction } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage.js";
import { setupAuth } from "./auth.js";

// Middleware to check if user is admin
function isAdmin(req: Request, res: Response, next: NextFunction) {
  if (req.isAuthenticated() && (req.user as any).role === "admin") {
    return next();
  }
  res.status(403).send("Forbidden: Admins only");
}

export async function registerRoutes(app: Express): Promise<Server> {
  setupAuth(app);

  // Admin Routes
  app.get("/api/admin/users", isAdmin, async (req, res) => {
    const users = await storage.getAllUsers();
    res.json(users);
  });

  app.patch("/api/admin/users/:id/role", isAdmin, async (req, res) => {
    const { role } = req.body;
    if (!["user", "admin"].includes(role)) {
      return res.status(400).send("Invalid role");
    }
    const user = await storage.updateUserRole(req.params.id, role);
    res.json(user);
  });

  app.patch("/api/admin/users/:id/status", isAdmin, async (req, res) => {
    const { status } = req.body;
    if (!["active", "blocked"].includes(status)) {
      return res.status(400).send("Invalid status");
    }
    const user = await storage.updateUserStatus(req.params.id, status);
    res.json(user);
  });

  app.delete("/api/admin/users/:id", isAdmin, async (req, res) => {
    await storage.deleteUser(req.params.id);
    res.sendStatus(200);
  });

  app.get("/api/admin/orders", isAdmin, async (req, res) => {
    const orders = await storage.getAllOrders();
    res.json(orders);
  });

  app.patch("/api/admin/orders/:id/status", isAdmin, async (req, res) => {
    const { status } = req.body;
    const order = await storage.updateOrderStatus(req.params.id, status);
    res.json(order);
  });

  // User Order Routes
  app.post("/api/orders", async (req, res) => {
    if (!req.isAuthenticated()) return res.sendStatus(401);
    const order = await storage.createOrder({
      ...req.body,
      userId: (req.user as any).id
    });
    res.status(201).json(order);
  });

  app.get("/api/orders", async (req, res) => {
    if (!req.isAuthenticated()) return res.sendStatus(401);
    const orders = await storage.getOrdersByUser((req.user as any).id);
    res.json(orders);
  });

  const httpServer = createServer(app);

  return httpServer;
}
