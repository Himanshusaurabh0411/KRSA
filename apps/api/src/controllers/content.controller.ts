import { z } from "zod";
import { Application, Athlete, Batch, Coach, Sport } from "../models/academy.model.js";
import { Achievement, AuditLog, GalleryItem, NewsPost, SaiDocument, Tournament } from "../models/operations.model.js";
import { asyncHandler } from "../utils/errors.js";
import type { AuthRequest } from "../middleware/auth.js";

const id = z.string().min(1);

export const listSports = asyncHandler(async (_req, res) => {
  res.json({ sports: await Sport.find({ isActive: true }).sort("name") });
});

export const createSport = asyncHandler(async (req: AuthRequest, res) => {
  const data = z.object({
    name: z.string().min(2),
    nameHi: z.string().optional(),
    iconUrl: z.string().optional(),
    description: z.string().optional()
  }).parse(req.body);
  const sport = await Sport.create(data);
  await AuditLog.create({ actor: req.user?.id, action: "sport.create", resource: "Sport", resourceId: sport.id });
  res.status(201).json({ sport });
});

export const listAthletes = asyncHandler(async (req, res) => {
  const query = z.object({
    sport: z.string().optional(),
    gender: z.string().optional(),
    kitStatus: z.coerce.boolean().optional()
  }).parse(req.query);
  const filter: Record<string, unknown> = { archivedAt: { $exists: false } };
  if (query.sport) filter.sport = query.sport;
  if (query.gender) filter.gender = query.gender;
  if (query.kitStatus !== undefined) filter.kitStatus = query.kitStatus;
  const athletes = await Athlete.find(filter).populate("sport batch coach achievements").sort({ createdAt: -1 });
  res.json({ athletes });
});

export const createAthlete = asyncHandler(async (req: AuthRequest, res) => {
  const data = z.object({
    name: z.string().min(2),
    sport: id,
    batch: z.string().optional(),
    coach: z.string().optional(),
    dob: z.coerce.date().optional(),
    gender: z.enum(["female", "male", "other"]).optional(),
    address: z.string().optional(),
    aadhaarLast4: z.string().length(4).optional(),
    kitStatus: z.boolean().default(false),
    photoUrl: z.string().optional(),
    bio: z.string().optional()
  }).parse(req.body);
  const athlete = await Athlete.create(data);
  await AuditLog.create({ actor: req.user?.id, action: "athlete.create", resource: "Athlete", resourceId: athlete.id });
  res.status(201).json({ athlete });
});

export const archiveAthlete = asyncHandler(async (req: AuthRequest, res) => {
  const athlete = await Athlete.findByIdAndUpdate(req.params.id, { archivedAt: new Date() }, { new: true });
  await AuditLog.create({ actor: req.user?.id, action: "athlete.archive", resource: "Athlete", resourceId: req.params.id });
  res.json({ athlete });
});

export const listApplications = asyncHandler(async (_req, res) => {
  res.json({ applications: await Application.find().populate("sport reviewedBy convertedAthlete").sort({ createdAt: -1 }) });
});

export const createApplication = asyncHandler(async (req, res) => {
  const data = z.object({
    name: z.string().min(2),
    sport: z.string().optional(),
    dob: z.coerce.date().optional(),
    gender: z.enum(["female", "male", "other"]).optional(),
    school: z.string().optional(),
    aadhaarLast4: z.string().length(4).optional(),
    guardianName: z.string().optional(),
    guardianPhone: z.string().optional(),
    address: z.string().optional()
  }).parse(req.body);
  const files = (req.files as Express.Multer.File[] | undefined)?.map((file) => ({
    docType: file.fieldname,
    filename: file.originalname,
    path: file.path,
    mimetype: file.mimetype
  }));
  const application = await Application.create({ ...data, documents: files });
  res.status(201).json({ application });
});

export const updateApplicationStatus = asyncHandler(async (req: AuthRequest, res) => {
  const body = z.object({ status: z.enum(["new", "under_review", "shortlisted", "approved", "rejected", "waitlisted"]) }).parse(req.body);
  const application = await Application.findByIdAndUpdate(req.params.id, { ...body, reviewedBy: req.user?.id }, { new: true });
  await AuditLog.create({ actor: req.user?.id, action: "application.status", resource: "Application", resourceId: req.params.id, metadata: body });
  res.json({ application });
});

export const listTournaments = asyncHandler(async (_req, res) => {
  res.json({ tournaments: await Tournament.find().populate("sport").sort({ dateStart: -1 }) });
});

