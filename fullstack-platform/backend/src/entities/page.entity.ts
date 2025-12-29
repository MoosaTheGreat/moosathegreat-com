import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Page {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title: string;

  @Column('text')
  content: string;

  @Column({ unique: true })
  slug: string;

  @Column({ default: false })
  published: boolean;
}
