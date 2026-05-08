import { Schema, model, type InferSchemaType } from "mongoose";

export type UserRole = "super_admin" | "academy_admin" | "head_coach" | "coach" | "athlete" | "parent" | "sai_liaison" | "admin" | "student";

const userSchema = new Schema(
  {
    name: { type: String, required: true, trim: true },
    email: { type: String, required: true, unique: true, lowercase: true, trim: true },
    phone: { type: String, trim: true },
    passwordHash: { type: String, required: true, select: false },
    role: {
      type: String,
      enum: ["super_admin", "academy_admin", "head_coach", "coach", "athlete", "parent", "sai_liaison", "admin", "student"],
      default: "athlete",
      index: true
    },
    avatarUrl: String,
    status: { type: String, enum: ["active", "inactive", "suspended"], default: "active" }
  },
  { timestamps: true }
);

export type UserDocument = InferSchemaType<typeof userSchema>;

export const User = model("User", userSchema);
