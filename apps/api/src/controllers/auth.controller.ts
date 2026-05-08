import jwt, { type SignOptions } from "jsonwebtoken";
import { z } from "zod";
import bcrypt from "bcryptjs";
import { env } from "../config/env.js";
import { User } from "../models/user.model.js";
import { ApiError, asyncHandler } from "../utils/errors.js";
import type { AuthRequest } from "../middleware/auth.js";

const registerSchema = z.object({
  name: z.string().min(2),
  email: z.string().email(),
  phone: z.string().optional(),
  password: z.string().min(8),
  role: z.enum(["super_admin", "academy_admin", "head_coach", "coach", "athlete", "parent", "sai_liaison", "admin", "student"]).default("athlete")
});

const loginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(1)
});

function signToken(userId: string) {
  return jwt.sign({}, env.JWT_SECRET, {
    subject: userId,
    expiresIn: env.JWT_EXPIRES_IN as SignOptions["expiresIn"]
  });
}

export const register = asyncHandler(async (req, res) => {
  const data = registerSchema.parse(req.body);
  const exists = await User.exists({ email: data.email });
  if (exists) throw new ApiError(409, "Email already registered");
  const passwordHash = await bcrypt.hash(data.password, 12);
  const user = await User.create({ ...data, passwordHash });
  res.status(201).json({ token: signToken(user.id), user: { id: user.id, name: user.name, email: user.email, role: user.role } });
});

export const login = asyncHandler(async (req, res) => {
  const data = loginSchema.parse(req.body);
  const user = await User.findOne({ email: data.email }).select("+passwordHash");
  if (!user || !(await bcrypt.compare(data.password, user.passwordHash))) throw new ApiError(401, "Invalid email or password");
  res.json({ token: signToken(user.id), user: { id: user.id, name: user.name, email: user.email, role: user.role } });
});

export const me = asyncHandler(async (req: AuthRequest, res) => {
  res.json({ user: req.user });
});
