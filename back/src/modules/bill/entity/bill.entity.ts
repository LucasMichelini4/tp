import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity('bill')
export class Bill{
    @PrimaryGeneratedColumn()
    id!: number;
    @Column({ type: Date, nullable: false, })
    date!: Date;
    @Column({ type: Number, nullable: false})
    total!: number;
    @Column({ type: Boolean, nullable: false, default: false})
    deleted?: boolean;
}