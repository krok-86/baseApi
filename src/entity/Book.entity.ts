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

  @Column("smallint")
  price: number;

  @CreateDateColumn({ type: "date", nullable: true })
  dateOfIssue: Date;

  @Column({ nullable: true })
  authorId: number;

  @Column({ nullable: true })
  genreId: number;

  @OneToMany(() => Rating, (rating) => rating.books)
  ratings: Rating[];

  @OneToMany(() => Genre, (genre) => genre.books)
  genre: Genre[];

  @ManyToOne(() => Author, (author) => author.books)
  author: Book;
}
