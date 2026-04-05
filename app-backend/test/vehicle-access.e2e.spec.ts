import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication, ValidationPipe } from '@nestjs/common';
import request from 'supertest';
import { AppModule } from '../src/app.module';
import { PrismaService } from '../src/shared/prisma.service';

describe('VehicleAccess (e2e)', () => {
  let app: INestApplication;
  let prisma: PrismaService;

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    app.useGlobalPipes(
      new ValidationPipe({
        whitelist: true,
        forbidNonWhitelisted: true,
        transform: true,
      }),
    );
    await app.init();

    prisma = app.get(PrismaService);

    // Ensure seed data exists
    const count = await prisma.vehicle.count();
    if (count === 0) {
      await prisma.vehicle.create({
        data: {
          plate: 'BRA2O26',
          ownerName: 'Wagner Barboza',
          vehicleType: 'car',
          vehicleModel: 'Honda Civic',
          accessType: 'resident',
          status: 'ALLOWED',
          qrCodeToken: 'e2e-test-token',
        },
      });
      await prisma.vehicle.create({
        data: {
          plate: 'BLQ9A87',
          ownerName: 'Bloqueado',
          accessType: 'blocked',
          status: 'DENIED',
        },
      });
    }
  });

  afterAll(async () => {
    // Cleanup test-created vehicles
    await prisma.vehicle.deleteMany({
      where: { plate: { in: ['TST1A23', 'DUP1A23'] } },
    });
    await app.close();
  });

  describe('GET /health', () => {
    it('should return ok', () => {
      return request(app.getHttpServer())
        .get('/health')
        .expect(200)
        .expect((res) => {
          expect(res.body.status).toBe('ok');
          expect(res.body.timestamp).toBeDefined();
        });
    });
  });

  describe('POST /vehicle-access/validate', () => {
    it('should return 200 ALLOWED for a registered plate', () => {
      return request(app.getHttpServer())
        .post('/vehicle-access/validate')
        .send({ plate: 'BRA2O26', entryMethod: 'CAMERA' })
        .expect(200)
        .expect((res) => {
          expect(res.body.feedbackType).toBe('ALLOWED');
          expect(res.body.allowed).toBe(true);
          expect(res.body.ownerName).toBe('Wagner Barboza');
        });
    });

    it('should return 403 DENIED for a blocked plate', () => {
      return request(app.getHttpServer())
        .post('/vehicle-access/validate')
        .send({ plate: 'BLQ9A87', entryMethod: 'MANUAL' })
        .expect(403);
    });

    it('should return 404 NOT_FOUND for an unknown plate', () => {
      return request(app.getHttpServer())
        .post('/vehicle-access/validate')
        .send({ plate: 'ZZZ9Z99', entryMethod: 'CAMERA' })
        .expect(404);
    });

    it('should return 400 for invalid plate format', () => {
      return request(app.getHttpServer())
        .post('/vehicle-access/validate')
        .send({ plate: '123', entryMethod: 'CAMERA' })
        .expect(400);
    });

    it('should return 400 for empty body', () => {
      return request(app.getHttpServer())
        .post('/vehicle-access/validate')
        .send({})
        .expect(400);
    });
  });

  describe('POST /vehicles', () => {
    beforeEach(async () => {
      await prisma.vehicle.deleteMany({
        where: { plate: { in: ['TST1A23', 'DUP1A23'] } },
      });
    });

    it('should create a new vehicle', () => {
      return request(app.getHttpServer())
        .post('/vehicles')
        .send({
          plate: 'TST1A23',
          ownerName: 'Test User',
          vehicleType: 'car',
        })
        .expect(201)
        .expect((res) => {
          expect(res.body.plate).toBe('TST1A23');
          expect(res.body.status).toBe('ALLOWED');
        });
    });

    it('should return 409 for duplicate plate', async () => {
      // First ensure the vehicle exists
      await request(app.getHttpServer())
        .post('/vehicles')
        .send({ plate: 'DUP1A23', ownerName: 'First' });

      return request(app.getHttpServer())
        .post('/vehicles')
        .send({ plate: 'DUP1A23', ownerName: 'Second' })
        .expect(409);
    });
  });

  describe('GET /vehicles', () => {
    it('should return list of vehicles', () => {
      return request(app.getHttpServer())
        .get('/vehicles')
        .expect(200)
        .expect((res) => {
          expect(Array.isArray(res.body)).toBe(true);
          expect(res.body.length).toBeGreaterThan(0);
        });
    });
  });

  describe('GET /access-logs', () => {
    it('should return access logs', () => {
      return request(app.getHttpServer())
        .get('/access-logs')
        .expect(200)
        .expect((res) => {
          expect(Array.isArray(res.body)).toBe(true);
        });
    });

    it('should filter by plate', () => {
      return request(app.getHttpServer())
        .get('/access-logs?plate=BRA2O26')
        .expect(200)
        .expect((res) => {
          expect(Array.isArray(res.body)).toBe(true);
          for (const log of res.body) {
            expect(log.plate).toBe('BRA2O26');
          }
        });
    });
  });
});
