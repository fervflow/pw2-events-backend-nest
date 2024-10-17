import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UsuarioService } from '../usuario/usuario.service';
import * as bcrypt from 'bcryptjs';
import { Usuario } from '../usuario/entities/usuario.entity';
// import { CreateUsuarioDto } from 'src/usuario/dto/create-usuario.dto';

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
    const payload = { email: user.email, sub: user._id };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }

  // Registrarse
  async signup(email: string, password: string, nombre: string) {
    const salt = await bcrypt.genSalt();
    const hashedPassword = await bcrypt.hash(password, salt);
    console.log('From AUTH SERVICE:\nemail:', email);
    console.log('password:', password);
    console.log('nombre:', nombre);
    return this.usuarioService.create({
      email,
      password: hashedPassword,
      nombre,
    });
  }
  // async register(usuarioDto: CreateUsuarioDto): Promise<Usuario> {
  //   // const newUser = this.usuarioService.create({
  //   //   ...registerDto,
  //   //   id: uuidv4(),
  //   // });
  //   // return newUser;
  //   const newUser = await this.usuarioService.create(usuarioDto);
  //   return newUser;
  // }
}
