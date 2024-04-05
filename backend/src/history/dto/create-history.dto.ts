import { ApiProperty } from "@nestjs/swagger";

export class CreateHistoryDto {
    @ApiProperty()
    userId:number;

    @ApiProperty()
    productId:number;

    @ApiProperty({default: 1})
    amount: number;
}
