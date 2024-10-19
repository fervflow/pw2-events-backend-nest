import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateEventoDto } from './dto/create-evento.dto';
import { Evento } from './entities/evento.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ObjectId } from 'mongodb';
import { Categoria } from 'src/categoria/entities/categoria.entity';
import { CategoriaService } from 'src/categoria/categoria.service';

@Injectable()
export class EventoService {
  constructor(
    @InjectRepository(Evento)
    private readonly eventoRepository: Repository<Evento>,
    @InjectRepository(Categoria)
    private readonly categoriaService: CategoriaService,
  ) {}
  async create(createEventoDto: CreateEventoDto) {
    const categoria = await this.categoriaService.findOne(
      createEventoDto.categoriaId,
    );
    const newEvento = this.eventoRepository.create({
      ...createEventoDto,
      categoriaId: categoria._id,
    });
    await this.eventoRepository.save(newEvento);
    return this.eventoWithCategoria(newEvento, categoria);
  }

  async findAll() {
    const eventos = await this.eventoRepository.find();
    const eventosWithCategoria = [];
    for (const evento of eventos) {
      eventosWithCategoria.push(await this.eventoWithCategoria(evento));
    }
    return eventosWithCategoria;
  }

  async findOne(id: string) {
    const evento = await this.eventoRepository.findOneBy({
      _id: new ObjectId(id),
    });
    if (!evento) {
      throw new NotFoundException(`Evento with id: ${id} not found.`);
    }
    return evento;
  }

  async findOneWithCategoria(id: string) {
    const evento = await this.findOne(id);
    return this.eventoWithCategoria(evento);
  }

  private async eventoWithCategoria(evento: Evento, cat?: Categoria) {
    const { categoriaId, ...eventoWithoutCategoria } = evento;
    const categoria =
      cat ?? (await this.categoriaService.findOne(categoriaId.toString()));
    return { ...eventoWithoutCategoria, categoria };
  }

  async update(id: string, evento: Partial<CreateEventoDto>) {
    const eventoUpdate = await this.findOne(id);
    const categoria = await this.categoriaService.findOne(
      evento.categoriaId ?? eventoUpdate.categoriaId.toString(),
    );
    Object.assign(eventoUpdate, evento);
    this.eventoRepository.save(eventoUpdate);
    return this.eventoWithCategoria(eventoUpdate, categoria);
  }

  async remove(id: string) {
    return this.eventoRepository.delete(id);
  }
}
