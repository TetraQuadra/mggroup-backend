const swaggerJSDoc = require("swagger-jsdoc");

const swaggerDefinition = {
  openapi: "3.0.0",
  info: {
    title: "Express API для проекта MGGroup",
    version: "1.0.0",
    description: "Это REST API документация для проекта MGGroup.",
  },
  servers: [
    {
      url: "http://localhost:3000",
      description: "Локальный сервер",
    },
  ],
  components: {
    securitySchemes: {
      bearerAuth: {
        type: "http",
        scheme: "bearer",
        bearerFormat: "JWT",
      },
    },
    schemas: {
      User: {
        type: "object",
        properties: {
          email: {
            type: "string",
            format: "email",
          },
          password: {
            type: "string",
            format: "password",
          },
        },
        required: ["email", "password"],
      },
      Email: {
        type: "object",
        properties: {
          email: {
            type: "string",
            format: "email",
          },
        },
        required: ["email"],
      },
    },
  },
};

const options = {
  swaggerDefinition,
  apis: ["./routes/api/*.js"],
};

const swaggerSpec = swaggerJSDoc(options);

module.exports = swaggerSpec;
