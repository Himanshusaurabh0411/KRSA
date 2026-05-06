import type { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";
import { env } from "../config/env.js";
import { User, type UserRole } from "../models/user.model.js";
import { ApiError } from "../utils/errors.js";

export type AuthRequest = Request & {
  user?: {
    id: string;
    role: UserRole;
    name: string;
    email: string;
  };
};

export async function authenticate(req: AuthRequest, _res: Response, next: NextFunction) {
  const header = req.headers.authorization;
  if (!header?.startsWith("Bearer ")) return next(new ApiError(401, "Authentication required"));

  try {
    const payload = jwt.verify(header.replace("Bearer ", ""), env.JWT_SECRET) as { sub: string };
    const user = await User.findById(payload.sub).select("name email role status");
    if (!user || user.status !== "active") return next(new ApiError(401, "Invalid account"));
    req.user = { id: user.id, name: user.name, email: user.email, role: user.role };
    next();
  } catch {
    next(new ApiError(401, "Invalid or expired token"));
  }
}

export function authorize(...roles: UserRole[]) {
  return (req: AuthRequest, _res: Response, next: NextFunction) => {
    if (!req.user || !roles.includes(req.user.role)) return next(new ApiError(403, "Insufficient permissions"));
    next();
  };
}
