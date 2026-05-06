import { Router } from "express";
import {
  addChatMessage,
  adminAnalytics,
  createAnnouncement,
  createAttendance,
  createChatThread,
  createInjury,
  createPaymentOrder,
  createPerformanceReport,
  listAnnouncements,
  listAttendance,
  listChatThreads,
  listInjuries,
  listPayments,
  listPerformanceReports,
  razorpayWebhook,
  verifyPayment
} from "../controllers/operations.controller.js";
import { authenticate, authorize } from "../middleware/auth.js";

export const attendanceRouter = Router();
attendanceRouter.get("/", authenticate, authorize("admin", "coach"), listAttendance);
attendanceRouter.post("/", authenticate, authorize("admin", "coach"), createAttendance);

export const performanceRouter = Router();
performanceRouter.get("/", authenticate, listPerformanceReports);
performanceRouter.post("/", authenticate, authorize("admin", "coach"), createPerformanceReport);

export const injuryRouter = Router();
injuryRouter.get("/", authenticate, listInjuries);
injuryRouter.post("/", authenticate, authorize("admin", "coach"), createInjury);

export const announcementRouter = Router();
announcementRouter.get("/", authenticate, listAnnouncements);
announcementRouter.post("/", authenticate, authorize("admin", "coach"), createAnnouncement);

export const chatRouter = Router();
chatRouter.get("/threads", authenticate, listChatThreads);
chatRouter.post("/threads", authenticate, createChatThread);
chatRouter.post("/threads/:id/messages", authenticate, addChatMessage);

export const paymentRouter = Router();
paymentRouter.get("/", authenticate, listPayments);
paymentRouter.post("/create-order", authenticate, createPaymentOrder);
paymentRouter.post("/verify", authenticate, verifyPayment);
paymentRouter.post("/webhook", razorpayWebhook);

export const analyticsRouter = Router();
analyticsRouter.get("/admin", authenticate, authorize("admin"), adminAnalytics);
analyticsRouter.get("/student", authenticate, authorize("student", "admin"), adminAnalytics);
analyticsRouter.get("/coach", authenticate, authorize("coach", "admin"), adminAnalytics);
