import { Controller, Get } from '@nestjs/common';
import { PokemonService } from './pokemon.service';

@Controller('pokemons')
export class PokemonController {
  constructor(private pokemonService: PokemonService) {}
  @Get()
  findAll() {
    return this.pokemonService.findAll();
  }

  @Get('upload')
  upload() {
    return this.pokemonService.readExcelFile('../Pokemon Go.xlsx');
  }
}
