import { Entity, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn, Column, OneToMany, ManyToOne } from 'typeorm';
import { NeedEntity } from './need.entity';
import { LanguageEntity } from './language/language.entity';

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

    @Column('text')
    agegrouplow: number;

    @Column('text')
    agegrouphigh: number;

    @Column('text')
    country: string;
    
    @Column({type: 'text', nullable: true})
    description?: string;

    @Column('text')
    population: number;

    @Column('text')
    electricityaccess: number;

    @Column('text')
    literacyrate: number;

    @Column('text')
    averageincome: number;

    @OneToMany(type => NeedEntity, need => need.pgroup, {onDelete: 'CASCADE'})
    needs: NeedEntity[];
    @ManyToOne(type => LanguageEntity, language => language.pgroups, {onDelete: 'CASCADE'})
    language: LanguageEntity[];
}
