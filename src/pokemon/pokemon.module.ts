import { Module } from '@nestjs/common';
import { PrismaModule } from '../prisma/prisma.module';
import { PokemonService } from './pokemon.service';
import { PokemonController } from './pokemon.controller';

@Module({
  imports: [PrismaModule],
  controllers: [PokemonController],
  providers: [PokemonService],
})
export class PokemonModule {}
