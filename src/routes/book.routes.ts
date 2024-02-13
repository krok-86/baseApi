import { Router } from "express";
import BookController from "../controller/book.controller";

const router = Router();

//get book

router.get("/", BookController.getBooks);
router.get("/:id", BookController.getOneBook);

export default router;