import request from "supertest"
import app from "../app"
import { auth } from "./setup";

const apiVersion = process.env.API_VERSION

describe('GET user/', () => {
  it('should return user all data', async () => {
    const res = await auth(
      request(app).get("/v1/user")
    );
    return expect(Array.isArray(res.body)).toBe(true)
  });
});

describe("GET By id user/:id", () => {
  it("should return user data with name and email", async () => {
    const userId = (global as any).userId;

    const res = await auth(
      request(app).get(`/${apiVersion}/user/${userId}`)
    );

    expect(res.status).toBe(200)

    expect(res.body).toEqual(
      expect.objectContaining({
        success: true,
        data: expect.objectContaining({
          name: expect.any(String),
          email: expect.any(String),
        }),
      })
    );
  });
})

describe("PATCH /v1/user/update/:id", () => {
  it("should update user data successfully", async () => {
    const userId = (global as any).userId;

    const updatePayload = {
      name: "Paul Updated",
    };

    const updateRes = await auth(
      request(app).patch(`/${apiVersion}/user/update/${userId}`)
    ).send(updatePayload)


    expect(updateRes.status).toBe(200);
    expect(updateRes.body).toEqual(
      expect.objectContaining({
        message: "Updated successfully",
      })
    );

    const getRes = await auth(
      request(app).get(`/${apiVersion}/user/${userId}`)
    )

    expect(getRes.status).toBe(200);

    expect(getRes.body).toEqual(
      expect.objectContaining({
        success: true,
        data: expect.objectContaining({
          name: "Paul Updated",
        }),
      })
    );
  })
});

describe("POST /v1/user/delete/:id", () => {
  it("should delete the user successfully", async () => {
    const userId = (global as any).userId;

    const deleteRes = await auth(
      request(app).post(`/${apiVersion}/user/delete/4`)
    )

    expect(deleteRes.status).toBe(200);
    expect(deleteRes.body).toEqual(
      expect.objectContaining({
        message: "Deleted successfully",
      })
    );
  });
});
