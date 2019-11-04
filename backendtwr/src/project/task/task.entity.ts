import { PrimaryGeneratedColumn, Entity, CreateDateColumn, UpdateDateColumn, Column, ManyToOne } from 'typeorm';
import { KpiEntity } from '../kpi/kpi.entity';

@Entity('task')
export class TaskEntity {
    @PrimaryGeneratedColumn('uuid') id: string;
    @CreateDateColumn() created: Date;
    @UpdateDateColumn() updated: Date;

    @Column({ type: 'text' }) task: string;
    @Column({ type: 'int' }) duration: number; // Start Date (Bad naming)
    @Column({ type: 'int', nullable: true }) enddate: number;
    @Column({ type: 'text' }) pointperson: string;
    @ManyToOne(type => KpiEntity, kpi => kpi.tasks, { onDelete: 'CASCADE' }) kpi: KpiEntity;
}

// {"task": "first task",
// "duration": 23,
// "pointperson": "first task"}
