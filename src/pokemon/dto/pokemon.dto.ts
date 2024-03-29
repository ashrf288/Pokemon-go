import { IsString, IsOptional, IsInt } from 'class-validator';
import { Transform } from 'class-transformer';

export class PokemonDto {
  @IsString()
  name: string;
  img: string;
  generation: number;
  evolutionStage: string;
  evolved: number;
  familyId: number;
  crossGen: number;
  type1: string;
  type2: string;
  weather1: string;
  weather2: string;
  statTotal: number;
  atk: number;
  def: number;
  sta: number;
  legendary: number;
  aquireable: number;
  spawns: number;
  regional: number;
  raidable: number;
  hatchable: number;
  shiny: number;
  nest: number;
  new: number;
  notGettable: number;
  futureEvolve: number;
  cp40: number;
  cp39: number;
}

export class PokemonListDto {
  id: number;
  name: string;
  img: string;
  generation: number;
  evolutionStage: string;
}

export class PokemonUpdateCreateDto {
  id: number;
  createdAt: Date;
  updatedAt: Date;
  name: string;
  img: string;
  generation: number;
  evolutionStage: string;
  evolved: number;
  familyId: number;
  crossGen: number;
  type1: string;
  type2: string;
  weather1: string;
  weather2: string;
  statTotal: number;
  atk: number;
  def: number;
  sta: number;
  legendary: number;
  aquireable: number;
  spawns: number;
  regional: number;
  raidable: number;
  hatchable: number;
  shiny: number;
  nest: number;
  new: number;
  notGettable: number;
  futureEvolve: number;
  cp40: number;
  cp39: number;
}

export class PokemonQueryDto {
  @IsOptional()
  @Transform(({ value }) => {
    console.log('value', value);
    return parseInt(value, 10);
  })
  @IsInt()
  page: number;

  @IsOptional()
  @Transform(({ value }) => parseInt(value, 10))
  @IsInt()
  pageSize: number;

  name: string;
  @Transform(({ value }) => parseInt(value, 10))
  generation: number;
  evolutionStage: string;
}
