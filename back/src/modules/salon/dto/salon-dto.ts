import { IsBoolean, IsNotEmpty, IsNumber, IsPositive, IsString } from "class-validator";

export class SalonDto {
  @IsNumber()
  @IsPositive()
  @IsNotEmpty()
  cuit!: number;

  @IsString()
  @IsNotEmpty()
  legalName!: string;

  @IsString()
  @IsNotEmpty()
  address!: string;

  @IsNumber()
  @IsNotEmpty()
  phone!: number;

  @IsNotEmpty()
  @IsBoolean()
  deleted?: boolean;
}