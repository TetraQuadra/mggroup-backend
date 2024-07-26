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
      HeroSchema: {
        type: "object",
        properties: {
          _id: { type: "string" },
          show: { type: "boolean" },
          title: { type: "string" },
          descr: { type: "string" },
          img: { type: "string" },
          altText: { type: "string" },
          btn: { type: "string" },
        },
        required: ["show", "title", "descr", "img", "altText", "btn"],
      },
      AboutUsSchema: {
        type: "object",
        properties: {
          _id: { type: "string" },
          show: { type: "boolean" },
          array: {
            type: "array",
            items: {
              type: "object",
              properties: {
                title: { type: "string" },
                descr: { type: "string" },
                img: { type: "string" },
                alt: { type: "string" },
              },
              required: ["title", "descr", "img", "alt"],
            },
          },
        },
        required: ["show", "array"],
      },
      ServicesSchema: {
        type: "object",
        properties: {
          _id: { type: "string" },
          show: { type: "boolean" },
          title: { type: "string" },
          array: {
            type: "array",
            items: {
              type: "object",
              properties: {
                title: { type: "string" },
                descr: { type: "string" },
                btn: { type: "string" },
                btnLink: { type: "string" },
                img: { type: "string" },
                img2x: { type: "string" },
                alt: { type: "string" },
              },
              required: [
                "title",
                "descr",
                "btn",
                "btnLink",
                "img",
                "img2x",
                "alt",
              ],
            },
          },
        },
        required: ["show", "title", "array"],
      },
      LastWorksSchema: {
        type: "object",
        properties: {
          _id: { type: "string" },
          show: { type: "boolean" },
          title: { type: "string" },
          tabs: {
            type: "array",
            items: {
              type: "object",
              properties: {
                title: { type: "string" },
                name: { type: "string" },
                imagesArr: {
                  type: "array",
                  items: {
                    type: "object",
                    properties: {
                      path: { type: "string" },
                      alt: { type: "string" },
                    },
                    required: ["path", "alt"],
                  },
                },
              },
              required: ["title", "name", "imagesArr"],
            },
          },
        },
        required: ["show", "title", "tabs"],
      },
      PrefsSchema: {
        type: "object",
        properties: {
          _id: { type: "string" },
          show: { type: "boolean" },
          title: { type: "string" },
          array: {
            type: "array",
            items: {
              type: "object",
              properties: {
                img: { type: "string" },
                alt: { type: "string" },
                title: { type: "string" },
              },
              required: ["img", "alt", "title"],
            },
          },
        },
        required: ["show", "title", "array"],
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
