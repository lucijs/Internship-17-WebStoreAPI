import { ApiProperty } from "@nestjs/swagger";
import { Wishlist } from "@prisma/client";

export class WishlistEntity implements Wishlist {
    @ApiProperty()
    id: number;

    @ApiProperty()
    userId:number;

    @ApiProperty()
    productId:number;

    @ApiProperty()
    dateCreated: Date;
}