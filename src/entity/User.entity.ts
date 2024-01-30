import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn } from "typeorm"

@Entity()
export class User {
    @PrimaryGeneratedColumn()
    id: string;

    @Column({
        type: "varchar",
        length: "230",
    })
    fullName: string;

    @Column({
        // unique: true,
        type: "text"
    })
    email: string;

    @CreateDateColumn({type:'date', nullable: true})
    dob: Date;

    @Column()
    password: string;

    @Column({ nullable: true })
    avatarImg: string;
}

