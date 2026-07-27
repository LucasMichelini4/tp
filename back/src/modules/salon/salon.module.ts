import { Module } from '@nestjs/common';
import { SalonService } from './salon.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Salon } from './entity/salon.entity.js';
import { SalonController } from './salon.controller.js';

@Module({
  imports: [TypeOrmModule.forFeature([Salon])],
  controllers: [SalonController],
  providers: [SalonService]
})
export class SalonModule { }
