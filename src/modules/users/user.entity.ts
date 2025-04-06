import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity('user') // Ensure the table name matches your existing table
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  id_gender: number;

  @Column()
  pseudo: string;

  @Column()
  email: string;

  @Column({ type: 'date' })
  birth_date: Date;

  @Column()
  password: string; // Hashed password
}
