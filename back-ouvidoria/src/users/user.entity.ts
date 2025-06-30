import { UUID } from 'node:crypto';
import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn } from 'typeorm';

@Entity('users')
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: UUID;

  @Column()
  name: string;

  @Column({ unique: true })
  email: string;

  @Column()
  password: string;

  @Column({ type: 'enum', enum: ['CLIENT', 'CONSULTANT'] })
  role: 'CLIENT' | 'CONSULTANT';

  @Column({ nullable: true })
  refreshToken: string;

  @CreateDateColumn()
  createdAt: Date;
}

export enum UserRole {
  CLIENT = 'CLIENT',
  CONSULTANT = 'CONSULTANT',
}