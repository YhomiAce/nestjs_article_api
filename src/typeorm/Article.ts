import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { User } from './entities/User';

@Entity({ name: 'articles' })
export class Article {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  title: string;

  @Column()
  body: string;

  @Column({ default: false })
  isPublished: boolean;

  @ManyToOne(() => User, (user) => user.posts)
  user: User;

  @CreateDateColumn()
  createdAt: Date;
}
