import { PrimaryGeneratedColumn, Entity, CreateDateColumn, UpdateDateColumn, Column, ManyToOne, OneToMany } from 'typeorm';
import { ProjectEntity } from '../project.entity';
import { TaskEntity } from './../task/task.entity';
import { UserEntity } from 'user/user.entity';
import { User } from 'user/user.decorator';

export type Category = ['Content Creation',
    'Content Delivery',
    'Marketing',
    'Audience Relations',
    'Fundraising'
];
@Entity('kpi')
export class KpiEntity {
    @PrimaryGeneratedColumn('uuid') id: string;
    @CreateDateColumn() created: Date;
    @UpdateDateColumn() updated: Date;

    @Column({ type: 'text' }) kpi: string;
    @Column({ type: 'text' }) type: string;
    @Column({ type: 'text', nullable: true }) report: string;
    @Column({ type: 'text', nullable: true }) reportdescription: string;
    @ManyToOne(type => UserEntity, pointperson => pointperson.kpis, {onDelete: 'CASCADE'}) pointperson: UserEntity;
    @ManyToOne(type => ProjectEntity, project => project.kpis, { onDelete: 'CASCADE' }) project: ProjectEntity;
}
