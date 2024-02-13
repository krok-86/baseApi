
import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from "typeorm"
import { Book } from "./Book.entity"

@Entity()
export class Genre {
    @PrimaryGeneratedColumn()
    id: number

    @Column({length: 100,})
    title: string

    @ManyToOne(() => Book, (book) => book.genre)
    books: Genre
}