import { ConflictException, Injectable } from '@nestjs/common';
import { Client } from './entity/client.entity.js';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, UpdateResult } from 'typeorm';
import { ClientDto } from './dto/client-dto.js';

@Injectable()
export class ClientService {
  constructor(
    @InjectRepository(Client) private clientRepository: Repository<Client>,
  ) { }

  async createClient(client: ClientDto) {
    const clientExists = await this.findClient(client.dni);
    if (clientExists) {
      throw new ConflictException(
        'El Cliente con el DNI: ' + client.dni + ' existe',
      );
    } else {
      return await this.clientRepository.save(client);
    }
  }

  async findClient(dni: number) {
    return await this.clientRepository.findOne({ where: { dni } });
  }

  async findAll() {
    return await this.clientRepository.find({ where: { deleted: false } });
  }

  async findAllDeleted() {
    return await this.clientRepository.find({ where: { deleted: true } });
  }

  async updateClient(client: ClientDto) {
    return await this.clientRepository.save(client);
  }

  async deleteClient(dni: number) {
    const clientExists = await this.findClient(dni);
    if (!clientExists) {
      throw new ConflictException('El cliente con dni: ' + dni + ' no existe');
    }
    if (clientExists.deleted) {
      throw new ConflictException('El cliente ya esta borrado');
    }
    const rows: UpdateResult = await this.clientRepository.update({ dni }, { deleted: true });
    return rows.affected == 1;
  }

  async restoreClient(dni: number) {
    const clientExists = await this.findClient(dni);
    if (!clientExists) {
      throw new ConflictException('El cliente con DNI: ' + dni + ' no existe');
    }
    if (!clientExists.deleted) {
      throw new ConflictException('El cliente no esta borrado');
    }
    const rows: UpdateResult = await this.clientRepository.update({ dni }, { deleted: false });
    return rows.affected == 1;
  }
}
