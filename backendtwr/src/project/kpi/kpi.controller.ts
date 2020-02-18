import { Controller, Get, Query, Post, Body, Delete, Param, Put, UseGuards } from '@nestjs/common';
import { KpiService } from './kpi.service';
import { KpiEntity } from './kpi.entity';
import { AuthGuard } from '../../shared/auth.guard';
import { KpiDTO } from './kpi.dto';

@Controller('api/kpi')
export class KpiController {
    constructor(private kservice: KpiService) { }

    @Get()
    @UseGuards(new AuthGuard())
    KpisByProject(@Query('p') projid: string) {
        return this.kservice.getbyproj(projid);
    }

    @Post()
    @UseGuards(new AuthGuard())
    newKpi(@Body() data: KpiDTO[]) {
        return this.kservice.addone(data);
    }

    @Get()
    @UseGuards(new AuthGuard())
    getKpi() {
        return 'Hi there';
    }

    @Get(':id')
    @UseGuards(new AuthGuard())
    getOneKpi(@Param('id') id: string) {
        return this.kservice.getone(id);
    }

    @Put(':id')
    @UseGuards(new AuthGuard())
    updatekpi(@Param('id') id: string, @Body() data: KpiEntity) {
        return this.kservice.update(id, data);
    }

    @Delete(':id')
    @UseGuards(new AuthGuard())
    deleteOne(@Param('id') id: string) {
        return this.kservice.delete(id);
    }

}
