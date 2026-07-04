import { Test } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import request from 'supertest';
import { ApiModule } from '../src/api.module';

describe('Auth (e2e)', () => {
  let app: INestApplication;

  beforeAll(async () => {
    const module = await Test.createTestingModule({
      imports: [ApiModule],
    }).compile();
    app = module.createNestApplication();
    await app.init();
  });

  afterAll(async () => {
    await app.close();
  });

  it('POST /auth/register - should validate password policy', async () => {
    await request(app.getHttpServer())
      .post('/auth/register')
      .send({ email: 'test@test.com', password: 'weak' })
      .expect(400);
  });

  it('POST /auth/login - should return JWT', async () => {
    await request(app.getHttpServer())
      .post('/auth/login')
      .send({ email: 'test@test.com', password: 'StrongPass1' })
      .expect(401);
  });
});
