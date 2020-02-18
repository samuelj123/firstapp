import { PrimaryGeneratedColumn, Entity, CreateDateColumn, UpdateDateColumn, Column, ManyToOne } from 'typeorm';
import { KpiEntity } from '../kpi/kpi.entity';
import { UserEntity } from '../../user/user.entity';
import { ProjectEntity } from '../project.entity';
export type Category = ['Content Creation', 'Content Distribution', 'Marketing', 'Audience Relations', 'Fund Raising', 'Reporting']
@Entity('task')
export class TaskEntity {
    @PrimaryGeneratedColumn('uuid') id: string;
    @CreateDateColumn() created: Date;
    @UpdateDateColumn() updated: Date;

    @Column({ type: 'text' }) task: string;
    @Column({ type: 'text' }) category?: string;
    @Column({ type: 'int' }) startdate: number;
    @Column({ type: 'int' }) enddate: number;
    @Column({ type: 'boolean', nullable: true}) complete: boolean;
    @ManyToOne(type => UserEntity, taskhandler => taskhandler.tasks) taskhandler?: UserEntity;
    // @ManyToOne(type => KpiEntity, kpi => kpi.tasks, { onDelete: 'CASCADE' }) kpi: KpiEntity;
    @ManyToOne(type => ProjectEntity, project => project.tasks, { onDelete: 'CASCADE' }) project: ProjectEntity;
}

