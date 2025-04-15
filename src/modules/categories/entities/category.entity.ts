import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity('category') // Maps to the "category" table in the database
export class Category {
  @PrimaryGeneratedColumn() // Auto-generates an integer for the "id" column
  id: number;

  @Column({ type: 'varchar' }) // Maps to the "name" column
  name: string;
}

@Entity('subcategory') // Maps to the "subcategory" table in the database
export class Subcategory {
  @PrimaryGeneratedColumn() // Auto-generates an integer for the "id" column
  id: number;

  @Column({ type: 'varchar' }) // Maps to the "name" column
  name: string;
}
