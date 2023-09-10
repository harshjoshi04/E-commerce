import { Router } from "express";
import {
  AddProdcut,
  AdminDetails,
  ChangeStatusOfOrder,
  DeleteProduct,
  FindAllOrders,
  UpdateProduct,
  changeRole,
  findAllUsers,
} from "../../controller/adminController/admin.js";
const router = Router();

// GET
router.get("/getusers", findAllUsers);
router.get("/getdetails", AdminDetails);
router.get("/getorders", FindAllOrders);

// POST
router.post("/add-product", AddProdcut);

// PUT
router.put("/changerole", changeRole);
router.put("/changestatus", ChangeStatusOfOrder);
router.put("/update-product", UpdateProduct);

// Delete
router.delete("/dalete-product", DeleteProduct);

export default router;
