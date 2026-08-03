import { Module } from '@nestjs/common';
import { NameTypeController } from './name-type.controller';
import { NameTypeService } from './name-type.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { NameType } from './entity/name-type.entity.js';

@Module({
  imports: [TypeOrmModule.forFeature([NameType])],
  controllers: [NameTypeController],
  providers: [NameTypeService]
})
export class NameTypeModule { }
