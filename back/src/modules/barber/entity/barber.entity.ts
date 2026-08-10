import { Column, PrimaryColumn } from "typeorm";

export class Barber {

    @PrimaryColumn()
    dni!: number;
    @Column({ type: String, nullable: false, length: 10 })
    name!: string;
    @Column({ type: Boolean, nullable: false, default: false })
    deleted?: boolean;

}