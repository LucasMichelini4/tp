import { IsBoolean, IsNotEmpty, isNumber, IsNumber, IsOptional, IsString } from "class-validator";

export class NameTypeDto {
  @IsNumber()
  @IsNotEmpty()
  id!: number;

  @IsString()
  @IsNotEmpty()
  description!: string;

  @IsNumber()
  @IsNotEmpty()
  price!: number;

  @IsNumber()
  @IsNotEmpty()
  duration!: number;

  @IsOptional()
  @IsBoolean()
  deleted?: boolean;
}