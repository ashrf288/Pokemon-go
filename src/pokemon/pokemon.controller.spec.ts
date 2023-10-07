import { Test, TestingModule } from '@nestjs/testing';
import { AuthController } from '../auth/auth.controller';
import { AuthService } from '../auth/auth.controller';
import { AuthDto } from '../auth/dto/auth.dto';
import { ConfigModule } from '@nestjs/config';
import { PrismaModule } from '../prisma/prisma.module';
import { AuthGuard, RolesGuard } from '../auth/auth.guard';
import { PrismaService } from '../prisma/prisma.service';
import { PokemonController } from './pokemon.controller';
import { PokemonService } from './pokemon.service';
import { FilteringService } from './filtering.service';
import { PaginationDto } from '../dto/pagination.dto';
import { PokemonUpdateCreateDto } from './dto/pokemon.dto';
import { PokemonDto } from './dto';
import { PokemonModule } from './pokemon.module';
import { ExecutionContext } from '@nestjs/common';

describe('pokemon app test', () => {
  let authController: AuthController;
  let authService: AuthService;
  let pokemonController: PokemonController;
  let pokemonService: PokemonService;
  let filteringService: FilteringService;
  let authGuard: AuthGuard;
  let rolesGuard: RolesGuard;
  let user_token = '';
  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [ConfigModule.forRoot(), PrismaModule],
      controllers: [PokemonController, AuthController],
      providers: [
        AuthGuard,
        RolesGuard,
        PrismaService,
        AuthService,
        PokemonService,
        FilteringService,
      ],
    }).compile();
    authController = module.get<AuthController>(AuthController);
    authService = module.get<AuthService>(AuthService);
    pokemonController = module.get<PokemonController>(PokemonController);
    pokemonService = module.get<PokemonService>(PokemonService);
    filteringService = module.get<FilteringService>(FilteringService);
    authGuard = module.get<AuthGuard>(AuthGuard);
    rolesGuard = module.get<RolesGuard>(RolesGuard);
    const authDto: AuthDto = {
      email: 'test@test.com',
      password: '12345678',
      name: 'test',
    };
    const currentDate = new Date();
    const expectedUser = {
      id: 1,
      email: 'test@test.com',
      password: '12345678',
      name: 'test',
      createdAt: currentDate,
      updatedAt: currentDate,
      isAdmin: false,
    }; // Define the expected user object here

    jest.spyOn(authService, 'signup').mockResolvedValue(expectedUser);

    await authController.signup(authDto);

    // login the user
    const authDto2: AuthDto = {
      email: 'test@test.com',
      password: '12345678',
    };
    jest
      .spyOn(authService, 'signin')
      .mockResolvedValue({ access_token: 'mockedToken' });

    const result = await authController.signin(authDto2);
    user_token = result.access_token;
  });

  describe('pokemon', () => {
    it('should return a list of pokemon', async () => {
      jest.spyOn(pokemonService, 'findAll').mockResolvedValue({
        page: 1,
        pageSize: 10,
        data: [
          { id: 1, name: 'test', img: '', generation: 1, evolutionStage: '' },
        ],
      });

      const result = await pokemonController.findAll(1, 10, '', 1, '');
      expect(result).toEqual({
        data: [
          { evolutionStage: '', generation: 1, id: 1, img: '', name: 'test' },
        ],
        page: 1,
        pageSize: 10,
      });
    });

    it('should return a pokemon', async () => {
      const expected_pokemon = {
        evolutionStage: '',
        generation: 1,
        id: 1,
        img: '',
        name: 'test',
      };
      const pokemonDto = new PokemonDto();
      Object.assign(pokemonDto, expected_pokemon);
      jest.spyOn(pokemonService, 'findOne').mockResolvedValue(pokemonDto);
      const result = await pokemonController.findOne(1);
      expect(result).toEqual(expected_pokemon);
    });

    it('should create a pokemon', async () => {
      const expected_pokemon = {
        id: 1,
        name: 'Bulbasaur',
        img: '1',
        generation: 1,
        evolutionStage: '1',
        evolved: 0,
        familyId: 1,
        crossGen: 0,
        type1: 'grass',
        type2: 'poison',
        weather1: 'Sunny/clear',
        weather2: 'Cloudy',
        statTotal: 326,
        atk: 118,
        def: 118,
        sta: 90,
        legendary: 0,
        aquireable: 1,
        spawns: 1,
        regional: 0,
        raidable: 0,
        hatchable: 5,
        shiny: 0,
        nest: 1,
        new: 0,
        notGettable: 0,
        futureEvolve: 0,
        cp40: 981,
        cp39: 967,
        createdAt: '2023-10-05T14:14:57.575Z',
        updatedAt: '2023-10-05T14:14:57.575Z',
      };
      const pokemonDto = new PokemonUpdateCreateDto();
      Object.assign(pokemonDto, expected_pokemon);
      jest.spyOn(pokemonService, 'add').mockResolvedValue(pokemonDto);
      const result = await pokemonController.add(pokemonDto);
      expect(result).toEqual(expected_pokemon);
    });
    it('should update a pokemon', async () => {
      const expected_pokemon = {
        id: 1,
        name: 'Bulbasaur',
        img: '1',
        generation: 1,
        evolutionStage: '1',
        evolved: 0,
        familyId: 1,
        crossGen: 0,
        type1: 'grass',
        type2: 'poison',
        weather1: 'Sunny/clear',
        weather2: 'Cloudy',
        statTotal: 326,
        atk: 118,
        def: 118,
        sta: 90,
        legendary: 0,
        aquireable: 1,
        spawns: 1,
        regional: 0,
        raidable: 0,
        hatchable: 5,
        shiny: 0,
        nest: 1,
        new: 0,
        notGettable: 0,
        futureEvolve: 0,
        cp40: 981,
        cp39: 967,
        createdAt: '2023-10-05T14:14:57.575Z',
        updatedAt: '2023-10-05T14:14:57.575Z',
      };
      const pokemonDto = new PokemonUpdateCreateDto();
      Object.assign(pokemonDto, expected_pokemon);
      jest.spyOn(pokemonService, 'update').mockResolvedValue(pokemonDto);
      const result = await pokemonController.update(1, pokemonDto);
      expect(result).toEqual(expected_pokemon);
    });
    it('should delete a pokemon', async () => {
      const expected_pokemon = {
        id: 1,
        name: 'Bulbasaur',
        img: '1',
        generation: 1,
        evolutionStage: '1',
        evolved: 0,
        familyId: 1,
        crossGen: 0,
        type1: 'grass',
        type2: 'poison',
        weather1: 'Sunny/clear',
        weather2: 'Cloudy',
        statTotal: 326,
        atk: 118,
        def: 118,
        sta: 90,
        legendary: 0,
        aquireable: 1,
        spawns: 1,
        regional: 0,
        raidable: 0,
        hatchable: 5,
        shiny: 0,
        nest: 1,
        new: 0,
        notGettable: 0,
        futureEvolve: 0,
        cp40: 981,
        cp39: 967,
        createdAt: '2023-10-05T14:14:57.575Z',
        updatedAt: '2023-10-05T14:14:57.575Z',
      };
      const pokemonDto = new PokemonUpdateCreateDto();
      Object.assign(pokemonDto, expected_pokemon);
      jest.spyOn(pokemonService, 'delete').mockResolvedValue(pokemonDto);
      const result = await pokemonController.delete(1);
      expect(result).toEqual(expected_pokemon);
    });
    it('test FilteringService ', async () => {
      // filterting service takes filters as input and returns a query object
      const filters = {
        name: 'Bulbasaur',
        generation: 1,
        evolutionStage: '1',
      };
      const expected_query = {
        query: {
          name: { contains: 'Bulbasaur', mode: 'insensitive' },
          generation: { equals: 1 },
          evolutionStage: { equals: '1' },
        },
      };

      const result = await filteringService.filterPokemons(filters);
      expect(result).toEqual(expected_query);
    });
    it('test paginationDto', async () => {
      const paginationDto = new PaginationDto();
      paginationDto.page = 1;
      paginationDto.pageSize = 10;
      paginationDto.name = '';
      paginationDto.generation = 1;
      paginationDto.evolutionStage = '';
      expect(paginationDto).toEqual({
        page: 1,
        pageSize: 10,
        name: '',
        generation: 1,
        evolutionStage: '',
      });
    });
    it('test pokemon Module', async () => {
      const pokemonModule = new PokemonModule();
      expect(pokemonModule).toBeDefined();
    });
  });

  it('test pokemon upload contoller', async () => {
    const result = await pokemonController.upload();
    expect(result).toEqual({ message: ' upload successfully' });
  });

  it('test AuthGuard with invalid token', async () => {
    const context = {
      switchToHttp: () => ({
        getRequest: () => ({
          headers: {
            authorization: `Bearer ${user_token}1`,
          },
        }),
      }),
    };
    try {
      await authGuard.canActivate(context as ExecutionContext);
    } catch (error) {
      expect(error.message).toEqual('this token is not valid or has expired');
    }
  });

  it('test AuthGuard with no token', async () => {
    const context = {
      switchToHttp: () => ({
        getRequest: () => ({
          headers: {},
        }),
      }),
    };
    try {
      await authGuard.canActivate(context as ExecutionContext);
    } catch (error) {
      expect(error.message).toEqual(
        'please provide a valid token in the authorization header',
      );
    }
  });
  it('test RolesGuard', async () => {
    const context = {
      switchToHttp: () => ({
        getRequest: () => ({
          headers: {},
        }),
      }),
    };
    try {
      await rolesGuard.canActivate(context as ExecutionContext);
    } catch (error) {
      expect(error.message).toEqual(
        'Only admin users are allowed to perform this action',
      );
    }
  });
});
