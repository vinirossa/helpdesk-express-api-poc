import { AutoMap } from "@automapper/classes";
import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";
import { UserProfile } from "../../utils/enums/user-profile.enum";
import { BaseModel } from "../base.model";

@Entity()
export class User implements BaseModel {
    @PrimaryGeneratedColumn()
    @AutoMap()
    public id: string;

    @Column()
    @AutoMap()
    public active: boolean;

    @Column()
    public createdAt: Date;

    @Column()
    public createdBy: Date;

    @Column()
    public updatedAt: Date;

    @Column()
    public updatedBy: string;

    @Column()
    @AutoMap()
    public name: string;

    @Column()
    @AutoMap()
    public email: string;

    @Column()
    @AutoMap()
    public password: string;

    @Column()
    @AutoMap()
    public profile: UserProfile;
}
