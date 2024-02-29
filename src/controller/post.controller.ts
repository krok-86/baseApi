import { Request, Response, NextFunction } from "express";
import { CustomError } from "../error";
import AppDataSource from "../data-source";
import { User } from "../entity/User.entity";
import { Book } from "./../entity/Book.entity";
import { Post } from "../entity/Post.entity";
import { Repository } from "typeorm";

const postRepository = AppDataSource.getRepository(Post);
const userRepository = AppDataSource.getRepository(User);
const bookRepository = AppDataSource.getRepository(Book);

class PostController {
  static createPost = async (
    req: Request <any, any, { userId: number, bookId: number, postText: string }>,
    res: Response,
    next: NextFunction
  ): Promise<void> => {
    console.log(req.body);
    try {
      const { userId, bookId, postText } = req.body;
      if (!postText || !postText.length) {
        throw new CustomError("Post has wrong postText", 400);
      }
      if (!userId || !isFinite(userId)) {
        throw new CustomError("Post has wrong Author", 400);
      }
      const user = await userRepository.findOne({ where: { id: +userId } });
      if (!user) {
        throw new CustomError("UserId was not created", 404);
      }
      const post = await postRepository.save({
        post: postText,
        userId: user.id,
      });
      if (!post) {
        throw new CustomError("Post was not created", 404);
      }
      const book = await bookRepository.findOne({ where: { id: +bookId } });
      if (!book) {
        throw new CustomError("BookId was not created", 404);
      }

      //   const book = await bookRepository.findOne(req.body.bookId);
      //   if (!book) {
      //    throw new CustomError("Topic is not found", 404);
      //  }
      //   await post.addBook(book);
      await postRepository.save(post);
      res.json(post);
    } catch (err) {
      next(err);
    }
  };
}
export default PostController;
