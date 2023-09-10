import createError from "http-errors";
import asyncErrorHandler from "../utils/asyncErrorHandler.js";
import User from "../model/user.js";
import { HashPasswordConvert, VerifyPassword } from "../utils/HashPassword.js";
import jwt from "jsonwebtoken";
import { v4 as uuidv4 } from "uuid";
import ProductModel from "../model/UserProduct.js";
import uploadImage from "../utils/UploadImage.js";

export const Login = asyncErrorHandler(async (req, res, next) => {
  const { email, password } = req.body;
  if (!(email && password)) {
    next(createError(404, "Field must be required"));
  } else {
    let userData = await User.findOne({ email });
    if (userData) {
      const isMatch = await VerifyPassword(password, userData?.password);
      if (isMatch) {
        const result = userData.toObject();
        delete result.password;
        const findProduct = await ProductModel.find({ userId: result?._id });
        const token = jwt.sign({ id: result._id }, process.env.SECRET_KEY);
        res.status(201).json({ status: "Success", result, token, findProduct });
      } else {
        next(createError(404, "Invalid Email or Password"));
      }
    } else {
      next(createError(404, "Invalid Email or Password"));
    }
  }
});

export const getUser = asyncErrorHandler(async (req, res, next) => {
  const id = req.userId;
  const userData = await User.findOne({ _id: id });
  if (userData) {
    const result = userData.toObject();
    delete result.password;
    const findProduct = await ProductModel.find({ userId: result?._id });
    res.send({ result, findProduct });
  } else {
    next(createError(404, "invalid token"));
  }
});

export const signup = asyncErrorHandler(async (req, res, next) => {
  const { name, email, password, base64image } = req.body;
  const imageId = uuidv4().split("-")[0];
  if (!(name && email && password)) {
    next(createError(404, "Field must be required"));
  } else {
    let image = "";
    if (base64image) {
      image = await uploadImage(base64image, imageId);
    }
    let newPassword = await HashPasswordConvert(password);
    const userData = new User({
      name,
      email,
      password: newPassword,
      image: image || "/person.png",
    });
    const data = await userData.save();
    res.status(201).json({ message: "Success" });
  }
});

export const ChangePassword = asyncErrorHandler(async (req, res, next) => {
  const { oldPassword, password } = req.body;
  if (!(oldPassword && password)) {
    next(createError(404, "Old and New Password Required"));
  } else {
    const id = req.userId;
    const user = await User.findOne({ _id: id });

    if (user) {
      const isMatch = await VerifyPassword(oldPassword, user?.password);
      if (isMatch) {
        const pwd = await HashPasswordConvert(password);
        const result = await User.findByIdAndUpdate(
          { _id: id },
          { password: pwd }
        );
        res.status(201).send(result);
      } else {
        next(createError(404, "Password is invalid"));
      }
    } else {
      next(createError(404, "User not found"));
    }
  }
});

export const AdminLogin = asyncErrorHandler(async (req, res, next) => {
  const { email, password } = req.body;
  if (!(email && password)) {
    next(createError(404, "Field must be requried"));
  } else {
    const result = await User.findOne({ email });
    if (result) {
      const isMatch = await VerifyPassword(password, result?.password);
      if (isMatch) {
        const token = jwt.sign({ id: result?._id }, process.env.SECRET_KEY);
        res.status(201).json(token);
      } else {
        next(404, "Invalid Email or Password");
      }
    } else {
      next(createError(404, "Invalid Email or Password"));
    }
  }
});
