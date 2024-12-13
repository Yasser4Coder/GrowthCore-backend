// config/swagger.js
import swaggerJsdoc from "swagger-jsdoc";

const options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "appNmae API",
      version: "1.0.0",
      description: "API documentation for appNmae routes",
    },
    servers: [
      {
        url: "http://localhost:8080/api",
        description: "Development server",
      },
    ],
  },
  apis: ["./routes/*.js"],
};

export const swaggerSpecs = swaggerJsdoc(options);
