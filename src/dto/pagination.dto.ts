import { IsInt, IsPositive, IsOptional, IsString } from 'class-validator';

export class PaginationDto {
  @IsOptional()
  @IsInt()
  @IsPositive()
  page: number = 1;

  @IsOptional()
  @IsInt()
  @IsPositive()
  pageSize: number = 10;

  @IsOptional()
  @IsString()
  name?: string;

  @IsOptional()
  @IsString()
  generation?: number;

  @IsOptional()
  @IsString()
  evolutionStage?: string;
}
