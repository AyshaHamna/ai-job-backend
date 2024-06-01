import { NextFunction, Request, Response } from "express";
import { sessions } from "@clerk/clerk-sdk-node";
import ForbiddenError from "../../domain/errors/forbidden-error";

enum UserRole {
  Admin = "admin",
}

const AuthorizationMiddleware = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  //@ts-ignore
  if (sessions.metadata.role !== UserRole.Admin) {
    throw new ForbiddenError("Admin only route");
  }
  next();
};

export default AuthorizationMiddleware;
