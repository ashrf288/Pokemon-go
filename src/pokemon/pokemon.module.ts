import { Module } from '@nestjs/common';
import { PrismaModule } from '../prisma/prisma.module';
import { PokemonService } from './pokemon.service';
import { FilteringService } from './filtering.service';
import { PokemonController } from './pokemon.controller';
import { AuthModule } from 'src/auth/auth.module';
import { AuthService } from 'src/auth/auth.service';
import { ConfigService } from '@nestjs/config';
@Module({
  imports: [PrismaModule, AuthModule],
  controllers: [PokemonController],
  providers: [PokemonService, FilteringService, AuthService, ConfigService],
})
export class PokemonModule {}
