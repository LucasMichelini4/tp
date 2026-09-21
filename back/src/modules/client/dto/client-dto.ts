import { IsBoolean, IsEmail, IsNotEmpty, IsNumber, IsOptional, IsString, } from 'class-validator';

export class ClientDto {
  @IsString()
  @IsNotEmpty()
  dni!: string;

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
