import supertest from "supertest";
import app from "../../src/app";
import UserModel from "../../src/models/user.model";
import { closeConnection, connectDB } from "../../src/utils/database";

const request = supertest(app);

describe("User module test", () => {
  beforeAll(async () => {
    await connectDB();
  });

  describe("User registration feature test", () => {
    test("Should return 201 creation success response code when all data is valid", async () => {
      let usersToCreate = [
        {
          names: "Test User",
          email: "test1@gmail.com",
          password: "test123",
        },
        {
          names: "Test2 User",
          email: "test2@gmail.com",
          password: "test123",
        },
      ];

      for (const user of usersToCreate) {
        const response = await request.post("/users/register").send(user);
        expect(response.status).toBe(201);
      }
    });

    test("Should return 400 error response code when the email exists", async () => {
      let usersToCreate = [
        {
          names: "Test User",
          email: "test1@gmail.com",
          password: "test123",
        },
        {
          names: "Test2 User",
          email: "test2@gmail.com",
          password: "test123",
        },
      ];

      for (const user of usersToCreate) {
        const response = await request.post("/users/register").send(user);
        expect(response.status).toBe(400);
      }
    });
  });

  describe("User login feature test", () => {
    test("Should return 200 success response code and access token on successful login", async () => {
      const userToLogin = {
        email: "test1@gmail.com",
        password: "test123",
      }

      const response = await request.post("/users/login").send(userToLogin);

      expect(response.status).toBe(200);
      expect(response.body).toHaveProperty("data");
      expect(response.body.data).toHaveProperty("access_token");
    });

    test("Should return 400 error response code on login with invalid password", async () => {
      const invalidPasswordUser = {
        email: "test1@gmail.com",
        password: "test12345",
      }

      const response = await request
        .post("/users/login")
        .send(invalidPasswordUser);

      expect(response.status).toBe(400);
    });
  });

  afterAll(async () => {
    await UserModel.destroy({
      where: {},
      truncate: true,
      cascade: true,
    });
    await closeConnection();
  });
});
