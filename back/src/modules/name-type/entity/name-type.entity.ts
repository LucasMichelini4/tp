import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

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
}