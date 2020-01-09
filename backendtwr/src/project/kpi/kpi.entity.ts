import { PrimaryGeneratedColumn, Entity, CreateDateColumn, UpdateDateColumn, Column, ManyToOne, OneToMany } from 'typeorm';
import { ProjectEntity } from '../project.entity';
import { TaskEntity } from './../task/task.entity';
import { UserEntity } from 'user/user.entity';

export type KPI = ['Content Creation', 'Content Delivery', 'Marketing', 'Audience Relations'];
@Entity('kpi')
export class KpiEntity {
    @PrimaryGeneratedColumn('uuid') id: string;
    @CreateDateColumn() created: Date;
    @UpdateDateColumn() updated: Date;

    @Column({ type: 'text' }) kpi: string;
    @Column({ type: 'int', nullable: true }) budget: number;
    @Column({ type: 'text' }) type: KPI;
    @Column({ type: 'text', nullable: true }) pointperson: string;
    @Column({ type: 'text', nullable: true }) report: string;
    // @ManyToOne(type => UserEntity, pointperson => pointperson.kpis) pointperson: UserEntity;
    @OneToMany(type => TaskEntity, task => task.kpi, {onDelete: 'CASCADE'}) tasks?: TaskEntity[];
    @ManyToOne(type => ProjectEntity, project => project.kpis, { onDelete: 'CASCADE' }) project: ProjectEntity;
}
