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

export const Tournament = model(
  "Tournament",
  new Schema(
    {
      name: { type: String, required: true },
      sport: { type: Schema.Types.ObjectId, ref: "Sport" },
      dateStart: Date,
      dateEnd: Date,
      venue: String,
      level: { type: String, enum: ["academy", "district", "state", "national", "international", "zonal"], default: "academy" },
      registrationStatus: { type: String, enum: ["open", "closed", "invite_only"], default: "open" },
      status: { type: String, enum: ["upcoming", "live", "completed"], default: "upcoming", index: true },
      results: [{ title: String, fileUrl: String, uploadedAt: Date }],
      createdBy: { type: Schema.Types.ObjectId, ref: "User" }
    },
    { timestamps: true }
  )
);

export const Achievement = model(
  "Achievement",
  new Schema(
    {
      athlete: { type: Schema.Types.ObjectId, ref: "Athlete", required: true },
      tournament: { type: Schema.Types.ObjectId, ref: "Tournament" },
      medal: { type: String, enum: ["gold", "silver", "bronze", "participation"] },
      description: String,
      date: Date,
      certificateUrl: String,
      mediaUrls: [String]
    },
    { timestamps: true }
  )
);

export const NewsPost = model(
  "NewsPost",
  new Schema(
    {
      title: { type: String, required: true },
      slug: { type: String, required: true, unique: true },
      body: String,
      excerpt: String,
      featuredImage: String,
      publishedAt: Date,
      author: { type: Schema.Types.ObjectId, ref: "User" },
      tags: [String],
      seo: { metaTitle: String, metaDescription: String, ogImage: String },
      status: { type: String, enum: ["draft", "scheduled", "published"], default: "draft" }
    },
    { timestamps: true }
  )
);

export const GalleryItem = model(
  "GalleryItem",
  new Schema(
    {
      type: { type: String, enum: ["photo", "video"], required: true },
      url: { type: String, required: true },
      album: String,
      caption: String,
      sport: { type: Schema.Types.ObjectId, ref: "Sport" },
      eventDate: Date,
      tags: [String],
      isPublic: { type: Boolean, default: true }
    },
    { timestamps: true }
  )
);

export const SaiDocument = model(
  "SaiDocument",
  new Schema(
    {
      docType: { type: String, enum: ["uc", "bill", "attendance", "mou", "branding", "other"], required: true },
      title: { type: String, required: true },
      fileUrl: String,
      uploadedBy: { type: Schema.Types.ObjectId, ref: "User" },
      period: String,
      notes: String
    },
    { timestamps: true }
  )
);

export const AuditLog = model(
  "AuditLog",
  new Schema(
    {
      actor: { type: Schema.Types.ObjectId, ref: "User" },
      action: { type: String, required: true },
      resource: String,
      resourceId: String,
      metadata: Schema.Types.Mixed
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
