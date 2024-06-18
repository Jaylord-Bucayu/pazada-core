import { Controller,Post,Body,  Get, UseGuards, Req, Res, HttpStatus } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginDto } from './dto/login.dto';
import { RegisterDto } from './dto/register.dto';
import { GoogleAuthGuard } from 'src/common/guards/google.guard';
import { Response } from 'express';
import { AuthGuard } from '@nestjs/passport';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  //AUTH
  @Post('login')
  login(@Body() body: LoginDto){
    
    return this.authService.login(body)
  }

  @UseGuards(GoogleAuthGuard)
  @Get('google/callback')
  async googleAuthCallback(@Req() req, @Res() res: Response) {
    const token = await this.authService.login(req.user);

    res.cookie('access_token', token, {
      maxAge: 2592000000,
      sameSite: true,
      secure: false,
    });

    return res.status(HttpStatus.OK);
  }

  @UseGuards(GoogleAuthGuard)
  @Get('google/redirect')
  googleRedirect(){
    return 'google redirect'
  }


  @Get("facebook")
  @UseGuards(AuthGuard("facebook"))
  async facebookLogin(): Promise<any> {
    return HttpStatus.OK;
  }

  @UseGuards(AuthGuard("facebook"))
  @Get('facebook/callback')
  async facebookAuthCallback(){
    return 'google redirect'
  }


  @Post('register')
  register(@Body() body: RegisterDto){
    return this.authService.register(body)
    
  }

  @Post('forgot-password')
  forgotPassword(){
    
  }

  @Post('reset-password')
  resetPassword(){
    
  }

}
