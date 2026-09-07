import { Turn } from "src/modules/turn/entity/turn.entity.js";
import { Column, Entity, OneToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity('bill')
export class Bill {
    @PrimaryGeneratedColumn()
    id!: number;
    @Column({ type: Date, nullable: false, })
    date!: Date;
    @Column({ type: Number, nullable: false })
    total!: number;
    @Column({ type: Boolean, nullable: false, default: false })
    deleted?: boolean;

    @OneToOne(() => Turn, (turn) => turn.bill)
    turn!: Turn[];
}