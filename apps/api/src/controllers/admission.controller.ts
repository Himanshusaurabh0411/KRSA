import { z } from "zod";
import { Admission } from "../models/academy.model.js";
import { sendEmail } from "../services/email.service.js";
import { asyncHandler } from "../utils/errors.js";
import type { AuthRequest } from "../middleware/auth.js";

const admissionSchema = z.object({
  studentName: z.string().min(2),
  email: z.string().email(),
  phone: z.string().min(8),
  dob: z.coerce.date().optional(),
  program: z.string().optional(),
  guardianName: z.string().optional(),
  guardianPhone: z.string().optional(),
  previousExperience: z.string().optional(),
  medicalNotes: z.string().optional()
});

export const createAdmission = asyncHandler(async (req, res) => {
  const data = admissionSchema.parse(req.body);
  const files = (req.files as Express.Multer.File[] | undefined)?.map((file) => ({
    filename: file.originalname,
    path: file.path,
    mimetype: file.mimetype
  }));
  const admission = await Admission.create({ ...data, documents: files });
  await sendEmail(data.email, "KRSA admission received", `<p>Your KRSA admission application has been received. Reference: ${admission.id}</p>`);
  res.status(201).json({ admission });
});

export const listAdmissions = asyncHandler(async (_req, res) => {
  const admissions = await Admission.find().sort({ createdAt: -1 }).populate("program");
  res.json({ admissions });
});

export const updateAdmissionStatus = asyncHandler(async (req: AuthRequest, res) => {
  const body = z.object({ status: z.enum(["new", "under_review", "shortlisted", "approved", "rejected", "waitlisted"]) }).parse(req.body);
  const admission = await Admission.findByIdAndUpdate(req.params.id, { status: body.status, reviewedBy: req.user?.id }, { new: true });
  res.json({ admission });
});
