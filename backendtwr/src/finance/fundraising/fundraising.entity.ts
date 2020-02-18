import { Entity, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn, Column, ManyToOne } from "typeorm";
import { ProjectEntity } from '../../project/project.entity';
import { UserEntity } from 'user/user.entity';

@Entity('fundraising')
export class FundraisingEntity {
    @PrimaryGeneratedColumn('uuid') id: string;
    @CreateDateColumn() created: Date;
    @UpdateDateColumn() updated: Date;
    
		//@Column({type: 'text', nullable: true}) budget: string;
		//@Column({type: 'text', nullable: true}) category: string;
		@Column({type:'text'}) method: string;
    @Column('int') amount: number;
    @ManyToOne(type => ProjectEntity, project => project.fraising) project: ProjectEntity;
    @ManyToOne(type => UserEntity, pointperson => pointperson.fundraising) pointperson: UserEntity;
}

//[ { "method": "Secret Method No 1", "amount": 381, "project": "09396023-b905-4d79-953f-3efe69b44fde", "budget": 33, "category": "string", "pointperson": "f6767f2e-3c66-4833-92fa-7f74d1ca3f0a" }, { "method": "Secret Method No 2", "amount": 498, "project": "09396023-b905-4d79-953f-3efe69b44fde", "budget": 44, "category": "string", "pointperson": "f6767f2e-3c66-4833-92fa-7f74d1ca3f0a" } ]
