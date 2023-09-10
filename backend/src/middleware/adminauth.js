import createError from "http-errors";
import jwt from "jsonwebtoken";
import asyncErrorHandler from "../utils/asyncErrorHandler.js";
import User from "../model/user.js";

export const adminauth = asyncErrorHandler(async (req, res, next) => {
  const bearerheader = req.headers.authorization;
  if (bearerheader != undefined) {
    const bearer = bearerheader.split(" ");
    const bearerToken = bearer[1];
    const { id } = jwt.verify(bearerToken, process.env.SECRET_KEY);
    const result = await User.findOne({ _id: id });
    if (result && result?.role == "admin") {
      req.userId = id;
      next();
    } else {
      next(createError(404, "User not  Authorized"));
    }
  } else {
    next(createError(404, "Token is not found"));
  }
});
