
import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from "typeorm"
import { User } from "./User.entity"
import { Book } from "./Book.entity"


@Entity()
export class Rating {
    @PrimaryGeneratedColumn()
    id: number

    @Column()
    userId: number

    @Column()
    bookId: number

    @Column()
    ratingStar: number

    @ManyToOne(() => User, (user) => user.rating)//photo
    user: User

    @ManyToOne(() => Book, (book) => book.rating)
    book: Book
  }