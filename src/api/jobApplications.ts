import express from "express";
import {
  createJobApplication,
  getJobApplicationById,
  getJobApplications,
} from "../application/features/jobApplications";
import { ClerkExpressRequireAuth } from "@clerk/clerk-sdk-node";
import AuthorizationMiddleware from "./middlewares/authorization-middleware";

const jobApplicationsRouter = express.Router();

jobApplicationsRouter
  .route("/")
  .get(ClerkExpressRequireAuth({}),  getJobApplications)
  .post(ClerkExpressRequireAuth({}), createJobApplication);

jobApplicationsRouter
  .route("/:id")
  .get(
    ClerkExpressRequireAuth({}),
    getJobApplicationById
  );

export default jobApplicationsRouter;
