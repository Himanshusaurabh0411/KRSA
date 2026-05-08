import cors from "cors";
import express from "express";
import rateLimit from "express-rate-limit";
import helmet from "helmet";
import morgan from "morgan";
import { env } from "./config/env.js";
import { admissionRouter } from "./routes/admission.routes.js";
import { authRouter } from "./routes/auth.routes.js";
import { batchRouter, programRouter, userManagementRouter } from "./routes/academy.routes.js";
import { applicationsRouter, athletesRouter, galleryRouter, newsRouter, saiRouter, sportsRouter, tournamentsRouter } from "./routes/content.routes.js";
import {
  analyticsRouter,
  announcementRouter,
  attendanceRouter,
  chatRouter,
  injuryRouter,
  paymentRouter,
  performanceRouter
} from "./routes/operations.routes.js";
import { errorHandler, notFound } from "./utils/errors.js";

export const app = express();

app.use(helmet());
app.use(cors({ origin: env.CLIENT_URL, credentials: true }));
app.use(express.json({ limit: "1mb" }));
app.use(morgan(env.NODE_ENV === "production" ? "combined" : "dev"));
app.use(rateLimit({ windowMs: 15 * 60 * 1000, limit: 300, standardHeaders: true, legacyHeaders: false }));

app.get("/health", (_req, res) => res.json({ status: "ok", service: "krsa-api" }));

app.use("/api/auth", authRouter);
app.use("/api/admissions", admissionRouter);
app.use("/api/programs", programRouter);
app.use("/api/sports", sportsRouter);
app.use("/api/athletes", athletesRouter);
app.use("/api/applications", applicationsRouter);
app.use("/api/tournaments", tournamentsRouter);
app.use("/api/news", newsRouter);
app.use("/api/gallery", galleryRouter);
app.use("/api/sai", saiRouter);
app.use("/api/batches", batchRouter);
app.use("/api/users", userManagementRouter);
app.use("/api/attendance", attendanceRouter);
app.use("/api/performance", performanceRouter);
app.use("/api/injuries", injuryRouter);
app.use("/api/announcements", announcementRouter);
app.use("/api/chat", chatRouter);
app.use("/api/payments", paymentRouter);
app.use("/api/analytics", analyticsRouter);

app.use(notFound);
app.use(errorHandler);
