import "dotenv/config";
import express from "express";
import jobsRouter from "./api/jobs";
import { connectDB } from "./persistence/db";
import jobApplicationsRouter from "./api/jobApplications";
import cors from "cors";
import GlobalErrorHandlerMiddleware from "./api/middlewares/global-error-handling-middleware";

const app = express();
app.use(express.json()); //used to convert string into json
app.use(cors()); //allow any url to call this API

connectDB();

app.use("/jobs", jobsRouter);
app.use("/jobApplications", jobApplicationsRouter);

app.use(GlobalErrorHandlerMiddleware);

app.listen(8000, () => console.log("Server is listening on port 8000."));
