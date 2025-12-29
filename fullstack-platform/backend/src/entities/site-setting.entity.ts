import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class SiteSetting {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  key: string;

  @Column('text')
  value: string;
}
