
export const ClientAllSchema = {
  type: "array",
  items: {
  type: "object",
    properties: {
      id: { type: "integer", example: 1 },
      name: { type: "string", example: "Paul Updated6" },
      email: { type: "string", example: "paulo@example.com" },
      created_at: {
        type: "string",
        format: "date-time",
        example: "2025-12-12T10:52:01.000Z",
      },
      access_level: { type: "integer", example: 3 },
    },
  },
};
