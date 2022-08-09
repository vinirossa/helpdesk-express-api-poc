/* eslint-disable import/no-cycle */
import {
    Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, ManyToOne,
} from "typeorm";
import { BaseModel } from "../base.model";
import { User } from "../user/user.model";

@Entity("users_password_history")
export class UserPasswordHistory implements BaseModel {
    constructor(password: string, user: User) {
        this.password = password;
        this.user = user;
    }

    @PrimaryGeneratedColumn("uuid")
    public id: string;

    @CreateDateColumn({ type: "timestamptz" })
    public createdAt: Date;

    @Column({ nullable: true })
    public createdBy: string;

    @UpdateDateColumn({ type: "timestamptz", nullable: true })
    public updatedAt: Date;

    @Column({ nullable: true })
    public updatedBy: string;

    @Column()
    public password: string;

    @ManyToOne(() => User, (user) => user.userPasswordHistory)
    public user: User;
}
