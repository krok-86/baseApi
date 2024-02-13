
import { Entity, Column, PrimaryGeneratedColumn, ManyToMany, JoinTable, ManyToOne } from "typeorm"
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

    @ManyToOne(() => User, (user) => user.ratings)//photo
    user: User

    @ManyToOne(() => Book, (book) => book.rating)
    books: Book
}