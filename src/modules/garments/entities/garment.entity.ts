import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity('garment') // Maps to the "garment" table in the database
export class Garment {
  @PrimaryGeneratedColumn() // Auto-generates an integer for the "id" column
  id: number;

  @Column({ type: 'uuid' }) // Maps to the "id_user" column
  id_user: string;

  @Column({ type: 'int' }) // Maps to the "id_image" column
  id_image: number;

  @Column({ type: 'int' }) // Maps to the "id_subcategory" column
  id_subcategory: number;

  @CreateDateColumn({ type: 'date' }) // Automatically sets the "created_at" column
  created_at: Date;

  @UpdateDateColumn({ type: 'date' }) // Automatically updates the "updated_at" column
  updated_at: Date;
}
