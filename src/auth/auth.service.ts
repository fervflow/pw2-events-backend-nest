import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UsuarioService } from '../usuario/usuario.service';
import * as bcrypt from 'bcryptjs';
import { Usuario } from '../usuario/entities/usuario.entity';
import { RegisterDto } from './dto/register.dto';
// import { v4 as uuidv4 } from 'uuid';

@Injectable()
export class AuthService {
  constructor(
    private readonly usuarioService: UsuarioService,
    private readonly jwtService: JwtService,
  ) {}

  async validateUser(email: string, password: string): Promise<Usuario | null> {
    const user = await this.usuarioService.findByEmail(email);
    if (user && (await bcrypt.compare(password, user.password))) {
      return user;
    }
    return null;
  }

  // Generates JWT if the user is valid
  async login(user: Usuario) {
    const payload = { email: user.email, sub: user.id };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }

  // Registrarse
  // async register(email: string, password: string, nombre: string, id?: string) {
  //   const salt = await bcrypt.genSalt();
  //   const hashedPassword = await bcrypt.hash(password, salt);
  //   return this.usuarioService.create({
  //     id,
  //     email,
  //     password: hashedPassword,
  //     nombre,
  //   });
  // }
  async register(registerDto: RegisterDto): Promise<Usuario> {
    // const newUser = this.usuarioService.create({
    //   ...registerDto,
    //   id: uuidv4(),
    // });
    // return newUser;
    const newUser = await this.usuarioService.create(registerDto);
    return newUser;
  }
}
