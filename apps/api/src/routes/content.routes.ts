import { Router } from "express";
import {
  addAchievement,
  archiveAthlete,
  createApplication,
  createAthlete,
  createGalleryItem,
  createNews,
  createSaiDocument,
  createSport,
  createTournament,
  listApplications,
  listAthletes,
  listGallery,
  listNews,
  listSaiDocuments,
  listSports,
  listTournaments,
  saiExport,
  updateApplicationStatus
} from "../controllers/content.controller.js";
import { authenticate, authorize } from "../middleware/auth.js";
import { upload } from "../middleware/upload.js";

const adminRoles = ["super_admin", "academy_admin", "admin"] as const;
const coachRoles = ["super_admin", "academy_admin", "head_coach", "coach", "admin"] as const;
const saiRoles = ["super_admin", "academy_admin", "sai_liaison", "admin"] as const;

export const sportsRouter = Router();
sportsRouter.get("/", listSports);
sportsRouter.post("/", authenticate, authorize(...adminRoles), createSport);

export const athletesRouter = Router();
athletesRouter.get("/", listAthletes);
athletesRouter.post("/", authenticate, authorize(...coachRoles), createAthlete);
athletesRouter.patch("/:id/archive", authenticate, authorize(...adminRoles), archiveAthlete);
athletesRouter.post("/:id/achievements", authenticate, authorize(...coachRoles), addAchievement);

export const applicationsRouter = Router();
applicationsRouter.post("/", upload.array("documents", 6), createApplication);
applicationsRouter.get("/", authenticate, authorize(...adminRoles), listApplications);
applicationsRouter.patch("/:id/status", authenticate, authorize(...adminRoles), updateApplicationStatus);

export const tournamentsRouter = Router();
tournamentsRouter.get("/", listTournaments);
tournamentsRouter.post("/", authenticate, authorize(...adminRoles), createTournament);

export const newsRouter = Router();
newsRouter.get("/", listNews);
newsRouter.post("/", authenticate, authorize(...adminRoles), createNews);

export const galleryRouter = Router();
galleryRouter.get("/", listGallery);
galleryRouter.post("/", authenticate, authorize(...adminRoles), createGalleryItem);

export const saiRouter = Router();
saiRouter.get("/documents", authenticate, authorize(...saiRoles), listSaiDocuments);
saiRouter.post("/documents", authenticate, authorize(...saiRoles), createSaiDocument);
saiRouter.get("/export/nsrs", authenticate, authorize(...saiRoles), saiExport);
