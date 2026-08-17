import { Turn } from 'src/modules/turn/entity/turn.entity';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
@Entity('client')
export class Client {
  @PrimaryGeneratedColumn()
  dni!: number;
  @Column({ type: String, nullable: false, length: 10 })
  name!: string;
  @Column({ type: String, nullable: false, length: 10 })
  surname!: string;
  @Column({ type: String, nullable: false, length: 30 })
  email!: string;
  @Column({ type: String, nullable: false, length: 10 })
  phone!: string;
  @Column({ type: Boolean, nullable: false, default: false })
  deleted?: boolean;
  @OneToMany(() => Turn, (turn) => turn.client)
  turns!: Turn[];
}
