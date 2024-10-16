import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Usuario } from './entities/usuario.entity';
import { CreateUsuarioDto } from './dto/create-usuario.dto';
import { v4 as uuidv4 } from 'uuid';

@Injectable()
export class UsuarioService {
  constructor(
    @InjectRepository(Usuario)
    private readonly usuarioRepository: Repository<Usuario>,
  ) {}

  async findAll(): Promise<Usuario[]> {
    return this.usuarioRepository.find();
  }

  async create(usuario: CreateUsuarioDto): Promise<Usuario> {
    const user = this.usuarioRepository.create(usuario);
    if (!user.id) {
      user.id = uuidv4();
    }
    // const createdUser = {id: usuario.id, ...usuario};
    return this.usuarioRepository.save(user);
  }

  async findOne(id: string): Promise<Usuario> {
    return this.usuarioRepository.findOneBy({ id });
  }

  async findByEmail(email: string): Promise<Usuario> {
    return this.usuarioRepository.findOneBy({ email });
  }

  async update(id: string, usuario: Partial<Usuario>): Promise<Usuario> {
    await this.usuarioRepository.update(id, usuario);
    return this.findOne(id);
  }

  async remove(id: string): Promise<void> {
    await this.usuarioRepository.delete(id);
  }
}
