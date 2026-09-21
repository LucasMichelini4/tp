import { Turn } from "src/modules/turn/entity/turn.entity";
import { Column, Entity, OneToOne, PrimaryColumn } from "typeorm";

@Entity('salon')
export class Salon {
  @PrimaryColumn()
  cuit!: string;

  @Column({ type: String, nullable: false, length: 10 })
  legalName!: string;

  @Column({ type: String, nullable: false, length: 30 })
  address!: string;

  @Column({ type: String, nullable: false })
  phone!: string;

  @Column({ type: Boolean, nullable: false })
  deleted?: boolean;

  @OneToOne(() => Turn, (turn) => turn.salon)
  turn!: Turn[];
}