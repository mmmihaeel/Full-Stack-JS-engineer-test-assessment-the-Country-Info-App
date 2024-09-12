import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { CountriesModule } from './countries.module';
import { HttpModule } from '@nestjs/axios';

describe('CountriesController', () => {
  let app: INestApplication;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [CountriesModule, HttpModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  it('/GET countries', () => {
    return request(app.getHttpServer())
      .get('/countries')
      .expect(200)
      .expect('Content-Type', /json/)
      .then((response) => {
        expect(Array.isArray(response.body)).toBeTruthy();
        expect(response.body.length).toBeGreaterThan(0);
      });
  });

  it('/GET countries/:countryCode (valid)', () => {
    return request(app.getHttpServer())
      .get('/countries/AD')
      .expect(200)
      .expect('Content-Type', /json/)
      .then((response) => {
        expect(response.body).toHaveProperty('countryInfo');
        expect(response.body).toHaveProperty('populationData');
        expect(response.body).toHaveProperty('flagUrl');
      });
  });

  it('/GET countries/:countryCode (invalid)', () => {
    return request(app.getHttpServer())
      .get('/countries/INVALID')
      .expect(400)
      .expect('Content-Type', /json/)
      .then((response) => {
        expect(response.body).toHaveProperty('statusCode', 400);
        expect(response.body).toHaveProperty('message', 'Invalid country code');
      });
  });

  afterAll(async () => {
    await app.close();
  });
});
