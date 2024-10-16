import { Controller, Post, Body, Request } from '@nestjs/common';
import { AuthService } from './auth.service';
import { Public } from './decorators/public.decorator';
import { RegisterDto } from './dto/register.dto';

@Controller()
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Public()
  @Post('signin')
  async login(@Request() req) {
    return this.authService.login(req.user);
  }

  // @Public()
  // @Post('signup')
  // async register(
  //   @Body('email') email: string,
  //   @Body('password') password: string,
  //   @Body('nombre') nombre: string,
  // ) {
  //   return this.authService.register(email, password, nombre);
  // }

  @Public()
  @Post('signup')
  register(@Body() registerDto: RegisterDto) {
    console.log('Register DTO:', registerDto);
    return this.authService.register(registerDto);
  }
}
