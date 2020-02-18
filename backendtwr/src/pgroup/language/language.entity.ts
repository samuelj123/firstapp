import { Entity, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn, Column, ManyToOne, OneToMany, OneToOne } from 'typeorm';
import { PgroupEntity } from '../pgroup.entity';
import { UserEntity } from '../../user/user.entity';
import { ProjectEntity } from '../../project/project.entity';

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


//{"name": "Hindi","iso": "HIN","langdescription": "Hindi is only what elsestringstringHindi is only what elsestringstringHindi is only what elsestringstringHindi is only what elsestringstringHindi is only what elsestringstringHindi is only what elsestringstringindi is only what elsestringstring","population": 3548035,"culture": "TThere is a great Hindi culture here. There is a great Hindi culture here. There is a great Hindi culture here. There is a great Hindi culture here. There is a great Hindi culture here. There is a great Hindi culture here. There is a great Hindi culture here. There is a great Hindi culture here. here is a great Hindi culture here.","religions": ["Hinduism", "Christianity", "Islam", "Buddhism", "Sikhism"],"specificneed": "TThere is a specific need There is a specific need There is a specific need There is a specific need There is a specific need There is a specific need There is a specific need here is a specific need","country": ["India", "Singapore", "Singapore"],}
