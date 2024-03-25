import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  CreateDateColumn,
} from "typeorm";
import { Book } from "./Book.entity";
import { User } from "./User.entity";

@Entity()
export class CartItem {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  countBook: number;

  @CreateDateColumn({ type: "timestamptz", nullable: true })
  created_at: Date;

  @ManyToOne(() => User, (user) => user.cartItems)
  user: User;

  @ManyToOne(() => Book, (book) => book.cartItems)
  book: Book;
}
