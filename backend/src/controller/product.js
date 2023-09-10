import createError from "http-errors";
import ProductModel from "../model/UserProduct.js";
import asyncErrorHandler from "../utils/asyncErrorHandler.js";
import Products from "../model/Product.js";

export const AddToCart = asyncErrorHandler(async (req, res, next) => {
  const { productId } = req.body;
  const userId = req.userId;
  if (!productId) {
    next(createError(404, "values must be required"));
  } else {
    const product = new ProductModel({ userId, productId });
    const result = await product.save();
    res.status(201).send(result);
  }
});

export const RemoveCart = asyncErrorHandler(async (req, res, next) => {
  const { id } = req.query;
  if (!id) {
    next(createError(404, "Id is not found "));
  } else {
    const data = await ProductModel.deleteOne({ _id: id });
    res.status(201).send("Delete SuccessFully");
  }
});

export const GetCategory = asyncErrorHandler(async (req, res, next) => {
  const { category, limit } = req.query;
  let data = category
    ? await Products.find({ category: { $in: category } })
    : await Products.find({});
  let result = {};
  let size = data.length;
  result.data = data;
  if (limit) {
    result.totalPage = Math.ceil(size / limit);
  }
  res.status(201).send(result);
});

export const GetProduct = asyncErrorHandler(async (req, res, next) => {
  const { limit } = req.query;
  let data = await Products.find({});
  let result = {};
  let size = data.length;
  result.data = data;
  result.totalPage = Math.ceil(size / limit);
  res.status(201).send(result);
});

export const GetItem = asyncErrorHandler(async (req, res, next) => {
  const { _id } = req.params;
  if (_id) {
    const data = await Products.findOne({ _id });
    res.status(201).send(data);
  } else {
    next(createError(404, "Invalid Id"));
  }
});

export const UpdateCartQuantity = asyncErrorHandler(async (req, res, next) => {
  const { id, type } = req.body;
  if (type == "inc") {
    const data = await ProductModel.findOneAndUpdate(
      { _id: id },
      { $inc: { quantity: 1 } }
    );
  } else {
    const data = await ProductModel.findOneAndUpdate(
      { _id: id },
      { $inc: { quantity: -1 } }
    );
  }
  res.send("Done");
});

export const FindUsersProduct = asyncErrorHandler(async (req, res, next) => {
  const id = req.userId;
  if (id) {
    const data = await ProductModel.aggregate([
      {
        $match: {
          userId: id,
        },
      },
      {
        $lookup: {
          from: "products",
          localField: "productId",
          foreignField: "_id",
          as: "Item",
        },
      },
      {
        $unwind: "$Item",
      },
    ]);
    let TotalPrice = 0;
    let TotalQuanTity = 0;
    data.map((val) => {
      let { Item } = val;
      TotalPrice += Number(val.quantity) * Number(Item.price);
      TotalQuanTity += Number(val.quantity);
    });
    res.status(201).json({ data, TotalPrice, TotalQuanTity });
  } else {
    next(createError(404, "User Not Found"));
  }
});

export const DeletesCarts = asyncErrorHandler(async (req, res, next) => {
  const { id } = req.query;
  if (id) {
    const result = await ProductModel.deleteMany({ _id: { $in: id } });
    res.status(201).send("Success");
  } else {
    next(createError(404, "Carts Can't be Delete"));
  }
});
