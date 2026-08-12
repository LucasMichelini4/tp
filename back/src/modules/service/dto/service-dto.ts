import { IsBoolean, IsNotEmpty, IsNumber, IsOptional, IsString } from "class-validator";

export class ServiceDto {

    @IsNumber()
    @IsNotEmpty()
    id!: number;

    @IsString()
    @IsNotEmpty()
    name!: string;

    @IsOptional()
    @IsBoolean()
    deleted?: boolean;
}