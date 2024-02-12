import { Entity, Column, PrimaryGeneratedColumn, OneToMany, ManyToOne } from "typeorm"
import { Rating } from "./Rating.entyty"

@Entity()
export class Book {
    @PrimaryGeneratedColumn()
    id: string

    @Column({length: 100,})
    title: string

    @Column("text")
    description: string

    @Column()
    picture: string

    @Column("smallint")
    rating: number

    @Column({ type: "date" })
    dateOfIssue: string

    @OneToMany(() => Rating, (rating) => rating.book)
    rate: Rating[]//?

    @ManyToOne(() => Book, (book) => book.author)
    book: Book
}