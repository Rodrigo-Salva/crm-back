import { Test } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from './../src/app.module';

describe('Contacts (e2e)', () => {
  let app: INestApplication;
  let jwtToken: string;

  beforeAll(async () => {
    const module = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();
    app = module.createNestApplication();
    await app.init();
  });

  afterAll(async () => {
    await app.close();
  });

  it('GET /contacts - should return 401 without auth', async () => {
    await request(app.getHttpServer()).get('/contacts').expect(401);
  });

  it('POST /contacts - should return 401 without auth', async () => {
    await request(app.getHttpServer()).post('/contacts').send({}).expect(401);
  });
});
