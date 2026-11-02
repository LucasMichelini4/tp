import { Body, Controller, Delete, Get, Param, Patch, Post, Put } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { ServiceService } from './service.service';
import { ServiceDto } from './dto/service-dto';
import { get } from 'http';
import { NameType } from '../name-type/entity/name-type.entity';

@Controller('api/v1/service')
@ApiTags('Service')
export class ServiceController {
    constructor(private serviceService: ServiceService) { }

    @Post()
    createService(@Body() service: ServiceDto) {
        return this.serviceService.createService(service);
    }

    @Get(':id')
    getServiceById(@Param('id') id: number) {
        return this.serviceService.findService(id);
    }

    @Get(':id/:nameType')
    getServiceIdnameType(
        @Param('id') id: number,
        @Param('nameType') nameType: string) {
        return this.serviceService.findServiceIdNameType(id, nameType)
    }

    @Get()
    getService() {
        return this.serviceService.findAll();
    }

    @Get('filter/deleted')
    getServiceDeleted() {
        return this.serviceService.findAllDeleted();
    }

    @Put()
    updateService(@Body() service: ServiceDto) {
        return this.serviceService.updateService(service);
    }

    @Delete('/:id/:nameType')
    deleteService(
        @Param('id') id: number,
        @Param('nameType') nameType: string) {
        return this.serviceService.deleteService(id, nameType);
    }

    @Patch('/restore/:id/:nameType')
    restoreService(
        @Param('id') id: number,
        @Param('nameType') nameType: string) {
        return this.serviceService.restoreService(id, nameType);
    }
}
