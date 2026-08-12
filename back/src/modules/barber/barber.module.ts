import { Module } from '@nestjs/common';
import { Barber } from './entity/barber.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BarberController } from './barber.controller';
import { BarberService } from './barber.service';

@Module({
    imports: [TypeOrmModule.forFeature([Barber])],
    controllers:[BarberController],
    providers: [BarberService]
})
export class BarberModule {}
