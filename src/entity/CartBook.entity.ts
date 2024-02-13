import { Entity, Column, PrimaryGeneratedColumn, OneToOne, JoinColumn, ManyToOne } from "typeorm"
import { Book } from "./Book.entity"
import { Cart } from "./Cart.entity"

@Entity()
export class CartBook {
    @PrimaryGeneratedColumn()
    id: number

    @Column()
    cartId: number

    @Column()
    bookId: number

    @OneToOne(() => Book)
    @JoinColumn()
    book: Book

    @ManyToOne(() => Cart, (cart) => cart.cartBooks)//photo
    cart: Cart
}