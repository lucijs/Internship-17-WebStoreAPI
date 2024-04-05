import { ApiProperty } from "@nestjs/swagger";
import { Decimal } from "@prisma/client/runtime/library";
import { IsDecimal, IsInt, IsOptional, IsString } from "class-validator";

export class CreateProductDto {
  @ApiProperty()
  @IsString()
  title:string;

  @ApiProperty()
  @IsDecimal()
  price: Decimal;

  @ApiProperty()
  @IsString()
  description:string;

  @ApiProperty({required:false})
  @IsString()
  @IsOptional()
  image:string; 

  @ApiProperty()
  @IsInt()
  categoryId: number;
}