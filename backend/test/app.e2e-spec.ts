import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from './../src/app.module';
import { JwtService } from '@nestjs/jwt';

describe('Task Manager API (e2e)', () => {
  let app: INestApplication;
  let jwtService: JwtService;
  let authToken: string;
  let userId: string;
  let taskId: string;

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    jwtService = moduleFixture.get<JwtService>(JwtService);
    await app.init();

    // Criar um usuário para testes
    const createUserResponse = await request(app.getHttpServer())
      .post('/users')
      .send({
        name: 'Test User',
        email: 'test@example.com',
        password: 'password123'
      });

    userId = createUserResponse.body.id;

    // Fazer login e obter token
    const loginResponse = await request(app.getHttpServer())
      .post('/auth/login')
      .send({
        email: 'test@example.com',
        password: 'password123'
      });

    authToken = loginResponse.body.access_token;
  });

  describe('Root', () => {
    it('/ (GET)', () => {
      return request(app.getHttpServer())
        .get('/')
        .expect(200)
        .expect(res => {
          expect(res.body).toMatchObject({
            name: 'Task Manager API',
            version: '1.0.0',
            status: 'online'
          });
          expect(res.body).toHaveProperty('timestamp');
          expect(new Date(res.body.timestamp)).toBeInstanceOf(Date);
        });
    });
  });

  describe('Tasks', () => {
    let createdTaskId: string;
  
    it('should create a new task', async () => {
      const response = await request(app.getHttpServer())
        .post('/tasks')
        .set('Authorization', `Bearer ${authToken}`)
        .send({
          title: 'Test Task',
          description: 'Test Description',
          status: 'PENDING'
        });
  
      expect(response.status).toBe(201);
      expect(response.body).toHaveProperty('id');
      expect(response.body.title).toBe('Test Task');
      expect(response.body.userId).toBe(userId);
      createdTaskId = response.body.id;
    });
  
    it('should get all tasks', async () => {
      const response = await request(app.getHttpServer())
        .get('/tasks')
        .set('Authorization', `Bearer ${authToken}`);
  
      expect(response.status).toBe(200);
      expect(Array.isArray(response.body)).toBe(true);
      expect(response.body.length).toBeGreaterThan(0);
      expect(response.body[0].userId).toBe(userId);
    });
  
    it('should get a specific task', async () => {
      const response = await request(app.getHttpServer())
        .get(`/tasks/${createdTaskId}`)
        .set('Authorization', `Bearer ${authToken}`);
  
      expect(response.status).toBe(200);
      expect(response.body.id).toBe(createdTaskId);
      expect(response.body.title).toBe('Test Task');
      expect(response.body.userId).toBe(userId);
    });
  
    it('should update a task', async () => {
      const response = await request(app.getHttpServer())
        .put(`/tasks/${createdTaskId}`)
        .set('Authorization', `Bearer ${authToken}`)
        .send({
          status: 'IN_PROGRESS'
        });
  
      expect(response.status).toBe(200);
      expect(response.body.status).toBe('IN_PROGRESS');
    });
  
    it('should delete a task', async () => {
      await request(app.getHttpServer())
        .delete(`/tasks/${createdTaskId}`)
        .set('Authorization', `Bearer ${authToken}`)
        .expect(204);
    });
  
    it('should not get a deleted task', async () => {
      await request(app.getHttpServer())
        .get(`/tasks/${createdTaskId}`)
        .set('Authorization', `Bearer ${authToken}`)
        .expect(404);
    });
  });

  afterAll(async () => {
    // Limpar o usuário de teste
    await request(app.getHttpServer())
      .delete(`/users/${userId}`)
      .set('Authorization', `Bearer ${authToken}`);
      
    await app.close();
  });
});