import { NextFunction, Request, Response } from "express";
import JobApplication from "../../persistence/entities/JobApplication";
import { generateRating } from "./rating";
import NotFoundError from "../../domain/errors/not-found-error";
import AuthorizationMiddleware from "../../api/middlewares/authorization-middleware";
import { request } from "http";

export const getJobApplications = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  
  try {

    const { jobId } = req.query;
    if (!jobId) {
      const jobApplications = await JobApplication.find()
        .populate("job")
        .exec();
      return res.status(200).json(jobApplications);
    }
    const jobApplications = await JobApplication.find({ job: jobId });
    return res.status(200).json(jobApplications);
  } catch (error) {
    next(error);
  }
};

export const createJobApplication = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    console.log(req.body);
    const jobApplication = req.body;
    const createdJobApplication = await JobApplication.create(jobApplication);
    generateRating(createdJobApplication._id);

    return res.status(201).send();
  } catch (error) {
    console.log(error);
    next(error);
  }
};

export const getJobApplicationById = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const jobApplication = await JobApplication.findById(req.params.id);
    if (jobApplication === null) {
      throw new NotFoundError("Job Application not found");
    }
    return res.status(200).json(jobApplication);
  } catch (error) {
    next(error);
  }
};
