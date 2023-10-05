import { Controller, Get } from '@nestjs/common';

@Controller('pokemons')
export class PokemonController {
  @Get()
  findAll() {
    return 'This action returns all pokemons';
  }
}
