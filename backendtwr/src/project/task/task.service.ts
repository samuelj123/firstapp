import { Injectable } from '@nestjs/common';
import { TaskEntity } from './task.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UserEntity } from '../../user/user.entity';
import { ProjectEntity } from '../project.entity';

@Injectable()
export class TaskService {

    constructor(
        @InjectRepository(TaskEntity) private trepository: Repository<TaskEntity>,
        @InjectRepository(ProjectEntity) private projrepository: Repository<ProjectEntity>,
        @InjectRepository(UserEntity) private userepository: Repository<UserEntity>
    ) { }

    async getall() {
        return await this.trepository
            .createQueryBuilder('tasks')
            .leftJoinAndSelect('tasks.project', 'project')
            .leftJoinAndSelect('tasks.taskhandler', 'taskhandler')
            .getMany();
    }

    async getallbyproject(projid: string) {
        //const proj = await this.projrepository.findOne(projid);
        //return await this.trepository.find({ where: { projid } });
				return await this.trepository
						.createQueryBuilder('tasks')
						.leftJoinAndSelect('tasks.project', 'project')
						.where('project.id = :id', {id: projid})
						.getMany();
    }

    async newtask(data: TaskEntity, projid: string) {
        const project = await this.projrepository.findOne(projid);
        const taskhandler = await this.userepository.findOne(data.taskhandler)
        const task = await this.trepository.create({ ...data, project, taskhandler });
        await this.trepository.save(task);
        return { task };
    }
    async updatetask(data: Partial<TaskEntity>, taskid: string) {
        let task;
        const project = await this.projrepository
                .createQueryBuilder('project')
                .where('project.id = :id', {id: data.project})
                .getOne();
        if (!data.taskhandler) {
            task = await this.trepository.update(taskid, {...data, project});
        } else if (data.taskhandler) {
            const taskhandler = await this.userepository
                .createQueryBuilder('user')
                .where('user.id = :id', { id: data.taskhandler })
                .getOne();
            task = await this.trepository.update(taskid, {...data, project, taskhandler})   
        }
        return task;
    }
    async deltask(id: string) {
        await this.trepository.delete(id);
        return { deleted: true };
    }
    async getbyproj(id: string) {
        return this.trepository
            .createQueryBuilder('tasks')
            .leftJoinAndSelect('tasks.project', 'project')
            .where('project = :id', { id })
            .leftJoinAndSelect('tasks.taskhandler', 'taskhandler')
            .getMany();
    }
    async getbyuser(id: string) {
        return this.trepository
            .createQueryBuilder('tasks')
            .leftJoinAndSelect('tasks.taskhandler', 'taskhandler')
            .where('taskhandler.id = :id', { id })
						.leftJoinAndSelect('tasks.project', 'project')
						.andWhere('project.approvallevel = 2')
            .getMany();
    }
}
