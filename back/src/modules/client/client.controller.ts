import { Body, Controller, Delete, Get, Param, Patch, Post, Put } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { ClientService } from './client.service';
import { ClientDto } from './dto/client-dto.js';

@Controller('api/v1/client')
@ApiTags('Client')
export class ClientController {
  constructor(private clientService: ClientService) { }

  @Post()
  createClient(@Body() client: ClientDto) {
    return this.clientService.createClient(client);
  }

  @Get(':dni')
  getClientByDni(@Param('dni') dni: number) {
    return this.clientService.findClient(dni);
  }

  @Get()
  getClients() {
    return this.clientService.findAll();
  }

  @Get('filter/deleted')
  getClientsDeleted() {
    return this.clientService.findAllDeleted();
  }
  @Put()
  updateClient(@Body() client: ClientDto) {
    return this.clientService.updateClient(client);
  }

  @Delete('/:dni')
  deleteClient(@Param('dni') dni: number) {
    return this.clientService.deleteClient(dni);
  }

  @Patch('/restore/:dni')
  restoreClient(@Param('dni') dni: number) {
    return this.clientService.restoreClient(dni);
  }
}
