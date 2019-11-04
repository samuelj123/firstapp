import { BaseEntity, Entity, PrimaryGeneratedColumn, CreateDateColumn, Column, UpdateDateColumn, BeforeInsert, OneToMany, ManyToOne } from 'typeorm';
// import * as bcrypt from 'bcryptjs';
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
// import * as jwt from 'jsonwebtoken';
import { ProjectEntity } from '../project/project.entity';
import { LanguageEntity } from 'pgroup/language/language.entity';

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
    @ManyToOne(type => LanguageEntity, language => language.users) language: LanguageEntity;
}
