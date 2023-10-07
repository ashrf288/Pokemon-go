import { Injectable, OnApplicationBootstrap } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import * as XLSX from 'xlsx';
import * as fs from 'fs';
import { PokemonDto } from './dto/pokemon.dto';
import { PaginationDto } from '../dto/pagination.dto';
import { PokemonUpdateCreateDto } from './dto';
import { FilteringService } from './filtering.service';

@Injectable()
export class PokemonService implements OnApplicationBootstrap {
  constructor(
    private prisma: PrismaService,
    private filter: FilteringService,
  ) {}

  // call the upload function on app start
  async onApplicationBootstrap() {
    await this.readExcelFile('./Pokemon Go.xlsx');
  }

  async findAll(paginationDto: PaginationDto) {
    const { page, pageSize } = paginationDto;
    const { query } = await this.filter.filterPokemons(paginationDto);
    const where = query;
    const skip = (page - 1) * pageSize;
    const take = pageSize;
    const pokemonList = await this.prisma.pokemon.findMany({
      take,
      skip,
      select: {
        id: true,
        name: true,
        img: true,
        generation: true,
        evolutionStage: true,
      },
      where,
    });
    return {
      page,
      pageSize,
      data: pokemonList,
    };
  }

  async findOne(id: number): Promise<PokemonDto> {
    return await this.prisma.pokemon.findUnique({
      where: {
        id,
      },
    });
  }

  async update(id: number, dto: PokemonUpdateCreateDto) {
    return await this.prisma.pokemon.update({
      where: {
        id,
      },
      data: dto,
    });
  }

  async add(dto: PokemonDto) {
    return await this.prisma.pokemon.create({
      data: dto,
    });
  }

  async delete(id: number) {
    return await this.prisma.pokemon.delete({
      where: {
        id,
      },
    });
  }

  // read excel file and return json data
  async readExcelFile(filePath) {
    try {
      // Read the file contents from the provided file path
      const fileContents = fs.readFileSync(filePath);

      // Parse the file contents using XLSX
      const workbook = XLSX.read(fileContents);
      const sheet_name_list = workbook.SheetNames;
      const xlData = XLSX.utils.sheet_to_json(
        workbook.Sheets[sheet_name_list[0]],
      );

      // loop through the data and create a new object for each row
      const data = xlData.map((row) => ({
        name: row['Name'],
        img: row['Img name'].toString(),
        generation: row['Generation'],
        evolutionStage: row['Evolution Stage']
          ? row['Evolution Stage'].toString()
          : '',
        evolved: row['Evolved'],
        familyId: row['FamilyID'],
        crossGen: row['Cross Gen'],
        type1: row['Type 1'],
        type2: row['Type 2'],
        weather1: row['Weather 1'],
        weather2: row['Weather 2'],
        statTotal: row['STAT TOTAL'],
        atk: row['ATK'],
        def: row['DEF'],
        sta: row['STA'],
        legendary: row['Legendary'],
        aquireable: row['Aquireable'],
        spawns: row['Spawns'],
        regional: row['Regional'],
        raidable: row['Raidable'],
        hatchable: row['Hatchable'],
        shiny: row['Shiny'],
        nest: row['Nest'],
        new: row['New'],
        notGettable: row['Not-Gettable'],
        futureEvolve: row['Future Evolve'],
        cp40: row['100% CP @ 40'],
        cp39: row['100% CP @ 39'],
      }));
      // add the data to the database
      await this.prisma.pokemon.createMany({
        data,
        skipDuplicates: true,
      });

      return { message: ' upload successfully' };
    } catch (error) {
      throw error;
    }
  }
}
