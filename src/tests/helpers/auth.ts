import { Test } from "supertest";

export function auth(req: Test) {
  return req.set(
    "Authorization",
    `Bearer ${(global as any).authToken}`
  );
}