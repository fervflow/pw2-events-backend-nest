import { Entity, Column, ManyToOne, ObjectIdColumn } from 'typeorm';
import { Categoria } from '../../categoria/entities/categoria.entity';

@Entity('eventos')
export class Evento {
  @ObjectIdColumn()
  id: string;

  @Column()
  nombre: string;

  @Column()
  ubicacion: string;

  @Column()
  fecha: Date;

  @Column('decimal')
  precio: number;

  @ManyToOne(() => Categoria, (categoria) => categoria.id)
  categoria: Categoria;
}
