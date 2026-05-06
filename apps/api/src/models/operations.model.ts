import { Schema, model } from "mongoose";

export const Attendance = model(
  "Attendance",
  new Schema(
    {
      batch: { type: Schema.Types.ObjectId, ref: "Batch", required: true },
      sessionDate: { type: Date, required: true },
      markedBy: { type: Schema.Types.ObjectId, ref: "User", required: true },
      entries: [
        {
          student: { type: Schema.Types.ObjectId, ref: "Student", required: true },
          status: { type: String, enum: ["present", "absent", "late", "excused"], required: true },
          notes: String
        }
      ]
    },
    { timestamps: true }
  )
);

export const PerformanceReport = model(
  "PerformanceReport",
  new Schema(
    {
      student: { type: Schema.Types.ObjectId, ref: "Student", required: true },
      coach: { type: Schema.Types.ObjectId, ref: "Coach", required: true },
      sport: String,
      periodStart: Date,
      periodEnd: Date,
      metrics: [{ key: String, value: Number, unit: String }],
      coachNotes: String,
      aiSuggestions: [String],
      score: { type: Number, min: 0, max: 100, default: 0 }
    },
    { timestamps: true }
  )
);

export const Injury = model(
  "Injury",
  new Schema(
    {
      student: { type: Schema.Types.ObjectId, ref: "Student", required: true },
      reportedBy: { type: Schema.Types.ObjectId, ref: "User", required: true },
      bodyPart: String,
      severity: { type: String, enum: ["low", "medium", "high"], default: "low" },
      status: { type: String, enum: ["open", "rehab", "cleared"], default: "open" },
      notes: String,
      returnToPlayDate: Date
    },
    { timestamps: true }
  )
);

export const Payment = model(
  "Payment",
  new Schema(
    {
      student: { type: Schema.Types.ObjectId, ref: "Student", required: true },
      amount: { type: Number, required: true },
      currency: { type: String, default: "INR" },
      month: String,
      status: { type: String, enum: ["created", "paid", "failed", "refunded"], default: "created", index: true },
      razorpayOrderId: String,
      razorpayPaymentId: String,
      receipt: String
    },
    { timestamps: true }
  )
);

export const Announcement = model(
  "Announcement",
  new Schema(
    {
      title: { type: String, required: true },
      body: { type: String, required: true },
      audience: { type: String, enum: ["all", "students", "coaches", "admins"], default: "all" },
      createdBy: { type: Schema.Types.ObjectId, ref: "User", required: true },
      pinned: { type: Boolean, default: false }
    },
    { timestamps: true }
  )
);

export const ChatThread = model(
  "ChatThread",
  new Schema(
    {
      participants: [{ type: Schema.Types.ObjectId, ref: "User", required: true }],
      messages: [
        {
          sender: { type: Schema.Types.ObjectId, ref: "User", required: true },
          body: { type: String, required: true },
          readBy: [{ type: Schema.Types.ObjectId, ref: "User" }],
          createdAt: { type: Date, default: Date.now }
        }
      ]
    },
    { timestamps: true }
  )
);
