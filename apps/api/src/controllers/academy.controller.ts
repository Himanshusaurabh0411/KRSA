import { z } from "zod";
import { Batch, Coach, Program, Student } from "../models/academy.model.js";
import { asyncHandler } from "../utils/errors.js";

export const listPrograms = asyncHandler(async (_req, res) => {
  res.json({ programs: await Program.find({ active: true }).sort("title") });
});

export const createProgram = asyncHandler(async (req, res) => {
  const data = z.object({
    title: z.string().min(2),
    sport: z.string().min(2),
    level: z.enum(["beginner", "intermediate", "advanced", "kids", "fitness"]),
    ageGroup: z.string().optional(),
    monthlyFee: z.number().positive(),
    description: z.string().optional()
  }).parse(req.body);
  res.status(201).json({ program: await Program.create(data) });
});

export const listBatches = asyncHandler(async (_req, res) => {
  const batches = await Batch.find().populate("program coach").sort("name");
  res.json({ batches });
});

export const createBatch = asyncHandler(async (req, res) => {
  const data = z.object({
    name: z.string().min(2),
    program: z.string(),
    coach: z.string(),
    capacity: z.number().positive().optional(),
    venue: z.string().optional(),
    schedule: z.array(z.object({ day: z.string(), startTime: z.string(), endTime: z.string() })).default([])
  }).parse(req.body);
  res.status(201).json({ batch: await Batch.create(data) });
});

export const listStudents = asyncHandler(async (_req, res) => {
  res.json({ students: await Student.find().populate("user program batch").sort({ createdAt: -1 }) });
});

export const listCoaches = asyncHandler(async (_req, res) => {
  res.json({ coaches: await Coach.find().populate("user").sort({ createdAt: -1 }) });
});
