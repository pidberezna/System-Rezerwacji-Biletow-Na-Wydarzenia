import { IsString, IsNumber, IsArray, IsOptional } from 'class-validator';

export class EventDto {
  @IsString()
  title: string;

  @IsString()
  address: string;

  @IsArray()
  photos: string[];

  @IsString()
  description: string;

  @IsString()
  @IsOptional()
  extraInfo: string;

  @IsString()
  date: string;

  @IsString()
  time: string;

  @IsNumber()
  price: number;
}
