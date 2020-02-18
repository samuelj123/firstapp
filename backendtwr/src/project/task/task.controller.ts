import { Controller, Body, Put, Param, Get, Delete, Post, UseGuards, Query } from '@nestjs/common';
import { TaskService } from './task.service';
import { TaskEntity } from './task.entity';
import { AuthGuard } from '../../shared/auth.guard';

@Controller('api/task')
export class TaskController {
    constructor(private taskservice: TaskService) { }
    
    @Get()
    @UseGuards(new AuthGuard())
    AllTasks() {
        return this.taskservice.getall();
    }

    @Get(':id')
    @UseGuards(new AuthGuard())
    allTasks(@Param('id') projid: string) {
        return this.taskservice.getallbyproject(projid);
    }

    @Post(':id')
    @UseGuards(new AuthGuard())
    newTask(@Body() data: TaskEntity, @Param('id') projid: string) {
        return this.taskservice.newtask(data, projid);
    }

    @Put(':taskid')
    @UseGuards(new AuthGuard())
    updateTask(@Body() data: Partial<TaskEntity>, @Param('taskid') taskid: string) {
        return this.taskservice.updatetask(data, taskid);
    }


    @Delete(':id')
    @UseGuards(new AuthGuard())
    deleteTask(@Param('id') id: string) {
        return this.taskservice.deltask(id);
    }

		@Get('/user/:id')
    @UseGuards(new AuthGuard())
    TaskbyUser(@Param('id') userid: string) {
        return this.taskservice.getbyuser(userid);
    }
}
