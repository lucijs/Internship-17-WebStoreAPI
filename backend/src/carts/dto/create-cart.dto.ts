import { ApiProperty } from "@nestjs/swagger";
import { IsInt } from "class-validator";

export class CreateCartDto {
    @ApiProperty()
    @IsInt()
    userId:number;

    @ApiProperty()
    @IsInt()
    productId:number;

    @ApiProperty({default: 1})
    @IsInt()
    amount: number;
}