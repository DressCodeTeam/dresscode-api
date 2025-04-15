import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

/*
user table
id: uuid
id_gender: int4
pseudo: varchar
email: varchar
birth_date: date
password: varchar
joined_date: timestampstz
*/

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
