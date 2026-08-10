import { ConflictException, Injectable } from '@nestjs/common';
import { NameType } from './entity/name-type.entity.js';
import { Repository, UpdateResult } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { NameTypeDto } from './dto/name-type-dto.js';

@Injectable()
export class NameTypeService {
  constructor(
    @InjectRepository(NameType) private nameTypeRepository: Repository<NameType>
  ) { }

  async createNameType(nameType: NameTypeDto) {
    const nameTypeExists = await this.findNameType(nameType.id);
    if (nameTypeExists) {
      throw new ConflictException('El nameType con id: ' + nameType.id + ' existe')
    } else {
      return await this.nameTypeRepository.save(nameType)
    }
  }

  async findNameType(id: number) {
    return await this.nameTypeRepository.findOne({ where: { id } });
  }

  async findAll() {
    return await this.nameTypeRepository.find({ where: { deleted: false } });
  }

  async findAllDeleted() {
    return await this.nameTypeRepository.find({ where: { deleted: true } });
  }

  async updateNameType(nameType: NameTypeDto) {
    return await this.nameTypeRepository.save(nameType);
  }

  async deleteNameType(id: number) {
    const nameTypeExists = await this.findNameType(id);
    if (!nameTypeExists) {
      throw new ConflictException('El nameType con id: ' + id + ' no existe')
    }
    if (nameTypeExists.deleted) {
      throw new ConflictException('El nameType ya esta borrado')
    }
    const rows: UpdateResult = await this.nameTypeRepository.update({ id }, { deleted: true });
    return rows.affected == 1;
  }

  async restoreNameType(id: number) {
    const nameTypeExists = await this.findNameType(id);
    if (!nameTypeExists) {
      throw new ConflictException('El nameType con id: ' + id + ' no existe')
    }
    if (!nameTypeExists.deleted) {
      throw new ConflictException('El nameType no esta borrado')
    }
    const rows: UpdateResult = await this.nameTypeRepository.update({ id }, { deleted: false });
    return rows.affected == 1;
  }
}
