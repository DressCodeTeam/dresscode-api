import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity('style') // Maps to the "style" table in the database
export class Style {
  @PrimaryGeneratedColumn() // Auto-generates an integer for the "id" column
  id: number;

  @Column({ type: 'varchar' }) // Maps to the "name" column
  name: string;
}
