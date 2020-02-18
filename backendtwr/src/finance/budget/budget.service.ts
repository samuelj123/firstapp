import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ProjectEntity } from '../../project/project.entity';
import { BudgetEntity } from './budget.entity';

@Injectable()
export class BudgetService {
    constructor(
        @InjectRepository(ProjectEntity) private projrepository: Repository<ProjectEntity>,
        @InjectRepository(BudgetEntity) private brepository: Repository<BudgetEntity>,
    ) { }
    async getall() {
        return this.brepository
            .createQueryBuilder('budget')
            .leftJoinAndSelect('budget.project','project')
            .getMany();
    }
    async new(data: BudgetEntity) {
			const existbudget = await this.brepository.createQueryBuilder('budget')
				.leftJoinAndSelect('budget.project', 'project')
				.where('project.id = :project', {project:data.project})
				.andWhere('budget.category = :category', {category:data.category})
				.getOne();
			if(!existbudget){
				const project = await this.projrepository.findOne({ where: { id: data.project } });
				const budget = await this.brepository.create({ ...data, project:project});
				await this.brepository.save(budget);
				return existbudget;
			}else{
				await this.brepository.update(existbudget.id, data);
        const budget = await this.brepository.findOne({ where: { id: existbudget.id } });
        return budget;
			}
    }

    async delete(id: string) {
        await this.brepository.delete(id);
        return { deleted: true };
    }

    async update(id: string, data: BudgetEntity): Promise<BudgetEntity> {
        let budget = await this.brepository.findOne({ where: { id } });
        await this.brepository.update({ id }, data);
        budget = await this.brepository.findOne({ where: { id } });
        return budget;
    }

    async getone(id: string) {
        return this.brepository.createQueryBuilder('budget')
        .where('budget.id = :id', {id})
        .leftJoinAndSelect('budget.project', 'project')
        .getOne();
    }

    async countryfiltered(country: string) {
        return this.brepository
            .createQueryBuilder('budget')
						.leftJoinAndSelect('budget.project', 'project')
            .leftJoin('project.creator', 'user')
            .where('user.country = :country', { country })
            .getMany();
    }
}
