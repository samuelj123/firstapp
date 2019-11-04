import { Entity, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn, Column, ManyToOne } from "typeorm";
import { ProjectEntity } from '../../project/project.entity';

@Entity('fundraising')
export class FundraisingEntity {
    @PrimaryGeneratedColumn('uuid') id: string;
    @CreateDateColumn() created: Date;
    @UpdateDateColumn() updated: Date;

    @Column('text') method: string;
    @Column('int') amount: number;
    @Column({ type: 'text', nullable: true }) pointperson?: string;
    @ManyToOne(type => ProjectEntity, project => project.fundraising) project: ProjectEntity;
}
