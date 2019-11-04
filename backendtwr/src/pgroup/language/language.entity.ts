import { Entity, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn, Column, ManyToOne, OneToMany, OneToOne } from 'typeorm';
import { PgroupEntity } from 'pgroup/pgroup.entity';
import { UserEntity } from 'user/user.entity';
import { ProjectEntity } from 'project/project.entity';

export type Country= 'India' | 'Pakistan' | 'Bangladesh' | 'Srilanka' | 'Nepal';

@Entity('language')
export class LanguageEntity {
    @PrimaryGeneratedColumn('uuid') id: string;
    @CreateDateColumn() created: Date;
    @UpdateDateColumn() lastupdated: Date;

    @Column('text') name: string;
    @Column('text') iso: string;
    @Column('text') langdescription: string;
    @Column('int') population: number;
    @Column('text') culture: string;
    @Column('simple-array') religions: string[];
    @Column('text') specificneed: string;
    @Column('simple-array') country: Country[];
    @OneToMany(type => PgroupEntity, pgroup => pgroup.language, { onDelete: 'CASCADE' }) pgroups?: PgroupEntity[];
    @OneToMany(type => ProjectEntity, project => project.language, { onDelete: 'CASCADE' }) projects?: ProjectEntity[];
    @OneToMany(type => UserEntity, user => user.language, { onDelete: 'CASCADE' }) users?: UserEntity[];
}
