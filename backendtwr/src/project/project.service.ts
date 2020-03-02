import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ProjectEntity } from './project.entity';
import { ProjectDTO } from './project.dto';
import { NeedEntity } from '../pgroup/need.entity';
import { UserEntity } from '../user/user.entity';
import { FundraisingEntity } from '../finance/fundraising/fundraising.entity';
import { PgroupEntity } from 'pgroup/pgroup.entity';

@Injectable()
export class ProjectService {
    constructor(
        @InjectRepository(ProjectEntity) private projrepository: Repository<ProjectEntity>,
        @InjectRepository(UserEntity) private userepository: Repository<NeedEntity>,
        @InjectRepository(NeedEntity) private needrepository: Repository<NeedEntity>,
        @InjectRepository(FundraisingEntity) private frepository: Repository<FundraisingEntity>,
        @InjectRepository(PgroupEntity) private pgrepository: Repository<PgroupEntity>,
    ) { }
    async getall() {
        // return this.projrepository.find({ relations: ['need', 'creator'] });
        return this.projrepository
            .createQueryBuilder('project')
						.leftJoinAndSelect('project.fraising', 'fraising')
            .leftJoinAndSelect('project.pgroup','pgroup')
            .leftJoinAndSelect('pgroup.needs','needs')
            .getMany();
    }
    async new(data: ProjectDTO) {
        const pg = await this.pgrepository.findOne({ where: { id: data.pgroup } });
        const user = await this.userepository.findOne({ where: { id: data.creator } });
        const project = await this.projrepository.create({ ...data, pgroup: pg, creator: user });
        await this.projrepository.save(project);
        return { ...project, pgroup: project.pgroup };
    }
    // {"name": "My Lovely Project","needs": "My Lovely Project","vision": "My Lovely Project","mission": "My Lovely Project","projectduration": 28,"programname": "My Lovely Project","duration": 28,"contentformat": "My Lovely Project","productionformat": "My Lovely Project","productionkpis": ["First Production KPI", "Second Production KPI", "Third Production KPI"],"distributionkpis": ["First Distribution KPI", "Second Distribution KPI", "Third Distribution KPI"],"marketingmethod": ["First Marketing Method", "Second Mmethod", "Third mmethod"],"marketingkpis": ["First Marketing KPI", "Second Marketing KPI", "Third Marketing KPI"],"audiencerelationskpis": ["First AR KPI", "Second AR KPI", "Third AR KPI"],"pgroup": "My Lovely Project","creator": "My Lovely Project"}

    async delete(id: string) {
        await this.projrepository.delete(id);
        return { deleted: true };
    }

    async update(id: string, data: ProjectEntity): Promise<ProjectEntity> {
        let project = await this.projrepository.findOne({ where: { id } });
        await this.projrepository.update({ id }, data);
        project = await this.projrepository.findOne({ where: { id } });
        return project;
    }

    async getone(id: string) {
        // return this.projrepository.findOne({ where: { id }, relations: ['need'] });
        return this.projrepository.createQueryBuilder('project')
        .where('project.id = :id', {id})
        .leftJoinAndSelect('project.pgroup', 'pgroup')
				.leftJoinAndSelect('project.kpis', 'kpis')
        .leftJoinAndSelect('project.tasks', 'tasks')
        .leftJoinAndSelect('tasks.taskhandler', 'taskhandler')
        .leftJoinAndSelect('project.fraising', 'fundraising')
				.leftJoinAndSelect('project.budget', 'budget')
				.leftJoinAndSelect('pgroup.needs', 'needs')
        .getOne();
    }

    async countryfiltered(country: string) {
        return this.projrepository
            .createQueryBuilder('project')
            .leftJoin('project.creator', 'user')
            .where('user.country = :country', { country })
            .leftJoinAndSelect('project.pgroup', 'pgroup')
            .leftJoinAndSelect('project.kpis', 'kpis')
            .leftJoinAndSelect('project.tasks', 'tasks')
            .leftJoinAndSelect('tasks.taskhandler', 'taskhandler')
            .getMany();
    }
}
