import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';
import { PokemonModule } from './pokemon/pokemon.module';
import { PrismaModule } from './prisma/prisma.module';

@Module({
  imports: [UserModule, PokemonModule, PrismaModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
