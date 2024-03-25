import { Router } from "express";
import { checkAuth } from "../middleware/checkAuth";
import cartItemController from "../controller/cartItem.controller";


const router = Router();

router.get("/", checkAuth, cartItemController.getCartItem);
router.put("/:id", checkAuth, cartItemController.addCartItem);
router.delete("/stack/:id", checkAuth, cartItemController.deleteStackCartItem);
router.delete("/:id", checkAuth, cartItemController.removeCartItem);

export default router;