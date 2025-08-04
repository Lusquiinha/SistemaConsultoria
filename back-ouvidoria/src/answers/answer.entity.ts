import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, ManyToOne, OneToOne } from 'typeorm';
import { User } from '../users/user.entity';
import { Question } from '../questions/question.entity';
import { UUID } from 'node:crypto';

@Entity('answers')
export class Answer {
    @PrimaryGeneratedColumn('uuid')
    id: UUID;

    @Column()
    content: string;

    @ManyToOne(() => User)
    consultant: User;

    @OneToOne(() => Question, (question) => question.answer)
    question: Question;

    @CreateDateColumn()
    createdAt: Date;
}
