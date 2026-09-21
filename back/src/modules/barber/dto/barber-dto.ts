import { IsBoolean, IsNotEmpty, IsNumber, IsOptional, IsString } from "class-validator";

export class BarberDto {

    @IsString()
    @IsNotEmpty()
    dni!: string;

    @IsString()
    @IsNotEmpty()
    name!: string;

    @IsOptional()
    @IsBoolean()
    deleted?: boolean;
}