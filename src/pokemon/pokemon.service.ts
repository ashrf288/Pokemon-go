import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class PokemonService {
  constructor(private prisma: PrismaService) {}

  async findAll() {
    return await this.prisma.pokemon.findMany();
  }

  async findOne(id: number) {
    return await this.prisma.pokemon.findUnique({
      where: {
        id,
      },
    });
  }

  async create(dto: any) {
    return await this.prisma.pokemon.create({
      data: dto,
    });
  }

  async update(id: number, dto: any) {
    return await this.prisma.pokemon.update({
      where: {
        id,
      },
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
}
