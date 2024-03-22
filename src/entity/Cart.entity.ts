import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, OneToOne, JoinColumn, OneToMany } from "typeorm"
import { User } from "./User.entity"
import { CartItem } from "./CartItem.entity"

@Entity()
export class Cart {
    @PrimaryGeneratedColumn()
    id: number

    @OneToOne(() => User)//photo
    @JoinColumn()
    user: User

    @OneToMany(() => CartItem, (cartItem) => cartItem.cart)
    cartItems: CartItem[]
  }