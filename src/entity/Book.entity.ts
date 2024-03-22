import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  OneToMany,
  ManyToOne,
  CreateDateColumn,
} from "typeorm";
import { Rating } from "./Rating.entyty";
import { Author } from "./Author.entity";
import { Genre } from "./Genre.entity";
import { Post } from "./Post.entity";
import { CartItem } from "./CartItem.entity";
@Entity()
export class Book {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 100 })
  title: string;

  @Column("text")
  description: string;

  @Column()
  picture: string;

  @Column("smallint")
  rating: number;

  @Column("int")
  price: number;

  @CreateDateColumn({ type: "date", nullable: true })
    dateOfIssue: Date;

  @Column({ nullable: true })
  authorId: number;

  @Column({ nullable: true })
  genreId: number;

  @OneToMany(() => Rating, (rating) => rating.book)
  ratings: Rating[];

  @OneToMany(() => CartItem, (cartItem) => cartItem.book)
  cartItems: CartItem[];

  @OneToMany(() => Post, (post) => post.book)
  posts: Post[];

  @ManyToOne(() => Genre, (genre) => genre.books)
  genre: Genre[];

  @ManyToOne(() => Author, (author) => author.books)
  author: Author;

//   @ManyToMany(() => User)
//   @JoinColumn({
//     name: 'BookId',
// })
//   cart: User[]
}
//   @ManyToMany(() => User, (user) => user.book)
//   book: User[];

