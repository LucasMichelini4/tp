import { IsBoolean, IsNotEmpty, IsNumber, IsOptional, IsString } from "class-validator";

export class BarberDto {

    @IsNumber()
    @IsNotEmpty()
    dni!: number;

    @IsString()
    @IsNotEmpty()
    name!: string;

    @IsOptional()
    @IsBoolean()
    deleted?: boolean;
}