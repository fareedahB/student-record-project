import { Injectable, UnauthorizedException, BadRequestException} from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { User } from 'src/users/user.entity';
import { CreateUserDto } from 'src/users/create-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User)
    private readonly userRepo: Repository<User>,
    private usersService: UsersService,
    private jwtService: JwtService,
    
  ) {}
  
  async signUp(dto: CreateUserDto) : Promise<Omit<User, 'password'>>{
    const existingUser = await this.userRepo.findOne({ where: { username: dto.username } });
    if (existingUser) {
      throw new BadRequestException('Username already exists');
    }
    const hashedPassword = await bcrypt.hash(dto.password, 10);
    const user = this.userRepo.create({username: dto.username, password: hashedPassword});
    const savedUser = await this.userRepo.save(user);

    const { password, ...result } = savedUser;
    return result;

  }

  async signIn(
    username: string,
    pass: string,
  ): Promise<{ access_token: string }> {
    const user = await this.usersService.findOne(username);
    if (!user) {
      throw new UnauthorizedException("Invalid username");
    }
    const isMatch = await bcrypt.compare(pass, user.password);
    if (!isMatch) {
      throw new UnauthorizedException("Invalid password");
    }
    const payload = { sub: user?.userId, username: user?.username };
    return {
      access_token: await this.jwtService.signAsync(payload),
    };
  }
}

