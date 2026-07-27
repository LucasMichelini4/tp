import { Column, Entity, PrimaryGeneratedColumn } from "typeorm"
@Entity('turn')
export class Turn {
  @PrimaryGeneratedColumn()
  id!: number;
  @Column({ type: Date, nullable: false, })
  date!: Date;
  @Column({ type: Boolean, nullable: false, default: false })
  status!: boolean;
  @Column({ type: Boolean, nullable: false, default: false })
  deleted?: boolean
}