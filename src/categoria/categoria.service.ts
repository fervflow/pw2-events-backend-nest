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
    const categoria = await this.categoriaRepository.findOneBy({
      _id: new ObjectId(id),
    });
    if (!categoria) {
      throw new NotFoundException(`Categoria with id: ${id} not found.`);
    }
    return categoria;
  }

  async update(id: string, categoria: Partial<Categoria>): Promise<Categoria> {
    const categoriaUpdate = await this.findOne(id);
    Object.assign(categoriaUpdate, categoria);
    return this.categoriaRepository.save(categoriaUpdate);
  }

  async remove(id: string) {
    return this.categoriaRepository.delete(id);
  }
}
