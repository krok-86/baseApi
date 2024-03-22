import { Router } from "express";
import { checkAuth } from "../middleware/checkAuth";
import cartController from "../controller/cart.controller";

const router = Router();

router.get("/", checkAuth, cartController.getCart);
router.put("/", checkAuth, cartController.addCart);

export default router;