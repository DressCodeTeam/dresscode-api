import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity('gender') // Maps to the "gender" table in the database
export class Gender {
  @PrimaryGeneratedColumn() // Auto-generates an integer for the "id" column
  id: number;

  @Column({ type: 'varchar' }) // Maps to the "name" column without a length constraint
  name: string;
}
