import {
  Controller,
  Get,
  Query,
  Param,
  Body,
  ParseIntPipe,
  Post,
  Patch,
  Delete,
  UseGuards,
} from '@nestjs/common';
import { PokemonService } from './pokemon.service';
import { PaginationDto } from '../dto/pagination.dto';
import { PokemonUpdateCreateDto } from './dto';
import { AuthGuard } from '../auth/auth.guard';

@Controller('pokemons')
export class PokemonController {
  constructor(private pokemonService: PokemonService) {}
  @Get()
  async findAll(
    @Query('page') page: number,
    @Query('pageSize') pageSize: number,
    @Query('name') name: string,
    @Query('generation') generation: number,
    @Query('evolutionStage') evolutionStage: string,
  ) {
    if (page === undefined) {
      page = 1; // Set default value
    }

    if (pageSize === undefined) {
      pageSize = 10; // Set default value
    }
    const paginationDto: PaginationDto = {
      page,
      pageSize,
      name,
      generation,
      evolutionStage,
    };
    return this.pokemonService.findAll(paginationDto);
  }

  @Get('upload')
  upload() {
    return this.pokemonService.readExcelFile('../Pokemon Go.xlsx');
  }

  // get pokemon by id
  @Get(':id')
  async findOne(@Param('id', ParseIntPipe) id: number) {
    return await this.pokemonService.findOne(id);
  }

  // update pokemon by id
  @Patch(':id')
  async update(
    @Param('id', ParseIntPipe) id: number,
    @Body() dto: PokemonUpdateCreateDto,
  ) {
    return await this.pokemonService.update(id, dto);
  }

  // delete pokemon by id
  @Delete(':id')
  @UseGuards(AuthGuard)
  async delete(@Param('id', ParseIntPipe) id: number) {
    return await this.pokemonService.delete(id);
  }

  // add pokemon
  @Post('add')
  async add(@Body() dto: PokemonUpdateCreateDto) {
    return await this.pokemonService.add(dto);
  }
}
