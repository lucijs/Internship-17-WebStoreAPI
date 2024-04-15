import { ApiProperty } from "@nestjs/swagger";
import { IsInt } from "class-validator";

export class CreateWishlistDto {
    @ApiProperty()
    @IsInt()
    userId:number;

    @ApiProperty()
    @IsInt()
    productId:number;
}