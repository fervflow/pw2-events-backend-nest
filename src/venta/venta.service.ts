import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ObjectId } from 'mongodb';
import { Venta } from './entities/venta.entity';
import { UsuarioService } from 'src/usuario/usuario.service';
import { EventoService } from 'src/evento/evento.service';
import { ClienteService } from 'src/cliente/cliente.service';
import { CreateVentaDto } from './dto/create-venta.dto';
import { UpdateVentaDto } from './dto/update-venta.dto';
import { Usuario } from 'src/usuario/entities/usuario.entity';
import { Cliente } from 'src/cliente/entities/cliente.entity';

@Injectable()
export class VentaService {
  constructor(
    @InjectRepository(Venta)
    private readonly ventaRepository: Repository<Venta>,
    private readonly usuarioService: UsuarioService,
    private readonly eventoService: EventoService,
    private readonly clienteService: ClienteService,
  ) {}

  // Create a new Venta with related entities
  async create(createVentaDto: CreateVentaDto) {
    const usuario = await this.usuarioService.findOne(
      createVentaDto.usuarioId.toString(),
    );
    const evento = await this.eventoService.findOneWithCategoria(
      createVentaDto.eventoId.toString(),
    );
    const cliente = await this.clienteService.findOne(
      createVentaDto.clienteId.toString(),
    );

    const newVenta = this.ventaRepository.create({
      ...createVentaDto,
      usuarioId: usuario._id,
      eventoId: evento._id,
      clienteId: cliente._id,
    });

    await this.ventaRepository.save(newVenta);
    return this.ventaWithRelatedEntities(newVenta, usuario, evento, cliente);
  }

  async findAll() {
    const ventas = await this.ventaRepository.find();
    const ventasWithDetails = [];

    for (const venta of ventas) {
      ventasWithDetails.push(await this.ventaWithRelatedEntities(venta));
    }

    return ventasWithDetails;
  }

  async findOne(id: string) {
    const venta = await this.ventaRepository.findOneBy({
      _id: new ObjectId(id),
    });
    if (!venta) {
      throw new NotFoundException(`Venta with id: ${id} not found.`);
    }
    return venta;
  }

  async findOneWithDetails(id: string) {
    const venta = await this.findOne(id);
    return this.ventaWithRelatedEntities(venta);
  }

  async update(id: string, updateVentaDto: UpdateVentaDto) {
    const ventaToUpdate = await this.findOne(id);
    const { usuarioId, eventoId, clienteId, ...ventaData } = updateVentaDto;

    if (usuarioId) ventaToUpdate.usuarioId = new ObjectId(usuarioId);
    if (eventoId) ventaToUpdate.eventoId = new ObjectId(eventoId);
    if (clienteId) ventaToUpdate.clienteId = new ObjectId(clienteId);

    Object.assign(ventaToUpdate, ventaData);

    await this.ventaRepository.save(ventaToUpdate);
    return this.ventaWithRelatedEntities(ventaToUpdate);
  }

  async remove(id: string) {
    return this.ventaRepository.delete(id);
  }

  private async ventaWithRelatedEntities(
    venta: Venta,
    usuario?: Usuario,
    evento?: any,
    cliente?: Cliente,
  ) {
    const { usuarioId, eventoId, clienteId, ..._venta } = venta;
    const usuarioDetail =
      usuario ?? (await this.usuarioService.findOne(usuarioId.toString()));
    const eventoDetail =
      evento ??
      (await this.eventoService.findOneWithCategoria(eventoId.toString()));
    const clienteDetail =
      cliente ?? (await this.clienteService.findOne(clienteId.toString()));

    return {
      ..._venta,
      usuario: usuarioDetail,
      evento: eventoDetail,
      cliente: clienteDetail,
    };
  }
}
