import { Router } from "express";
import UserController from "../controller/user.controller";
import validation from "../middleware/validationMiddleware";
import { userSchemaReg, userSchemaAuth } from "../validation/userValidation";
import { checkAuth } from "../middleware/checkAuth";
import upload from "../middleware/upload";

const router = Router();

router.get("/favorite", checkAuth, UserController.getFavoriteBooks);
router.put("/favorite/:id", checkAuth, UserController.addBookToFavorite);
// router.delete("/cart/:id", checkAuth, UserController.removeBookFromCart);
// router.get("/cart", checkAuth, UserController.getCartBooks);
// router.put("/cart/:id", checkAuth, UserController.addBookToCart);
//create user
router.post("/registration", validation(userSchemaReg), UserController.registrationUser);
router.post("/authorization", validation(userSchemaAuth), UserController.authorizationUser);
router.get("/authorization/me", checkAuth, UserController.authorizationMeUser);
router.get("/", UserController.getUser);
router.get("/:id", UserController.getOneUser);
router.delete("/:id", UserController.deleteUser);
router.put("/:id", checkAuth, upload.single("image"), UserController.updateUser);

export default router;
