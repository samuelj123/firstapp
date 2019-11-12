import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ProjectEntity } from './project.entity';
import { ProjectDTO } from './project.dto';
import { NeedEntity } from '../pgroup/need.entity';
import { UserEntity } from '../user/user.entity';
import { FundraisingEntity } from '../finance/fundraising/fundraising.entity';

@Injectable()
export class ProjectService {
    constructor(
        @InjectRepository(ProjectEntity) private projrepository: Repository<ProjectEntity>,
        @InjectRepository(UserEntity) private userepository: Repository<NeedEntity>,
        @InjectRepository(NeedEntity) private needrepository: Repository<NeedEntity>,
        @InjectRepository(FundraisingEntity) private frepository: Repository<FundraisingEntity>,
    ) { }
    async getall() {
        // return this.projrepository.find({ relations: ['need', 'creator'] });
        return this.projrepository
            .createQueryBuilder('project')
            .leftJoinAndSelect('project.need','need')
            .leftJoinAndSelect('need.pgroup','pgroup')
            .getMany();
    }
    async new(data: ProjectDTO) {
        const nd = await this.needrepository.findOne({ where: { id: data.need } });
        const user = await this.userepository.findOne({ where: { id: data.creator } });
        const project = await this.projrepository.create({ ...data, need: nd, creator: user });
        await this.projrepository.save(project);
        return { ...project, need: project.need };
    }

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
        .leftJoinAndSelect('project.need', 'need')
        .leftJoinAndSelect('need.pgroup', 'pgroup')
        .leftJoinAndSelect('project.kpis', 'kpi')
        .leftJoinAndSelect('kpi.tasks', 'tasks')
        .leftJoinAndSelect('project.fundraising', 'fundraising')
        .getOne();
    }

    async countryfiltered(country: string) {
        return this.projrepository
            .createQueryBuilder('project')
            .leftJoin('project.creator', 'user')
            .where('user.country = :country', { country })
            .leftJoinAndSelect('project.need', 'need')
            .leftJoinAndSelect('need.pgroup', 'pgroup')
            .getMany();
    }
}
