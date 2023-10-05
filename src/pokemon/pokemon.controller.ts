import { Controller, Get, Query, ParseIntPipe } from '@nestjs/common';
import { PokemonService } from './pokemon.service';
import { PaginationDto } from '../dto/pagination.dto';

@Controller('pokemons')
export class PokemonController {
  constructor(private pokemonService: PokemonService) {}
  @Get()
  async findAll(
    @Query('page', ParseIntPipe) page: number,
    @Query('pageSize', ParseIntPipe) pageSize: number,
  ) {
    if (page === undefined) {
      page = 1; // Set default value
    }

    if (pageSize === undefined) {
      pageSize = 10; // Set default value
    }
    const paginationDto: PaginationDto = { page, pageSize };
    return this.pokemonService.findAll(paginationDto);
  }

  @Get('upload')
  upload() {
    return this.pokemonService.readExcelFile('../Pokemon Go.xlsx');
  }
}
