// filtering.service.ts
import { Injectable } from '@nestjs/common';

@Injectable()
export class FilteringService {
  async filterPokemons(filters: {
    name?: string;
    generation?: number;
    evolutionStage?: string;
  }): Promise<{ query: object }> {
    const where = {};

    if (filters.name) {
      where['name'] = {
        contains: filters.name, // Use 'contains' for partial matching
        mode: 'insensitive', // Make the search case-insensitive
      };
    }
    if (filters.generation) {
      where['generation'] = {
        equals: filters.generation,
      };
    }

    if (filters.evolutionStage) {
      where['evolutionStage'] = {
        equals: filters.evolutionStage,
      };
    }

    // Add more conditions for additional filters as needed

    return { query: where };
  }
}
