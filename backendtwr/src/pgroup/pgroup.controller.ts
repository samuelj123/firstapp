import { Controller, Post, Body, Get, Delete, Param, Put, UseGuards, Query } from '@nestjs/common';
import { PgroupService } from './pgroup.service';
import { PgroupEntity } from './pgroup.entity';
import { AuthGuard } from '../shared/auth.guard';

@Controller('api/pgroup')
export class PgroupController {
    constructor(private pgservice: PgroupService) { }

    @Post()
    @UseGuards(new AuthGuard())
    newpg(@Body() data: PgroupEntity) {
        return this.pgservice.new(data);
    }

    @Get()
    @UseGuards(new AuthGuard())
    getall() {
        return this.pgservice.getall();
    }

    @Delete(':id')
    @UseGuards(new AuthGuard())
    delete(@Param('id') id: string) {
        return this.pgservice.delete(id);
    }

    @Get(':id')
    @UseGuards(new AuthGuard())
    getone(@Param('id') id: string) {
        return this.pgservice.getone(id);
    }

    @Put(':id')
    @UseGuards(new AuthGuard())
    putone(@Param('id') id: string, @Body() data: PgroupEntity) {
        return this.pgservice.update(id, data);
    }

    @Get('country/:country')
    @UseGuards(new AuthGuard())
    findbycountry(@Param('country') country: string) {
        return this.pgservice.countryfiltered(country);
    }

}
