import { Type } from "class-transformer";
import { IsBoolean, IsDate, IsNotEmpty, IsNumber, IsOptional, IsString } from "class-validator";

export class BillDto {

    @IsNumber()
    @IsNotEmpty()
    id!: number;

    @IsString()
    @IsNotEmpty()
    dniC!: string

    @IsNotEmpty()
    @Type(() => Date)
    @IsDate()
    date!: Date;

    @IsNotEmpty()
    @IsNumber()
    total!: number;

    @IsOptional()
    @IsBoolean()
    deleted?: boolean;
}