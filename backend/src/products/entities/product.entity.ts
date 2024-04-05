import { ApiProperty } from "@nestjs/swagger";
import { Product } from "@prisma/client";
import { Decimal } from "@prisma/client/runtime/library";

export class ProductEntity implements Product {
    @ApiProperty()
    id: number;

    @ApiProperty()
    title:string;

    @ApiProperty()
    price: Decimal;

    @ApiProperty()
    description:string;

    @ApiProperty({required:false, nullable:true})
    image:string | null; 

    @ApiProperty()
    categoryId: number;
}