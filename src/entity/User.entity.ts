import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  OneToMany,
  JoinColumn,
  OneToOne,
} from "typeorm";
import { Rating } from "./Rating.entyty";
import { Cart } from "./Cart.entity";
import { Post } from "./Post.entity";

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
    nullable: false
  })
  email: string;

  @CreateDateColumn({ type: "date", nullable: true })
  dob: Date;

  @Column()
  password: string;

  @Column({ nullable: true })
  avatarImg: string;

  @OneToOne(() => Cart)
    @JoinColumn()
    cart: Cart;

  @OneToMany(() => Rating, (rating) => rating.user)
    rating: Rating[];

  @OneToMany(() => Post, (post) => post.user)
    posts: Post[];
}