import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity('salon')
export class Salon {
  @PrimaryGeneratedColumn()
  cuit!: number;

  @Column({ type: String, nullable: false, length: 10 })
  legalName!: string;

  @Column({ type: String, nullable: false, length: 30 })
  address!: string;

  @Column({ type: Number, nullable: false })
  phone!: number;

  @Column({ type: Boolean, nullable: false })
  deleted?: boolean;
}