export const NewsAllSchema = {
  type: "array",
  items: {
    type: "object",
    properties: {
      id: { type: "integer", example: 1 },
      title: { type: "string", example: "News Title" },
      subtitle: { type: "string", example: "News Subtitle" },
      text: { type: "string", example: "News text content here" },
      category_id: { type: "integer", example: 1 },
      created_at: {
        type: "string",
        format: "date-time",
        example: "2025-12-12T10:52:01.000Z",
      },
      updated_at: {
        type: "string",
        format: "date-time",
        example: "2025-12-12T10:52:01.000Z",
      },
      client_id: { type: "integer", example: 3 },
    },
  },
};

export const NewsById = {
  type: "object",
  properties: {
    success: { type: "boolean" },
    data: {
      type: "object",
      properties: {
        id: { type: "integer" },
        title: { type: "string" },
        subtitle: { type: "string" },
        text: { type: "string" },
        category_id: { type: "integer" },
        created_at: { type: "string", format: "date-time" },
        updated_at: { type: "string", format: "date-time" },
        client_id: { type: "integer" },
      },
    },
  },
};

export const NewsCreateSchema = {
  type: "object",
  properties: {
    success: { type: "boolean" },
    message: { type: "string" },
  },
};