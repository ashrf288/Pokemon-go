import { Test, TestingModule } from '@nestjs/testing';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthGuard } from './auth/auth.guard';
import { PrismaService } from './prisma/prisma.service';
import { AuthService } from './auth/auth.service';
import { ConfigModule } from '@nestjs/config';

describe('AppController', () => {
  let appController: AppController;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      imports: [ConfigModule.forRoot()],
      controllers: [AppController],
      providers: [AppService, AuthGuard, PrismaService, AuthService],
    }).compile();

    appController = app.get<AppController>(AppController);
  });

  describe('root', () => {
    it('should return "Hello World!"', () => {
      expect(appController.getHello()).toBe('Hello World!');
    });
  });
});

import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import * as request from 'supertest';

describe('NestJS App', () => {
  let app;

  beforeAll(async () => {
    // Create the Nest.js app and apply the validation pipe globally
    app = await NestFactory.create(AppModule);
    app.useGlobalPipes(new ValidationPipe());
    await app.listen(0); // Use 0 to dynamically assign an available port
  });

  afterAll(async () => {
    // Close the Nest.js app after all tests have run
    await app.close();
  });

  it('should start the Nest.js application', async () => {
    expect(app).toBeDefined();
  });

  it('should handle a sample HTTP request', async () => {
    const response = await request(app.getHttpServer()).get('/');

    expect(response.status).toBe(200); // Replace with your expected status code
    // Add more assertions about the response body or headers as needed
  });

  // Add more test cases as needed
});
