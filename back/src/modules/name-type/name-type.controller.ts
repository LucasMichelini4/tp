import { Body, Controller, Delete, Get, Param, Patch, Post, Put } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { NameTypeService } from './name-type.service.js';
import { NameTypeDto } from './dto/name-type-dto.js';

@Controller('api/v1/name-type')
@ApiTags('NameType')
export class NameTypeController {
  constructor(private nameTypeService: NameTypeService) { }

  @Post()
  createNameType(@Body() nameType: NameTypeDto) {
    return this.nameTypeService.createNameType(nameType)
  }

  @Get(':id')
  getNameTypeById(@Param('id') id: number) {
    return this.nameTypeService.findNameType(id);
  }

  @Get(':id/:service')
  getNameTypeIdService(
    @Param('id') id : number,
    @Param('service') service : string) {
      return this.nameTypeService.findNameTypeIdService(id, service)
    }

  @Get()
  getNameTypes() {
    return this.nameTypeService.findAll();
  }

  @Get('filter/deleted')
  getNameTypeDeleted() {
    return this.nameTypeService.findAllDeleted();
  }

  @Put()
  updateNameType(@Body() nameType: NameTypeDto) {
    return this.nameTypeService.updateNameType(nameType);
  }

  @Delete('/:id/:service')
  deleteNameType(@Param('id') id: number, 
                 @Param('service') service: string ) {
    return this.nameTypeService.deleteNameType(id, service);
  }

  @Patch('/restore/:id/:service')
  restoreNameType(@Param('id') id: number,
                  @Param('service') service: string) {
    return this.nameTypeService.restoreNameType(id, service);
  }
}
