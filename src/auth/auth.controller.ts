import { Body, Controller, Post, HttpCode, HttpStatus, Request } from '@nestjs/common';
import { AuthService } from './auth.service';
import { Public } from './public.decorator';
import { CreateUserDto } from 'src/users/dto/create-user.dto';
import { LoginDto } from './dto/login.dto';
import { ApiTags, ApiOperation, ApiBody, ApiResponse, ApiUnauthorizedResponse } from '@nestjs/swagger';
import { ResponseMessage } from 'src/response-message.decorator';

@ApiTags('Authentication')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Public()
  @HttpCode(HttpStatus.OK)
  @Post('login')
  @ResponseMessage('Login successful')
  @ApiOperation({ summary: 'Log in and receive a JWT access token' })
  @ApiBody({ type: LoginDto })
  @ApiResponse({
    status: 200,
    description: 'Login successful',
    schema: { example: { access_token: 'eyJhbGciOiJIUzI1NiIs...' } },
  })
  @ApiUnauthorizedResponse({ description: 'Invalid username or password' })
  signIn(@Body() signInDto: LoginDto) {
    return this.authService.signIn(signInDto.username, signInDto.password);
  }

  @Public()
  @Post('register')
  @ResponseMessage('User registered successfully')
  @ApiOperation({ summary: 'Register a new user (defaults to the "user" role)' })
  @ApiBody({ type: CreateUserDto })
  @ApiResponse({ status: 201, description: 'User registered successfully' })
  @ApiResponse({ status: 400, description: 'Username already exists or validation failed' })
  signUp(@Body() dto : CreateUserDto) {
    return this.authService.signUp(dto);
  }

}
