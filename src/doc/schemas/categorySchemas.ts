
export const CategoryAllSchema = {
  type: "array",
  items: {
  type: "object",
    properties: {
      id: { type: "integer", example: 1 },
      name: { type: "string", example: "Category 1" },
      description: { type: "string", example: "category description" },
      created_at: {
        type: "string",
        format: "date-time",
        example: "2025-12-12T10:52:01.000Z",
      },
      client_id: { type: "integer", example: 3 },
    },
  },
};
export const CategoryById = {
  type: "object",
  properties: {
    success: { type: "boolean" },
    data: {
      type: "object",
      properties: {
        name: { type: "string" },
        email: { type: "string" },
      },
    },
  },
};
export const CategoryCreateSchema = {

  type: "object",
    properties: {
      success: { type: "boolean" },
      message: { type: "string" }
    }
};
