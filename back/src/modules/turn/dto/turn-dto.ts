import { Type } from "class-transformer";
import { IsBoolean, IsDate, IsNotEmpty, IsNumber, IsOptional, IsString } from "class-validator";

export class TurnDto {

  @IsNumber()
  @IsNotEmpty()
  @IsOptional()
  id!: number;

  @IsString()
  @IsNotEmpty()
  dniC!: string;

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