import createError from "http-errors";
import jwt from "jsonwebtoken";
import asyncErrorHandler from "../utils/asyncErrorHandler.js";

export const authenticate = asyncErrorHandler(async (req, res, next) => {
  const bearerheader = req.headers.authorization;
  if (bearerheader != undefined) {
    const bearer = bearerheader.split(" ");
    const bearerToken = bearer[1];
    const { id } = await jwt.verify(bearerToken, process.env.SECRET_KEY);
    if (id) {
      req.userId = id;
      next();
    } else {
      next(createError(404, "User Not Auth"));
    }
  } else {
    next(createError(404, "Token is not found"));
  }
});
