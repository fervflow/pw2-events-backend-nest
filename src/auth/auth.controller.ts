import { Controller, Post, Body, Request, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { Public } from './decorators/public.decorator';
import { LocalAuthGuard } from './local-auth.guard';
// import { CreateUsuarioDto } from 'src/usuario/dto/create-usuario.dto';

@Controller()
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Public()
  @UseGuards(LocalAuthGuard)
  @Post('login')
  async login(@Request() req) {
    console.log('From AUTH CONTROLLER: ', req.user);
    return this.authService.login(req.user);
  }

  @Public()
  @Post('signup')
  async signup(
    @Body('email') email: string,
    @Body('password') password: string,
    @Body('nombre') nombre: string,
  ) {
    return this.authService.signup(email, password, nombre);
  }

  // @Public()
  // @Post('signup')
  // register(@Body() createUsuarioDto: CreateUsuarioDto) {
  //   console.log('Register DTO:', createUsuarioDto);
  //   return this.authService.register(createUsuarioDto);
  // }
}
