import { Schema, model } from "mongoose";

export const Sport = model(
  "Sport",
  new Schema(
    {
      name: { type: String, required: true, unique: true },
      nameHi: String,
      iconUrl: String,
      description: String,
      isActive: { type: Boolean, default: true }
    },
    { timestamps: true }
  )
);

export const Program = model(
  "Program",
  new Schema(
    {
      title: { type: String, required: true },
      sport: { type: String, required: true },
      level: { type: String, enum: ["beginner", "intermediate", "advanced", "kids", "fitness"], required: true },
      ageGroup: String,
      monthlyFee: { type: Number, required: true },
      description: String,
      active: { type: Boolean, default: true }
    },
    { timestamps: true }
  )
);

export const Coach = model(
  "Coach",
  new Schema(
    {
      user: { type: Schema.Types.ObjectId, ref: "User", required: true, unique: true },
      sports: [String],
      certifications: [String],
      bio: String,
      availability: [{ day: String, from: String, to: String }]
    },
    { timestamps: true }
  )
);

export const Student = model(
  "Student",
  new Schema(
    {
      user: { type: Schema.Types.ObjectId, ref: "User", required: true, unique: true },
      guardianName: { type: String, required: true },
      guardianPhone: { type: String, required: true },
      dob: Date,
      program: { type: Schema.Types.ObjectId, ref: "Program" },
      batch: { type: Schema.Types.ObjectId, ref: "Batch" },
      medicalNotes: String,
      enrollmentStatus: { type: String, enum: ["pending", "active", "paused", "graduated"], default: "pending" }
    },
    { timestamps: true }
  )
);

export const Athlete = model(
  "Athlete",
  new Schema(
    {
      user: { type: Schema.Types.ObjectId, ref: "User" },
      name: { type: String, required: true, index: true },
      sport: { type: Schema.Types.ObjectId, ref: "Sport", required: true },
      batch: { type: Schema.Types.ObjectId, ref: "Batch" },
      coach: { type: Schema.Types.ObjectId, ref: "Coach" },
      dob: Date,
      gender: { type: String, enum: ["female", "male", "other"] },
      address: String,
      aadhaarLast4: String,
      kitStatus: { type: Boolean, default: false, index: true },
      photoUrl: String,
      bio: String,
      achievements: [{ type: Schema.Types.ObjectId, ref: "Achievement" }],
      archivedAt: Date
    },
    { timestamps: true }
  )
);

export const Batch = model(
  "Batch",
  new Schema(
    {
      name: { type: String, required: true },
      program: { type: Schema.Types.ObjectId, ref: "Program", required: true },
      coach: { type: Schema.Types.ObjectId, ref: "Coach", required: true },
      capacity: { type: Number, default: 24 },
      venue: String,
      schedule: [{ day: String, startTime: String, endTime: String }]
    },
    { timestamps: true }
  )
);

export const Admission = model(
  "Admission",
  new Schema(
    {
      studentName: { type: String, required: true },
      email: { type: String, required: true, lowercase: true },
      phone: { type: String, required: true },
      dob: Date,
      program: { type: Schema.Types.ObjectId, ref: "Program" },
      guardianName: String,
      guardianPhone: String,
      previousExperience: String,
      medicalNotes: String,
      documents: [{ filename: String, path: String, mimetype: String }],
      status: { type: String, enum: ["new", "under_review", "shortlisted", "approved", "rejected", "waitlisted"], default: "new", index: true },
      reviewedBy: { type: Schema.Types.ObjectId, ref: "User" }
    },
    { timestamps: true }
  )
);

export const Application = model(
  "Application",
  new Schema(
    {
      name: { type: String, required: true },
      sport: { type: Schema.Types.ObjectId, ref: "Sport" },
      dob: Date,
      gender: { type: String, enum: ["female", "male", "other"] },
      school: String,
      aadhaarLast4: String,
      guardianName: String,
      guardianPhone: String,
      address: String,
      status: { type: String, enum: ["new", "under_review", "shortlisted", "approved", "rejected", "waitlisted"], default: "new", index: true },
      documents: [{ docType: String, filename: String, path: String, mimetype: String, verified: { type: Boolean, default: false } }],
      reviewedBy: { type: Schema.Types.ObjectId, ref: "User" },
      convertedAthlete: { type: Schema.Types.ObjectId, ref: "Athlete" }
    },
    { timestamps: true }
  )
);
