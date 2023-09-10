import { Router } from "express";
import {
  AddToCart,
  DeletesCarts,
  FindUsersProduct,
  GetCategory,
  GetItem,
  GetProduct,
  RemoveCart,
  UpdateCartQuantity,
} from "../controller/product.js";
const router = Router();

// GET
router.get("/getitem/:_id", GetItem);
router.get("/getproduct", GetProduct);
router.get("/getcategory", GetCategory);
router.get("/finduserproduct", FindUsersProduct);
// POST

router.post("/addcart", AddToCart);

//PUT
router.put("/updatecart", UpdateCartQuantity);

// Delete
router.delete("/removecart", RemoveCart);
router.delete("/deletecarts", DeletesCarts);

export default router;
