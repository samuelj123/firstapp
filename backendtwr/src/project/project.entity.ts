import { Entity, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn, Column, ManyToOne, OneToMany, OneToOne } from 'typeorm';
import { NeedEntity } from '../pgroup/need.entity';
import { UserEntity } from '../user/user.entity';
import { KpiEntity } from './kpi/kpi.entity';
import { FundraisingEntity } from '../finance/fundraising/fundraising.entity';
import { LanguageEntity } from 'pgroup/language/language.entity';

@Entity('project')
export class ProjectEntity {
    @PrimaryGeneratedColumn('uuid') id: string;
    @CreateDateColumn() created: Date;
    @UpdateDateColumn() lastupdated: Date;

    @Column('text') name: string;
    @Column('text') vision: string;
    @Column('text') mission: string;
    @Column({ type: 'int', nullable: true }) projectduration?: number;
    @Column({ type: 'int', nullable: true }) approvallevel?: number;
    @Column({ type: 'text', nullable: true }) programname?: string;
    @Column({ type: 'int', nullable: true }) duration?: number;
    @Column({ type: 'text', nullable: true }) programsno?: string;
    @Column({ type: 'text', nullable: true }) contentformat?: string;
    @Column({ type: 'text', nullable: true }) productionformat?: string;
    @Column({ type: 'simple-array', nullable: true }) distmethod?: string[];
    @Column({ type: 'text', nullable: true }) primarydistmethod?: string;
    @Column({ type: 'text', nullable: true }) secondarydistmethod?: string;
    @Column({ type: 'text', nullable: true }) tertiarydistmethod?: string;
    @Column({ type: 'simple-array', nullable: true }) marketingmethod?: string[];
    @Column({ type: 'text', nullable: true }) country?: string;
    @Column({ type: 'text', nullable: true }) denialmsg?: string;
    @Column({ type: 'date', nullable: true }) startdate?: Date;
    @ManyToOne(type => NeedEntity, need => need.project, { onDelete: 'CASCADE' }) need: NeedEntity;
    @OneToMany(type => KpiEntity, kpi => kpi.project, { onDelete: 'CASCADE' }) kpis?: KpiEntity[];
    @ManyToOne(type => UserEntity, user => user.projects) creator: UserEntity;
    @OneToMany(type => FundraisingEntity, fundraising => fundraising.project) fundraising: FundraisingEntity;
    @ManyToOne(type => LanguageEntity, language => language.projects) language: LanguageEntity;
}
