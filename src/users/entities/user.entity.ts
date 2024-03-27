import { ApiProperty } from "@nestjs/swagger";
import { User } from "@prisma/client";

export class UserEntity implements User {
    @ApiProperty()
    id: number;

    @ApiProperty()
    username: string;

    @ApiProperty()
    email: string;

    @ApiProperty()
    password: string;

    @ApiProperty()
    firstName: string;

    @ApiProperty()
    lastName: string;

    @ApiProperty()
    cityAdress: string;

    @ApiProperty()
    streetAdress: string;

    @ApiProperty()
    numberAdress: string;

    @ApiProperty()
    phone: string;

    @ApiProperty()
    isAdmin: boolean;
}
