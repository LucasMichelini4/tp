import { Turn } from "src/modules/turn/entity/turn.entity";
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity('nameType')
export class NameType {
  @PrimaryGeneratedColumn()
  id!: number;
  @Column({ type: String, nullable: false, length: 150 })
  description!: string;
  @Column({ type: Number, nullable: false })
  price!: number;
  @Column({ type: Number, nullable: false })
  duration!: number;
  @Column({ type: Boolean, nullable: false, default: false })
  deleted?: boolean;
  @OneToMany(() => Turn, (turn) => turn.nameType)
  turns!: Turn[];
}