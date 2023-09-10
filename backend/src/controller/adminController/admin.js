import createHttpError from "http-errors";
import OrderModel from "../../model/OrderSchema.js";
import Products from "../../model/Product.js";
import User from "../../model/user.js";
import uploadImage from "../../utils/UploadImage.js";
import asyncErrorHandler from "../../utils/asyncErrorHandler.js";
import { v4 as uuidv4 } from "uuid";

export const findAllUsers = asyncErrorHandler(async (req, res, next) => {
  const id = req.userId;
  const data = await User.find({
    _id: { $nin: [id] },
    name: { $not: { $regex: "admin" } },
  });
  res.status(201).json(data);
});

export const changeRole = asyncErrorHandler(async (req, res, next) => {
  const { _id, role } = req.body;
  const result = await User.updateOne({ _id }, { $set: { role } });
  console.log(result);
  res.send("Done");
});

export const AdminDetails = asyncErrorHandler(async (req, res, next) => {
  const Users = await User.aggregate([{ $count: "Total" }]);
  const Orders = await OrderModel.aggregate([
    {
      $group: {
        _id: null,
        totalPayment: { $sum: "$totalPayment" },
        totalOrders: { $sum: 1 },
      },
    },
    { $project: { _id: 0 } },
  ]);
  let obj = {
    totalUsers: Users[0].Total,
    totalPayment: Orders[0].totalPayment,
    totalOrders: Orders[0].totalOrders,
  };
  res.status(201).json(obj);
});

export const FindAllOrders = asyncErrorHandler(async (req, res, next) => {
  const Orders = await OrderModel.aggregate([{ $unwind: "$products" }]);
  res.status(201).send(Orders);
});

export const ChangeStatusOfOrder = asyncErrorHandler(async (req, res, next) => {
  const { id, OStatus } = req.body;
  const result = await OrderModel.updateOne(
    {
      products: { $elemMatch: { _id: id } },
    },
    {
      $set: { "products.$.status": OStatus },
    }
  );

  res.status(201).send("Update");
});

export const AddProdcut = asyncErrorHandler(async (req, res, next) => {
  const {
    title,
    price,
    description,
    category,
    image: base64,
    rating,
  } = req.body;
  let imageId = uuidv4().split("-")[0];
  let image = await uploadImage(base64, imageId);
  const result = new Products({
    title,
    price,
    description,
    category,
    image,
    rating,
  });
  const data = await result.save();
  res.status(201).send(data);
});

export const UpdateProduct = asyncErrorHandler(async (req, res, next) => {
  let { _id, ...obj } = req.body;
  const imgId = uuidv4().split("-")[0];
  if (_id && obj) {
    if (obj.image) {
      const img = await uploadImage(obj.image, imgId);
      obj.image = img;
    }
    const data = await Products.findOneAndUpdate(
      { _id },
      { ...obj },
      { new: true }
    );
    res.status(201).send(data);
  } else {
    createHttpError(404, "Value must be required");
  }
});

export const DeleteProduct = asyncErrorHandler(async (req, res, next) => {
  let { id } = req.query;
  if (id) {
    const data = await Products.deleteOne({ _id: id });
    res.status(201).send("Data Delete");
  } else {
    createHttpError(404, "Data can't delete");
  }
});
