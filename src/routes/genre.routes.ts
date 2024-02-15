import { Router } from "express";

import { checkAuth } from "../middleware/checkAuth";
import GenreController from "../controller/genre.controller";

const router = Router();

//get genre

router.get("/", GenreController.getGenres);
router.get("/:id", GenreController.getOneGenre);

export default router;