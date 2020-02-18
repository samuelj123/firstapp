import { Entity, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn, Column, ManyToOne, OneToMany } from 'typeorm';
import { PgroupEntity } from './pgroup.entity';
import { ProjectEntity } from '../project/project.entity';

@Entity('need')
export class NeedEntity {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @CreateDateColumn()
    created: Date;

    @UpdateDateColumn()
    lastupdated: Date;

    @Column('text')
    need: string;

    @ManyToOne(type => PgroupEntity, pgroup => pgroup.needs, {onDelete: 'CASCADE'})
    pgroup: PgroupEntity;

    // @OneToMany(type => ProjectEntity, project => project.need, {onDelete: 'CASCADE'})
    // project: ProjectEntity[];
}
