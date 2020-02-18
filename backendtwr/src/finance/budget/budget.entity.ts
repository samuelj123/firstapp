import { Entity, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn, Column, ManyToOne } from "typeorm";
import { ProjectEntity } from '../../project/project.entity';

@Entity('budget')
export class BudgetEntity {
    @PrimaryGeneratedColumn('uuid') id: string;
    @CreateDateColumn() created: Date;
    @UpdateDateColumn() updated: Date;
    
    @Column('int') amount: number;
    @Column({type: 'text'}) category: string;
    @ManyToOne(type => ProjectEntity, project => project.budget) project: ProjectEntity;
}
