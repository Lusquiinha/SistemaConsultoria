import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, ManyToOne } from 'typeorm';
import { User } from '../users/user.entity'; // Adjust the import path as necessary
import { UUID } from 'node:crypto';


export enum QuestionStatus {
    PENDING = 'PENDING',
    CLAIMED = 'CLAIMED',
    ANSWERED = 'ANSWERED',
}

@Entity('questions')
export class Question {
    @PrimaryGeneratedColumn('uuid')
    id: UUID;

    @Column()
    content: string;

    @ManyToOne(() => User)
    client: User;

    @ManyToOne(() => User, { nullable: true })
    consultant: User | null;

    @Column({ default: QuestionStatus.PENDING }) // PENDING, CLAIMED, ANSWERED
    status: QuestionStatus;

    @CreateDateColumn()
    createdAt: Date;
}
