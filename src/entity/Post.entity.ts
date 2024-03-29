import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToOne,
  CreateDateColumn,
} from "typeorm";
import { User } from "./User.entity";
import { Book } from "./Book.entity";

@Entity()
export class Post {

  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: "text", nullable: true })
  postText: string;

  @CreateDateColumn({ type: "timestamptz", nullable: true })
  created_at: Date; // Creation date

  @Column({ nullable: true })
  userId: number;

  @Column({ nullable: true })
  bookId: number;

  @ManyToOne(() => User, (user) => user.posts)
  user: User;

  @ManyToOne(() => Book, (book) => book.posts)
  book: Book;
};
