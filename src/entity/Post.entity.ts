import { Entity, Column, PrimaryGeneratedColumn, ManyToMany, JoinTable, ManyToOne, CreateDateColumn } from "typeorm"
import { User } from "./User.entity"
import { Book } from "./Book.entity"


@Entity()
export class Post {//rating
    @PrimaryGeneratedColumn()
    id: number

    @Column()
    postText: string;

    @CreateDateColumn({ type: "date", nullable: true })
    created_at: Date; // Creation date

    @Column()
    userId: number

    @Column()
    bookId: number

    @ManyToOne(() => User, (user) => user.posts)
    user: User

    @ManyToOne(() => Book, (book) => book.posts)
    books: Book
}

