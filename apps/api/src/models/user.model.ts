import { Schema, model, type InferSchemaType } from "mongoose";

export type UserRole = "admin" | "coach" | "student";

const userSchema = new Schema(
  {
    name: { type: String, required: true, trim: true },
    email: { type: String, required: true, unique: true, lowercase: true, trim: true },
    phone: { type: String, trim: true },
    passwordHash: { type: String, required: true, select: false },
    role: { type: String, enum: ["admin", "coach", "student"], default: "student", index: true },
    avatarUrl: String,
    status: { type: String, enum: ["active", "inactive", "suspended"], default: "active" }
  },
  { timestamps: true }
);

export type UserDocument = InferSchemaType<typeof userSchema>;

export const User = model("User", userSchema);
