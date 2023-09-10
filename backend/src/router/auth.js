import { Router } from "express";
import {
  AdminLogin,
  ChangePassword,
  Login,
  getUser,
  signup,
} from "../controller/auth.js";
import { authenticate } from "../middleware/authenticate.js";

const router = Router();

// GET

router.get("/getuser", authenticate, getUser);

//POST
router.post("/login", Login);
router.post("/signup", signup);
router.post("/adminlogin", AdminLogin);

// PUT
router.put("/change-password", authenticate, ChangePassword);

export default router;
