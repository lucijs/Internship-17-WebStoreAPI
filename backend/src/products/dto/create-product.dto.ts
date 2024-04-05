import { ApiProperty } from "@nestjs/swagger";
import { Decimal } from "@prisma/client/runtime/library";

export class CreateProductDto {
  @ApiProperty()
  title:string;

  @ApiProperty()
  price: Decimal;

  @ApiProperty()
  description:string;

  @ApiProperty({required:false})
  image:string; 

  @ApiProperty()
  categoryId: number;
}