import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateCategoriaDto } from './dto/create-categoria.dto';
// import { UpdateCategoriaDto } from './dto/update-categoria.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Categoria } from './entities/categoria.entity';
import { Repository } from 'typeorm';
import { ObjectId } from 'mongodb';

@Injectable()
export class CategoriaService {
  constructor(
    @InjectRepository(Categoria)
    private readonly categoriaRepository: Repository<Categoria>,
  ) {}
  async create(createCategoriaDto: CreateCategoriaDto) {
    return this.categoriaRepository.save(createCategoriaDto);
  }

  async findAll() {
    return this.categoriaRepository.find();
  }

  async findOne(id: string) {
    return this.categoriaRepository.findOneBy({ _id: new ObjectId(id) });
  }

  // async update(id: string, updateCategoriaDto: UpdateCategoriaDto) {
  //   const _id = new ObjectId(id);
  //   const upCategoria = await this.categoriaRepository.findOneBy({ _id: _id });
  //   if (!upCategoria) {
  //     throw new NotFoundException(`Categoria with id: ${id} not found.`);
  //   }
  //   Object.assign(upCategoria, updateCategoriaDto);
  //   return this.categoriaRepository.save(upCategoria);
  // }

  // async update(id: string, categoria: Partial<Categoria>): Promise<Categoria> {
  //   await this.categoriaRepository.update(id, categoria);
  //   if (!(await this.findOne(id))) {
  //     throw new NotFoundException(
  //       `Categoria with id: ${id} not found or there were no changes.`,
  //     );
  //   }
  //   return await this.findOne(id);
  // }
  async update(id: string, categoria: Partial<Categoria>): Promise<Categoria> {
    const categoriaUp = await this.categoriaRepository.preload({
      _id: new ObjectId(id),
      ...categoria,
    });

    if (!categoriaUp) {
      throw new NotFoundException(`Categoria with id: ${id} not found.`);
    }

    return this.categoriaRepository.save(categoriaUp);
  }

  async remove(id: string) {
    return this.categoriaRepository.delete(id);
  }
}
