import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateClienteDto } from './dto/create-cliente.dto';
import { UpdateClienteDto } from './dto/update-cliente.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Cliente } from './entities/cliente.entity';
import { Repository } from 'typeorm';
import { ObjectId } from 'mongodb';

@Injectable()
export class ClienteService {
  constructor(
    @InjectRepository(Cliente)
    private readonly clienteRepo: Repository<Cliente>,
  ) {}
  async create(createClienteDto: CreateClienteDto) {
    const newCliente = await this.clienteRepo.save(createClienteDto);
    console.log('Created Cliente:', newCliente);
    return newCliente;
  }

  async findAll() {
    return this.clienteRepo.find();
  }

  async findOne(id: string) {
    const cliente = await this.clienteRepo.findOneBy({ _id: new ObjectId(id) });
    if (!cliente) {
      throw new NotFoundException(`Cliente with id: ${id} not found`);
    }
    return cliente;
  }

  async update(id: string, updateClienteDto: UpdateClienteDto) {
    const cliente = await this.findOne(id);
    Object.assign(cliente, updateClienteDto);
    return this.clienteRepo.save(cliente);
  }

  async remove(id: string) {
    return this.clienteRepo.delete(id);
  }
}
