import { Body, Controller, Delete, Get, Param, Patch, Post, Put } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { ServiceService } from './service.service';
import { ServiceDto } from './dto/service-dto';

@Controller('api/v1/service')
@ApiTags('Service')
export class ServiceController {
    constructor(private serviceService: ServiceService) {}

    @Post()
    createService(@Body() service: ServiceDto) {
        return this.serviceService.createService(service);
    }

    @Get(':id')
    getServiceById(@Param('id') id: number) {
        return this.serviceService.findService(id);
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

    @Delete('/:id')
    deleteService(@Param('id') id: number) {
        return this.serviceService.deleteService(id);
    }

    @Patch('/restore/:id')
    restoreService(@Param('id') id: number) {
        return this.serviceService.restoreService(id);
    }
}
