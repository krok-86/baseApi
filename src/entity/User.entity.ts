import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  OneToMany,
  JoinTable,
  ManyToMany,
} from "typeorm";
import { Rating } from "./Rating.entyty";
import { Post } from "./Post.entity";
import { Book } from "./Book.entity";
import { CartItem } from "./CartItem.entity";

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    nullable: true,
    type: "varchar",
    length: "230",
  })
  fullName: string;

  @Column({
    unique: true,
    type: "text",
    nullable: false,
  })
  email: string;

  @CreateDateColumn({ type: "date", nullable: true })
  dob: Date;

  @Column({ select: false })
  password: string;

  @Column({ nullable: true })
  avatarImg: string;

  @ManyToMany(() => Book)
  @JoinTable()
  favorite: Book[];

  @OneToMany(() => Rating, (rating) => rating.user)
  rating: Rating[];

  @OneToMany(() => Post, (post) => post.user)
  posts: Post[];

  @OneToMany(() => CartItem, (cartItem) => cartItem.user)
  cartItems: CartItem[];
};
