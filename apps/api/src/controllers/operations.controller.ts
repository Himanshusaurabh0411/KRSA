import { z } from "zod";
import { Attendance, PerformanceReport, Injury, Announcement, ChatThread, Payment } from "../models/operations.model.js";
import { Admission, Batch, Student } from "../models/academy.model.js";
import type { AuthRequest } from "../middleware/auth.js";
import { buildPerformanceSuggestions } from "../services/ai.service.js";
import { getRazorpay, verifyPaymentSignature } from "../services/payment.service.js";
import { ApiError, asyncHandler } from "../utils/errors.js";

export const createAttendance = asyncHandler(async (req: AuthRequest, res) => {
  const data = z.object({
    batch: z.string(),
    sessionDate: z.coerce.date(),
    entries: z.array(z.object({ student: z.string(), status: z.enum(["present", "absent", "late", "excused"]), notes: z.string().optional() }))
  }).parse(req.body);
  res.status(201).json({ attendance: await Attendance.create({ ...data, markedBy: req.user?.id }) });
});

export const listAttendance = asyncHandler(async (_req, res) => {
  res.json({ attendance: await Attendance.find().populate("batch entries.student").sort({ sessionDate: -1 }) });
});

export const createPerformanceReport = asyncHandler(async (_req: AuthRequest, res) => {
  const data = z.object({
    student: z.string(),
    coach: z.string(),
    sport: z.string().optional(),
    periodStart: z.coerce.date().optional(),
    periodEnd: z.coerce.date().optional(),
    metrics: z.array(z.object({ key: z.string(), value: z.number(), unit: z.string().optional() })),
    coachNotes: z.string().optional(),
    injuryStatus: z.string().optional(),
    score: z.number().min(0).max(100).default(0)
  }).parse(_req.body);
  const report = await PerformanceReport.create({ ...data, aiSuggestions: buildPerformanceSuggestions(data.metrics, data.injuryStatus) });
  res.status(201).json({ report });
});

export const listPerformanceReports = asyncHandler(async (_req, res) => {
  res.json({ reports: await PerformanceReport.find().populate("student coach").sort({ createdAt: -1 }) });
});

export const createInjury = asyncHandler(async (req: AuthRequest, res) => {
  const data = z.object({
    student: z.string(),
    bodyPart: z.string().optional(),
    severity: z.enum(["low", "medium", "high"]).default("low"),
    status: z.enum(["open", "rehab", "cleared"]).default("open"),
    notes: z.string().optional(),
    returnToPlayDate: z.coerce.date().optional()
  }).parse(req.body);
  res.status(201).json({ injury: await Injury.create({ ...data, reportedBy: req.user?.id }) });
});

export const listInjuries = asyncHandler(async (_req, res) => {
  res.json({ injuries: await Injury.find().populate("student reportedBy").sort({ createdAt: -1 }) });
});

export const createAnnouncement = asyncHandler(async (req: AuthRequest, res) => {
  const data = z.object({
    title: z.string().min(2),
    body: z.string().min(2),
    audience: z.enum(["all", "students", "coaches", "admins"]).default("all"),
    pinned: z.boolean().default(false)
  }).parse(req.body);
  res.status(201).json({ announcement: await Announcement.create({ ...data, createdBy: req.user?.id }) });
});

export const listAnnouncements = asyncHandler(async (_req, res) => {
  res.json({ announcements: await Announcement.find().sort({ pinned: -1, createdAt: -1 }) });
});

export const listChatThreads = asyncHandler(async (req: AuthRequest, res) => {
  res.json({ threads: await ChatThread.find({ participants: req.user?.id }).populate("participants messages.sender").sort({ updatedAt: -1 }) });
});

export const createChatThread = asyncHandler(async (req: AuthRequest, res) => {
  const data = z.object({ participantIds: z.array(z.string()).min(1), message: z.string().min(1) }).parse(req.body);
  const thread = await ChatThread.create({
    participants: [req.user?.id, ...data.participantIds],
    messages: [{ sender: req.user?.id, body: data.message, readBy: [req.user?.id] }]
  });
  res.status(201).json({ thread });
});

export const addChatMessage = asyncHandler(async (req: AuthRequest, res) => {
  const data = z.object({ body: z.string().min(1) }).parse(req.body);
  const thread = await ChatThread.findOneAndUpdate(
    { _id: req.params.id, participants: req.user?.id },
    { $push: { messages: { sender: req.user?.id, body: data.body, readBy: [req.user?.id] } } },
    { new: true }
  );
  res.json({ thread });
});

export const listPayments = asyncHandler(async (_req, res) => {
  res.json({ payments: await Payment.find().populate("student").sort({ createdAt: -1 }) });
});

export const createPaymentOrder = asyncHandler(async (_req, res) => {
  const data = z.object({ student: z.string(), amount: z.number().positive(), month: z.string().optional() }).parse(_req.body);
  const razorpay = getRazorpay();
  if (!razorpay) throw new ApiError(503, "Razorpay is not configured");
  const receipt = `KRSA-${Date.now()}`;
  const order = await razorpay.orders.create({ amount: data.amount * 100, currency: "INR", receipt });
  const payment = await Payment.create({ ...data, receipt, razorpayOrderId: order.id });
  res.status(201).json({ order, payment });
});

export const verifyPayment = asyncHandler(async (req, res) => {
  const data = z.object({ razorpay_order_id: z.string(), razorpay_payment_id: z.string(), razorpay_signature: z.string() }).parse(req.body);
  const ok = verifyPaymentSignature(data.razorpay_order_id, data.razorpay_payment_id, data.razorpay_signature);
  if (!ok) throw new ApiError(400, "Invalid payment signature");
  const payment = await Payment.findOneAndUpdate(
    { razorpayOrderId: data.razorpay_order_id },
    { status: "paid", razorpayPaymentId: data.razorpay_payment_id },
    { new: true }
  );
  res.json({ payment });
});

export const razorpayWebhook = asyncHandler(async (req, res) => {
  res.json({ received: true, event: req.body.event });
});

export const adminAnalytics = asyncHandler(async (_req, res) => {
  const [students, batches, admissions, paid, injuries] = await Promise.all([
    Student.countDocuments(),
    Batch.countDocuments(),
    Admission.countDocuments({ status: "new" }),
    Payment.aggregate([{ $match: { status: "paid" } }, { $group: { _id: null, total: { $sum: "$amount" } } }]),
    Injury.countDocuments({ status: { $ne: "cleared" } })
  ]);
  res.json({ students, batches, pendingAdmissions: admissions, paidAmount: paid[0]?.total ?? 0, activeInjuries: injuries });
});