export const createTournament = asyncHandler(async (req: AuthRequest, res) => {
  const data = z.object({
    name: z.string().min(2),
    sport: z.string().optional(),
    dateStart: z.coerce.date().optional(),
    dateEnd: z.coerce.date().optional(),
    venue: z.string().optional(),
    level: z.enum(["academy", "district", "state", "national", "international", "zonal"]).default("academy"),
    registrationStatus: z.enum(["open", "closed", "invite_only"]).default("open"),
    status: z.enum(["upcoming", "live", "completed"]).default("upcoming")
  }).parse(req.body);
  const tournament = await Tournament.create({ ...data, createdBy: req.user?.id });
  await AuditLog.create({ actor: req.user?.id, action: "tournament.create", resource: "Tournament", resourceId: tournament.id });
  res.status(201).json({ tournament });
});

export const addAchievement = asyncHandler(async (req: AuthRequest, res) => {
  const data = z.object({
    athlete: id,
    tournament: z.string().optional(),
    medal: z.enum(["gold", "silver", "bronze", "participation"]).optional(),
    description: z.string().optional(),
    date: z.coerce.date().optional(),
    certificateUrl: z.string().optional(),
    mediaUrls: z.array(z.string()).default([])
  }).parse(req.body);
  const achievement = await Achievement.create(data);
  await Athlete.findByIdAndUpdate(data.athlete, { $addToSet: { achievements: achievement.id } });
  await AuditLog.create({ actor: req.user?.id, action: "achievement.create", resource: "Achievement", resourceId: achievement.id });
  res.status(201).json({ achievement });
});

export const listNews = asyncHandler(async (_req, res) => {
  res.json({ posts: await NewsPost.find({ status: "published" }).sort({ publishedAt: -1 }) });
});

export const createNews = asyncHandler(async (req: AuthRequest, res) => {
  const data = z.object({
    title: z.string().min(2),
    slug: z.string().min(2),
    body: z.string().optional(),
    excerpt: z.string().optional(),
    featuredImage: z.string().optional(),
    publishedAt: z.coerce.date().optional(),
    tags: z.array(z.string()).default([]),
    seo: z.object({ metaTitle: z.string().optional(), metaDescription: z.string().optional(), ogImage: z.string().optional() }).optional(),
    status: z.enum(["draft", "scheduled", "published"]).default("draft")
  }).parse(req.body);
  const post = await NewsPost.create({ ...data, author: req.user?.id });
  res.status(201).json({ post });
});

export const listGallery = asyncHandler(async (_req, res) => {
  res.json({ items: await GalleryItem.find({ isPublic: true }).populate("sport").sort({ eventDate: -1 }) });
});

export const createGalleryItem = asyncHandler(async (req: AuthRequest, res) => {
  const data = z.object({
    type: z.enum(["photo", "video"]),
    url: z.string(),
    album: z.string().optional(),
    caption: z.string().optional(),
    sport: z.string().optional(),
    eventDate: z.coerce.date().optional(),
    tags: z.array(z.string()).default([]),
    isPublic: z.boolean().default(true)
  }).parse(req.body);
  const item = await GalleryItem.create(data);
  await AuditLog.create({ actor: req.user?.id, action: "gallery.create", resource: "GalleryItem", resourceId: item.id });
  res.status(201).json({ item });
});

export const listSaiDocuments = asyncHandler(async (_req, res) => {
  res.json({ documents: await SaiDocument.find().populate("uploadedBy").sort({ createdAt: -1 }) });
});

export const createSaiDocument = asyncHandler(async (req: AuthRequest, res) => {
  const data = z.object({
    docType: z.enum(["uc", "bill", "attendance", "mou", "branding", "other"]),
    title: z.string().min(2),
    fileUrl: z.string().optional(),
    period: z.string().optional(),
    notes: z.string().optional()
  }).parse(req.body);
  const document = await SaiDocument.create({ ...data, uploadedBy: req.user?.id });
  await AuditLog.create({ actor: req.user?.id, action: "sai_document.create", resource: "SaiDocument", resourceId: document.id });
  res.status(201).json({ document });
});

export const saiExport = asyncHandler(async (_req, res) => {
  const athletes = await Athlete.find({ kitStatus: true }).populate("sport batch coach achievements");
  res.json({
    format: "nsrs-export-ready",
    generatedAt: new Date(),
    athletes
  });
});
