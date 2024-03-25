
import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, OneToMany } from "typeorm"
import { Book } from "./Book.entity"

@Entity()
export class Genre {
    @PrimaryGeneratedColumn()
    id: number

    @Column({length: 100,})
    title: string

    @OneToMany(() => Book, (book) => book.genre)
    books: Genre
};
