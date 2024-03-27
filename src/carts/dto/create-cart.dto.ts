import { ApiProperty } from "@nestjs/swagger";

export class CreateCartDto {
    @ApiProperty()
    userId:number;

    @ApiProperty()
    productId:number;

    @ApiProperty({default: 1})
    amount: number;

}
