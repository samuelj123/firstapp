import { Controller, Get, Post, Body, Delete, Param, Put, Query, UseGuards } from '@nestjs/common';
import { ProjectService } from './project.service';
import { ProjectEntity } from './project.entity';
import { ProjectDTO } from './project.dto';
import { Country } from '../user/user.entity';
import { AuthGuard } from '../shared/auth.guard';

@Controller('api/project')
export class ProjectController {
    constructor(private projservice: ProjectService) { }
    @Get()
    @UseGuards(new AuthGuard())
    AllProjects() {
        return this.projservice.getall();
    }

    @Get('country')
    @UseGuards(new AuthGuard())
    findbycountry(@Query('name') country: string ) {
        return this.projservice.countryfiltered(country);
    }

    @Get(':id')
    @UseGuards(new AuthGuard())
    Project(@Param('id') id: string) {
        return this.projservice.getone(id)
    }

    @Post()
    @UseGuards(new AuthGuard())
    newproject(@Body() data: ProjectDTO) {
        return this.projservice.new(data);
    }

    @Delete(':id')
    @UseGuards(new AuthGuard())
    deleteproject(@Param('id') id: string) {
        return this.projservice.delete(id);
    }

    @Put(':id')
    updateproject(@Param('id') id: string, @Body() data: ProjectEntity) {
        return this.projservice.update(id, data);
    }
}
