import { Entity, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn, Column, OneToMany, ManyToOne } from 'typeorm';
import { NeedEntity } from './need.entity';
import { LanguageEntity } from './language/language.entity';
import { ProjectEntity } from '../project/project.entity';

@Entity('pgroup')
export class PgroupEntity {
    @PrimaryGeneratedColumn('uuid')
    id: string;
    @CreateDateColumn()
    created: Date;
    @UpdateDateColumn()
    lastUpdated: Date;

    @Column('text')
    pgroup: string;

    @Column('int')
    agegrouplow: number;

    @Column('int')
    agegrouphigh: number;

    @Column('text')
    country: string;
    
    @Column({type: 'text', nullable: true})
    description?: string;

    @Column('int')
    population: number;

    @Column('int')
    electricityaccess: number;
    
    @Column('text')
    mediaaccess: string;

    @Column('int')
    literacyrate: number;

    @Column('int')
    averageincome: number;

    @Column({type:'text', nullable:true})
    location: string;

    @OneToMany(type => NeedEntity, need => need.pgroup, {onDelete: 'CASCADE'})
    needs: NeedEntity[];
    @OneToMany(type => ProjectEntity, projects => projects.pgroup, {onDelete: 'CASCADE'})
    projects: ProjectEntity[];
    @ManyToOne(type => LanguageEntity, language => language.pgroups, {onDelete: 'CASCADE'})
    language: LanguageEntity[];
}
