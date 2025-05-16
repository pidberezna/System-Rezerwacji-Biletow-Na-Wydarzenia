import { IsString, IsNumber, IsOptional } from 'class-validator';

export class BookingDto {
  @IsString()
  @IsOptional()
  date: string;

  @IsString()
  @IsOptional()
  time: string;

  @IsNumber()
  numberOfGuests: number;

  @IsString()
  name: string;

  @IsString()
  email: string;

  @IsString()
  phone: string;

  @IsNumber()
  price: number;
}
