import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Turn } from './entity/turn.entity.js';
import { TurnController } from './turn.controller.js';
import { TurnService } from './turn.service.js';

@Module({
  imports: [TypeOrmModule.forFeature([Turn])],
  controllers: [TurnController],
  providers: [TurnService]
})
export class TurnModule { }
