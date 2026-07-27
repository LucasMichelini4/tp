import { ConflictException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, UpdateResult } from 'typeorm';
import { Turn } from './entity/turn.entity.js';
import { TurnDto } from './dto/turn-dto.js';

@Injectable()
export class TurnService {
  constructor(
    @InjectRepository(Turn) private turnRepository: Repository<Turn>,
  ) { }

  async createTurn(turn: TurnDto) {
    const turnExist = await this.findTurn(turn.id);

    if (turnExist) {
      throw new ConflictException('El turno con Id ' + turn.id + ' ya existe')
    } else {
      return await this.turnRepository.save(turn)
    }
  }

  async findTurn(id: number) {
    return await this.turnRepository.findOne({ where: { id } });
  }

  async findAll() {
    return await this.turnRepository.find({ where: { deleted: false } })
  }

  async findAllDeleted() {
    return await this.turnRepository.find({ where: { deleted: true } })
  }

  async updateTurn(turn: TurnDto) {
    return await this.turnRepository.save(turn);
  }

  async deleteTurn(id: number) {
    const turnExists = await this.findTurn(id);

    if (!turnExists) {
      throw new ConflictException('El turno con ID: ' + id + ' no existe')
    }
    if (turnExists.deleted) {
      throw new ConflictException('El turno ya fue eliminado')
    }

    const rows: UpdateResult = await this.turnRepository.update({ id }, { deleted: true })

    return rows.affected = 1
  }

  async restoreTurn(id: number) {
    const turnExists = await this.findTurn(id);
    if (!turnExists) {
      throw new ConflictException('El turno con ID: ' + id + ' no existe');
    }
    if (!turnExists.deleted) {
      throw new ConflictException('El turno no esta borrado');
    }
    const rows: UpdateResult = await this.turnRepository.update({ id }, { deleted: false })

    return rows.affected = 1
  }
}
