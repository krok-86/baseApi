
import { Entity, Column, PrimaryGeneratedColumn, ManyToMany, JoinTable, ManyToOne } from "typeorm"
import { User } from "./User.entity"
import { Book } from "./Book.entity"


@Entity()
export class Rating {
    @PrimaryGeneratedColumn()
    id: string

    @ManyToOne(() => User, (user) => user.ratings)
    user: User

    @ManyToOne(() => Book, (book) => book.rating)
    book: Book
}