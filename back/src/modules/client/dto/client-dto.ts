import { IsBoolean, IsEmail, IsNotEmpty, IsNumber, IsOptional, IsPositive, IsString, } from 'class-validator';

export class ClientDto {
  @IsNumber()
  @IsNotEmpty()
  dni!: number;

  @IsString()
  @IsNotEmpty()
  name!: string;

  @IsString()
  @IsNotEmpty()
  surname!: string;

  @IsEmail()
  @IsNotEmpty()
  email!: string;

  @IsString()
  @IsNotEmpty()
  phone!: string;

  @IsOptional()
  @IsBoolean()
  deleted?: boolean;
}
