import {
  Entity,
  Column,
  // PrimaryGeneratedColumn,
  ObjectIdColumn,
  ObjectId,
} from 'typeorm';

@Entity('usuarios')
export class Usuario {
  // @PrimaryGeneratedColumn('uuid')
  // id: string;

  @ObjectIdColumn()
  _id: ObjectId;

  @Column()
  nombre: string;

  @Column()
  email: string;

  @Column()
  password: string;
}
