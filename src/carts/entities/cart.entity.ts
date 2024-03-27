import { ApiProperty } from "@nestjs/swagger";
import { Cart } from "@prisma/client";

export class CartEntity implements Cart {
    @ApiProperty()
    id: number;

    @ApiProperty()
    userId:number;

    @ApiProperty()
    productId:number;

    @ApiProperty()
    amount: number;

    @ApiProperty()
    dateCreated: Date;
}

