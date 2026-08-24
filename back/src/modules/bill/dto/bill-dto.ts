import { Type } from "class-transformer";
import { IsBoolean, IsDate, IsNotEmpty, IsNumber, IsOptional } from "class-validator";

export class BillDto {

    @IsNumber()
    @IsNotEmpty()
    id!: number;

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