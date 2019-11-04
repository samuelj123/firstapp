import { Injectable } from '@nestjs/common';
import { TaskEntity } from './task.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { KpiEntity } from '../kpi/kpi.entity';

@Injectable()
export class TaskService {

    constructor(
        @InjectRepository(TaskEntity) private trepository: Repository<TaskEntity>,
        @InjectRepository(KpiEntity) private kpirepository: Repository<KpiEntity>
    ) { }

    async getall() {
        return await this.trepository.find({ relations: ['kpi'] });
    }

    async getallbykpi(kpiid: string) {
        const kpi = await this.kpirepository.findOne(kpiid);
        return await this.trepository.find({ where: { kpi } });
    }

    async newtask(data: TaskEntity, kpiid: string) {
        const kpi = await this.kpirepository.findOne(kpiid);
        const task = await this.trepository.create({ ...data, kpi });
        await this.trepository.save(task);
        return { ...task, project: task.kpi };
    }
    async updatetask(data: TaskEntity, id: string) {
        let task = await this.trepository.findOne({ where: { id } });
        await this.trepository.update({ id }, data);
        task = await this.trepository.findOne({ where: { id } });
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
            // .where('project = :id', {id})
            .getMany();
    }
}
