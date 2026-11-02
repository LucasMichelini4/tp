import { Body, Get, Controller, Param, Post, Put, Delete, Patch } from '@nestjs/common';
import { TurnService } from './turn.service.js';
import { TurnDto } from './dto/turn-dto.js';

@Controller('api/v1/turn')
export class TurnController {
  constructor(private turnService: TurnService) { }

  @Post()
  createTurn(@Body() turn: TurnDto) {
    return this.turnService.createTurn(turn);
  }

  @Get('/:id')
  getTurnByID(@Param('id') id: number) {
    return this.turnService.findTurn(id);
  }

  @Get(':id/:dniC')
  getBillIdDni(
    @Param('id') id: number,
    @Param('dniC') dniC: string) {
    return this.turnService.findTurnIdDni(id, dniC)
  }


  @Get()
  getTurn() {
    return this.turnService.findAll();
  }

  @Get('filter/deleted')
  getTurnsDeleted() {
    return this.turnService.findAllDeleted();
  }

  @Put()
  updateTurn(@Body() turn: TurnDto) {
    return this.turnService.updateTurn(turn);
  }

  @Delete('/:id/:dniC')
  deleteTurn(
    @Param('id') id: number,
    @Param('dniC') dniC: string) {
    return this.turnService.deleteTurn(id, dniC);
  }

  @Patch('/restore/:id/:dniC')
  restoreTurn(
    @Param('id') id: number,
    @Param('dniC') dniC: string) {
    return this.turnService.restoreTurn(id, dniC);
  }
}
