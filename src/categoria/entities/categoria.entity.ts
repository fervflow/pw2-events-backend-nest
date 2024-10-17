import { Entity, Column, ObjectIdColumn } from 'typeorm';

@Entity('categorias')
export class Categoria {
  @ObjectIdColumn()
  id: string;

  @Column({ unique: true })
  nombre: string;
}
