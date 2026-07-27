import { Body, Controller, Delete, Get, Param, Patch, Post, Put } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { SalonService } from './salon.service.js';
import { SalonDto } from './dto/salon-dto.js';

@Controller('api/v1/salon')
@ApiTags('Salon')
export class SalonController {
  constructor(private salonService: SalonService) { }

  @Post()
  createSalon(@Body() salon: SalonDto) {
    return this.salonService.createSalon(salon);
  }

  @Get(':cuit')
  getSalonByCuit(@Param('cuit') cuit: number) {
    return this.salonService.findSalon(cuit);
  }

  @Get()
  getSalon() {
    return this.salonService.findAll();
  }

  @Get('filter/deleted')
  getSalonDeleted() {
    return this.salonService.findAllDeleted();
  }

  @Put()
  updateSalon(@Body() salon: SalonDto) {
    return this.salonService.updateSalon(salon);
  }

  @Delete('/:cuit')
  deleteSalon(@Param('cuit') cuit: number) {
    return this.salonService.deleteSalon(cuit);
  }

  @Patch('/restore/:cuit')
  restoreSalon(@Param('cuit') cuit: number) {
    return this.salonService.restoreSalon(cuit);
  }
}
