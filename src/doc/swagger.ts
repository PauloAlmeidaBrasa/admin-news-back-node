import swaggerJsdoc from "swagger-jsdoc";
import path from "path";
import { schemas } from "./schemas";

const options: swaggerJsdoc.Options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "API backend for news administrator",
      version: "1.0.0",
      description: "That API is built in Node with TypeSctipt end express",
    },
    components: {
      securitySchemes: {
        bearerAuth: {
          type: "http",
          scheme: "bearer",
          bearerFormat: "JWT",
        },
      },
      schemas
    },
    security: [
      {
        bearerAuth: [],
      },
    ]
    
  },
  apis: [
    path.resolve(__dirname, "../routes/**/*.ts"),
    path.resolve(__dirname, "../controllers/**/*.ts"),
  ],
};

export const swaggerSpec = swaggerJsdoc(options);
