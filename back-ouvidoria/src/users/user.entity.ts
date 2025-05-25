import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn } from 'typeorm';

@Entity('users')
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column({ unique: true })
  email: string;

  @Column()
  password: string;

  @Column({ type: 'enum', enum: ['CLIENT', 'CONSULTANT'] })
  role: 'CLIENT' | 'CONSULTANT';

  @CreateDateColumn()
  createdAt: Date;
}

export enum UserRole {
  CLIENT = 'CLIENT',
  CONSULTANT = 'CONSULTANT',
}