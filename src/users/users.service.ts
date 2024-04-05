import {
  BadRequestException,
  ForbiddenException,
  Injectable,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { compare, hash } from 'bcrypt';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

@Injectable()
export class UsersService {
  constructor(private prisma: PrismaService, private readonly jwtService: JwtService,){}

  async register(username: string, password: string,email:string, firstName:string, lastName:string,cityAdress:string, streetAdress:string,numberAdress:string,phone:string) {
    const existingUser = await this.prisma.user.findUnique({
      where: {
        username,
      },
    });

    if (existingUser) {
      throw new BadRequestException('User already exists');
    }

    const hashedPassword = await hash(password, 10);

    const user = await this.prisma.user.create({
      data: {
        password: hashedPassword,
        username,
        email,
        firstName,
        lastName,
        cityAdress,
        streetAdress,
        numberAdress,
        phone
      },
    });

    const payload = {
      id: user.id,
      username: user.username,
      role: 'user',
    };

    return {
      token: this.jwtService.sign(payload),
    };
  }

  async login(username: string, password: string) {
    const user = await this.prisma.user.findUnique({
      where: {
        username,
      },
    });

    if (!user) {
      throw new BadRequestException('User does not exist');
    }

    const isPasswordValid = await compare(password, user.password);

    if (!isPasswordValid) {
      throw new ForbiddenException('Password not valid');
    }

    const payload = {
      id: user.id,
      email: user.email,
      role: user.isAdmin ? 'admin' : 'user',
    };

    return {
      token: this.jwtService.sign(payload),
    };
  }

  create(createUserDto: CreateUserDto) {
    return this.prisma.user.create({data: createUserDto});
  }

  findAll() {
    return this.prisma.user.findMany();
  }

  findOne(id: number) {
    return this.prisma.user.findUnique({where:{id}});
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    return this.prisma.user.update({where:{id}, data: updateUserDto})
  }

  remove(id: number) {
    return  this.prisma.user.delete({where:{id}});
  }
}
