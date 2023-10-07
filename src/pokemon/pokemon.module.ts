import { Module } from '@nestjs/common';
import { PrismaModule } from '../prisma/prisma.module';
import { PokemonService } from './pokemon.service';
import { FilteringService } from './filtering.service';
import { PokemonController } from './pokemon.controller';
import { AuthModule } from '../auth/auth.module';
import { AuthService } from '../auth/auth.service';
import { ConfigService } from '@nestjs/config';
@Module({
  imports: [PrismaModule, AuthModule],
  controllers: [PokemonController],
  providers: [PokemonService, FilteringService, AuthService, ConfigService],
})
export class PokemonModule {}
