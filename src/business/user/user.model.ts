/* eslint-disable import/no-cycle */
import { AutoMap } from "@automapper/classes";
import {
    Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, OneToMany,
} from "typeorm";
import { UserProfile } from "../../utils/enums/user-profile.enum";
import { BaseActiveModel } from "../base.model";
import { UserPasswordHistory } from "../user-password-history/user-password-history.model";

@Entity("users")
export class User implements BaseActiveModel {
    @PrimaryGeneratedColumn("uuid")
    @AutoMap()
    public id: string;

    @Column({ default: true })
    @AutoMap()
    public active: boolean;

    @CreateDateColumn({ type: "timestamptz" })
    @AutoMap()
    public createdAt: Date;

    @Column({ nullable: true })
    @AutoMap()
    public createdBy: string;

    @UpdateDateColumn({ type: "timestamptz", nullable: true })
    public updatedAt: Date;

    @Column({ nullable: true })
    public updatedBy: string;

    @Column()
    @AutoMap()
    public name: string;

    @Column({ unique: true, length: 320 })
    @AutoMap()
    public email: string;

    @Column()
    @AutoMap()
    public password: string;

    @Column({ type: "smallint" })
    @AutoMap()
    public profile: UserProfile;

    @Column({ default: false })
    public emailConfirmed: boolean;

    @Column({ type: String, nullable: true })
    public confirmationToken!: string | null;

    @Column({ type: String, nullable: true })
    public resetToken!: string | null;

    @Column({ type: "timestamptz", nullable: true })
    public lastPasswordReset: Date;

    @OneToMany(
        () => UserPasswordHistory,
        (userPasswordHistory) => userPasswordHistory.user,
        { cascade: true, onDelete: "CASCADE", eager: true },
    )
    public userPasswordHistory: UserPasswordHistory[];
}
