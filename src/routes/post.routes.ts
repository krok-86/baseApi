import { Router } from "express";
import PostController from "../controller/post.controller";
import { checkAuth } from "../middleware/checkAuth";

const router = Router();

//get Posts

router.post("/", PostController.createPost);//checkAuth
router.get("/book/:bookId", PostController.getPosts);
router.get("/:id", PostController.getOnePost);
// router.put("/:id", BookController.createPost);

export default router;