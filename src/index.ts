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
app.get("/", (req, res) => res.send("Express on Vercel"));

app.use("/jobs", jobsRouter);
app.use("/jobApplications", jobApplicationsRouter);

app.use(GlobalErrorHandlerMiddleware);

const PORT = process.env.PORT || 8000;
app.listen(PORT, () => console.log(`Server is listening on port ${PORT}.`));
