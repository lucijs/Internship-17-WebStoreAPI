import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsMobilePhone, IsNumber, IsString } from 'class-validator';

export class RegisterDto {
  @ApiProperty()
  @IsString()
  username: string;

  @ApiProperty()
  @IsString()
  password: string;

  @ApiProperty()
  @IsEmail()
  email: string;

  @ApiProperty()
  @IsString()
  firstName: string;

  @ApiProperty()
  @IsString()
  lastName: string;

  @ApiProperty()
  @IsString()
  cityAdress: string;

  @ApiProperty()
  @IsString()
  streetAdress: string;

  @ApiProperty()
  @IsString()
  numberAdress: string;

  @ApiProperty()
  @IsMobilePhone()
  phone: string;

  @ApiProperty({ default: false })
  isAdmin?: boolean;
}