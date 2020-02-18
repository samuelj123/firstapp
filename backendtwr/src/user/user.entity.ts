import { BaseEntity, Entity, PrimaryGeneratedColumn, CreateDateColumn, Column, UpdateDateColumn, BeforeInsert, OneToMany, ManyToOne } from 'typeorm';
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
import { ProjectEntity } from '../project/project.entity';
import { LanguageEntity } from '../pgroup/language/language.entity';
import { TaskEntity } from '../project/task/task.entity';
import { KpiEntity } from 'project/kpi/kpi.entity';
import { FundraisingEntity } from 'finance/fundraising/fundraising.entity';

export type Country= 'India' | 'Pakistan' | 'Bangladesh' | 'Srilanka' | 'Nepal';
export type Position= 'ADMIN' | 'Donor' | 'ID' | 'CEO' | 'RO' | 'COORDINATOR' | 'MANAGER' | 'EXECUTIVE';

@Entity('user')
export class UserEntity {
    @PrimaryGeneratedColumn('uuid') id: string;

    @CreateDateColumn() created: Date;

    @UpdateDateColumn() lastUpdated: Date;

    @Column({
        type: 'text',
        unique: true,
    }) email: string;

    @Column('text') firstname: string;
    @Column('text') lastname: string;

    @Column('text') password: string;

    @BeforeInsert()
    async hashPassword() {
        this.password = await bcrypt.hash(this.password, 10);
    }

    @Column('simple-array') region: [];

    @Column('text') country: Country;

    @Column('simple-array') position: Position[];

    toResponseObject(showToken: boolean = true) {
        const {id, country, token} = this;
        const responseObject = { id, country, token};
        if (showToken) {
            responseObject.token = token;
        }
        return {id, country, token};
    }

    async comparePassword(attempt: string): Promise<boolean> {
        return await bcrypt.compare(attempt, this.password);
    }

    private get token() {
        const {id, email, country} = this;
        return jwt.sign(
            {id, email, country},
            process.env.SECRET, {expiresIn: '7d'});
    }

    @OneToMany(type => ProjectEntity, project => project.creator) projects: ProjectEntity[];
    @OneToMany(type => TaskEntity, tasks => tasks.taskhandler) tasks: TaskEntity[];
    @OneToMany(type => KpiEntity, kpis => kpis.pointperson) kpis: KpiEntity[];
    @OneToMany(type => FundraisingEntity, fundraising => fundraising.pointperson) fundraising: FundraisingEntity[];
    @ManyToOne(type => LanguageEntity, language => language.users) language: LanguageEntity;
}


//[{ "email": "rphilip@twr.org", "firstname": "Rufus", "lastname": "Philip", "password": "Ps@lm23:1RP", "country": "Singapore", "position": ["ID", "CEO", "ADMIN"], "language": "2e79a4ad-88b1-462b-9aad-a96e24dae82d"}, { "email": "sjoseph@twr.org", "firstname": "Samuel", "lastname": "Joseph", "password": "1", "country": "Singapore", "position": ["ID", "CEO", "ADMIN"], "language": "2e79a4ad-88b1-462b-9aad-a96e24dae82d"}, { "email": "sjoseph@twr.org", "firstname": "Samuel", "lastname": "Joseph", "password": "1", "country": "Singapore", "position": ["ID", "CEO", "ADMIN"], "language": "2e79a4ad-88b1-462b-9aad-a96e24dae82d"}, ]
