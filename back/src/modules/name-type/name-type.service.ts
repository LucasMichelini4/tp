import { Injectable } from '@nestjs/common';
import { NameType } from './entity/name-type.entity.js';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class NameTypeService {
  constructor(
    @InjectRepository(NameType) private nameTypeRepository: Repository<NameType>
  ) { }

}
