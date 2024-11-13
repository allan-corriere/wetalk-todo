import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Todo {
  @PrimaryGeneratedColumn('uuid')
  uuid: string;

  @Column({
    type: 'varchar',
    length: 255,
  })
  title: string;

  @Column({
    nullable: true,
    type: 'varchar',
    length: 255,
  })
  description: string;
}
