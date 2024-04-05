import { ApiProperty } from "@nestjs/swagger";
import { History } from "@prisma/client";

export class HistoryEntity implements History {
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
