import { Barber } from "src/modules/barber/entity/barber.entity";
import { Client } from "src/modules/client/entity/client.entity";
import { NameType } from "src/modules/name-type/entity/name-type.entity";
import { Salon } from "src/modules/salon/entity/salon.entity";
import { Column, Entity, JoinColumn, ManyToOne, OneToOne, PrimaryGeneratedColumn } from "typeorm"
@Entity('turn')
export class Turn {
  @PrimaryGeneratedColumn()
  id!: number;
  @Column({ type: Date, nullable: false})
  date!: Date;
  @Column({ type: Boolean, nullable: false, default: false })
  status!: boolean;
  @Column({ type: Boolean, nullable: false, default: false })
  deleted?: boolean;
  @ManyToOne(() => Client, (client) => client.turns, { nullable: false })
  @JoinColumn({ name: 'client_dni', referencedColumnName: 'dni' })
  client!: Client;
  @ManyToOne(() => Barber, (barber) => barber.turns, { nullable: false })
  @JoinColumn({ name: 'barber_dni', referencedColumnName: 'dni' })
  barber!: Barber;
  @ManyToOne(() => NameType, (nameType) => nameType.turns, { nullable: false })
  @JoinColumn({ name: 'nameType_id', referencedColumnName: 'id' })
  nameType!: NameType;
  @OneToOne(() => Salon, (salon) => salon.turn, { nullable: false })
  @JoinColumn({ name: 'salon_cuit', referencedColumnName: 'cuit' })
  salon!: Salon;
}