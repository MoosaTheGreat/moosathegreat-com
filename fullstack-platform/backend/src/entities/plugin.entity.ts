import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Plugin {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column('text')
  description: string;

  @Column('json')
  config: any;

  @Column({ default: false })
  active: boolean;
}
