import { Injectable } from '@nestjs/common';
import { TaskEntity } from './task.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { KpiEntity } from '../kpi/kpi.entity';
import { UserEntity } from 'user/user.entity';

@Injectable()
export class TaskService {

    constructor(
        @InjectRepository(TaskEntity) private trepository: Repository<TaskEntity>,
        @InjectRepository(KpiEntity) private kpirepository: Repository<KpiEntity>,
        @InjectRepository(UserEntity) private userepository: Repository<UserEntity>
    ) { }

    async getall() {
        return await this.trepository
            .createQueryBuilder('tasks')
            .leftJoinAndSelect('tasks.kpi', 'kpi')
            .leftJoinAndSelect('tasks.taskhandler', 'taskhandler')
            .getMany();
    }

    async getallbykpi(kpiid: string) {
        const kpi = await this.kpirepository.findOne(kpiid);
        return await this.trepository.find({ where: { kpi } });
    }

    async newtask(data: TaskEntity, kpiid: string) {
        const kpi = await this.kpirepository.findOne(kpiid);
        const taskhandler = await this.userepository.findOne(data.taskhandler)
        const task = await this.trepository.create({ ...data, kpi, taskhandler });
        await this.trepository.save(task);
        return { ...task, project: task.kpi };
    }
    async updatetask(data: TaskEntity, taskid: string) {
        let task = await this.trepository
            .createQueryBuilder('task')
            .where('task.id = :id', {id: taskid})
            .getOne();
        const taskhandler = await this.userepository
            .createQueryBuilder('user')
            .where('user.id = :id', {id: data.taskhandler})
            .getOne();
        const kpi = await this.kpirepository
            .createQueryBuilder('kpi')
            .where('kpi.id = :id', {id: data.kpi})
            .getOne();
        await this.trepository.update(task, {...data, taskhandler, kpi});
        task = await this.trepository
            .createQueryBuilder('task')
            .where('task.id = :id', {id: taskid})
            .leftJoinAndSelect('task.taskhandler', 'taskhandler')
            .leftJoinAndSelect('task.kpi', 'kpi')
            .getOne();
        return task;
    }
    async deltask(id: string) {
        await this.trepository.delete(id);
        return { deleted: true };
    }
    async getbyproj(id: string) {
        return this.trepository
            .createQueryBuilder('tasks')
            .leftJoinAndSelect('tasks.kpi', 'kpi')
            .leftJoin('kpi.project', 'project')
                .where('kpi.project = :id', { id })
            .leftJoinAndSelect('tasks.taskhandler', 'taskhandler')
            .getMany();
    }
    async getbyuser(id: string) {
        return this.trepository
            .createQueryBuilder('tasks')
            .leftJoinAndSelect('tasks.taskhandler', 'taskhandler')
            .where('tasks.taskhandler = :id', {id})
            .leftJoinAndSelect('tasks.kpi', 'kpi')
            .leftJoinAndSelect('kpi.project', 'project')
            .andWhere('project.approvallevel = 2')
            .getMany();
    }
}
