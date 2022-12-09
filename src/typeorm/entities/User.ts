import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity({ name: 'users' })
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: number;

  @Column()
  name: string;

  @Column({ unique: true })
  email: string;

  @Column({ nullable: true })
  username: string;

  @Column({ default: Math.floor(Math.random() * (30 - 15 + 1)) + 15 })
  age: number;

  @Column()
  password: string;

  @CreateDateColumn()
  createdAt: Date;
}
