import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity('service')
export class Service {
    @PrimaryGeneratedColumn()
    id!: number;
    @Column({ type: String, nullable: false, length: 10 })
    name!: string;
    @Column({ type: Boolean, nullable: false, default: false })
    deleted?: boolean;

    //@OneToMany(() => NameType, (nameType) => nameType.service)
    //nameTypes!: NameType[];
}