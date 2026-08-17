import { Turn } from "src/modules/turn/entity/turn.entity";
import { Column, Entity, OneToMany, PrimaryColumn } from "typeorm";

@Entity('barber')
export class Barber {

    @PrimaryColumn()
    dni!: number;
    @Column({ type: String, nullable: false, length: 10 })
    name!: string;
    @Column({ type: Boolean, nullable: false, default: false })
    deleted?: boolean;
    @OneToMany(() => Turn, (turn) => turn.client)
    turns!: Turn[];
}