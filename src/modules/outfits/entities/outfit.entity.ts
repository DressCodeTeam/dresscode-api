import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
} from 'typeorm';

@Entity('outfit') // Maps to the "outfit" table in the database
export class Outfit {
  @PrimaryGeneratedColumn() // Auto-generates an integer for the "id" column
  id: number;

  @Column({ type: 'int' }) // Maps to the "id_style" column
  id_style: number;

  @CreateDateColumn({ type: 'date' }) // Automatically sets the "created_at" column
  created_at: Date;
}
