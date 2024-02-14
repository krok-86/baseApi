import { Router } from "express";
import BookController from "../controller/book.controller";
import { checkAuth } from "../middleware/checkAuth";

const router = Router();

//get book

router.get("/", BookController.getBooks);
router.get("/:id", BookController.getOneBook);
router.put("/:id",checkAuth, BookController.updateBook);

export default router;