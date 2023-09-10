import { Router } from "express";
import {
  ConfirmOrder,
  FindOrders,
  GetInvoice,
  PaymentStore,
} from "../controller/payment.js";
import { authenticate } from "../middleware/authenticate.js";

const router = Router();

// GET
router.get("/findorders", authenticate, FindOrders);
router.get("/downloadinvoice/:id", GetInvoice);
// POST
router.post("/confirm-order", authenticate, ConfirmOrder);
router.post("/payment", PaymentStore);

export default router;
