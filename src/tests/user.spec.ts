import request from "supertest"
import app from "../app"
import { auth } from "./setup";

describe('GET users', () => {
  it('should return user all data', async () => {
    const res = await auth(
      request(app).get("/v1/user")
    );
    console.log("BVBVBV  ", res.body)
    return expect(Array.isArray(res.body)).toBe(true)
  });
});

