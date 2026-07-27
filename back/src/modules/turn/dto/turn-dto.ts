import { Type } from "class-transformer";
import { IsBoolean, isDate, IsDate, IsNotEmpty, IsNumber, IsOptional, IsPositive } from "class-validator";

export class TurnDto {

  @IsNumber()
  @IsNotEmpty()
  @IsOptional()
  id!: number;

  @IsNotEmpty()
  @Type(() => Date)
  @IsDate()
  date!: Date;

  @IsNotEmpty()
  @IsBoolean()
  status!: boolean;

  @IsBoolean()
  @IsOptional()
  deleted?: boolean;
}