import {
  Entity,
  Column,
  // PrimaryGeneratedColumn,
  ObjectIdColumn,
} from 'typeorm';

@Entity('usuarios')
export class Usuario {
  // @PrimaryGeneratedColumn('uuid')
  // id: string;

  @ObjectIdColumn()
  id: string;

  @Column()
  nombre: string;

  @Column()
  email: string;

  @Column()
  password: string;
}
