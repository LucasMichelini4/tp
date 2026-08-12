import { Column, Entity, PrimaryColumn } from "typeorm";

@Entity('service')
export class Service {
    @PrimaryColumn()
    id!: number;
    @Column({ type: String, nullable: false, length: 10 })
    name!: string;
    @Column({ type: Boolean, nullable: false, default: false })
    deleted?: boolean;
}