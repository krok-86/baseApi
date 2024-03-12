import { Entity, Column, PrimaryGeneratedColumn, OneToOne, JoinColumn, ManyToOne } from "typeorm"
import { Book } from "./Book.entity"
import { Cart } from "./Cart.entity"

@Entity()
export class CartBook {
    @PrimaryGeneratedColumn()
    id: number

    @OneToOne(() => Book)
    @JoinColumn()
    Book: Book

    @ManyToOne(() => Cart, (cart) => cart.cartBooks)
    cart: Cart
}