import { Test } from "@nestjs/testing";
import * as pactum from 'pactum';
import { AppModule } from "../src/app.module";
import { INestApplication, ValidationPipe } from "@nestjs/common";
import { PrismaService } from "../src/prisma/prisma.service";
import { AuthDto } from "src/auth/dto";

describe('App E2E', () => {
  let app: INestApplication;
  let prisma: PrismaService;

  beforeAll(async () => {
    const moduleRef =
      await Test.createTestingModule({
        imports: [AppModule]
      }).compile();

    app = moduleRef.createNestApplication()
    app.useGlobalPipes(new ValidationPipe({
      whitelist: true
    }));

    await app.init();
    await app.listen(3333);

    prisma = app.get(PrismaService) //clean All the tables before test
    await prisma.cleanDb()
    pactum.request.setBaseUrl('http://localhost:3333')
  })

  afterAll(() => {
    app.close();
  })

  const dto: AuthDto = {
    email: 'niusha@gmail.com',
    password: '123456'
  }

  describe('Auth', () => {
    describe('Signup', () => {
      it('Should signup', () => {
        return
        pactum
          .spec()
          .post(
            '/auth/signup'
          )
          .withBody(dto)
          .expectStatus(201)
          .inspect()
      })
    })

    describe('Signin', () => {

      return
      pactum
        .spec()
        .post(
          '/auth/signin'
        )
        .withBody(dto)
        .expectStatus(200)
        .inspect()
    })
  })

  describe('User', () => {
    describe('Get me', () => { })

    describe('Edit user', () => { })

  })


  describe('Bookmarks', () => {
    describe('Create bookmarks', () => { })

    describe('Get bookmarks', () => { })

    describe('Get bookmark by id', () => { })

    describe('Edit bookmark', () => { })

    describe('Delete Bookmark', () => { })

  })

  it.todo("should pass");
})