import { Request, Response, NextFunction } from "express";
import { CustomError } from "../error";
import AppDataSource from "../data-source";
import { User } from "../entity/User.entity";
import { Book } from "./../entity/Book.entity";
import { Post } from "../entity/Post.entity";

const postRepository = AppDataSource.getRepository(Post);
const userRepository = AppDataSource.getRepository(User);
const bookRepository = AppDataSource.getRepository(Book);

class PostController {
  static createPost = async (
    req: Request <any, any, { userId: number, bookId: number, postText: string }>,
    res: Response,
    next: NextFunction
  ): Promise<void> => {
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
      const book = await bookRepository.findOne({ where: { id: +bookId } });
      if (!book) {
        throw new CustomError("BookId was not created", 404);
      }
      const post = await postRepository.save({
        bookId: book.id,
        postText: postText,
        userId: user.id
      });
      if (!post) {
        throw new CustomError("Post was not created", 404);
      }
      await postRepository.save(post);
      const postValue = { ... post, author: user} 
      res.json(postValue);
    } catch (err) {
      next(err);
    }
  };
  static getPosts = async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> => {
    try {
      const posts: Post[] = await postRepository.find({
        where: { bookId: +req.params.bookId },
        relations:{book:true, user:true},
      });
      if (!posts) {
        throw new CustomError("Posts are not found", 404);
      }
      res.json(posts);
    } catch (err) {
      next(err);
    }
  };
  static getOnePost = async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> => {
    console.log(">>>>>>",req.body);
    try {
      const id:number = +req.params.id;
      if (!id) {
        throw new CustomError("Id of posts is not correct", 400);
      }
      const post: Post[] = await postRepository.find({
        where: { id },
        relations:{book:true, user:true}
      });
      if (!post) {
        throw new CustomError("Post are not found", 404);
      }
      res.json(post);
    } catch (err) {
      next(err);
    }
  };
}
export default PostController;
