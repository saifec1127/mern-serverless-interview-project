const express = require("express");
const cors = require("cors");

const userRoutes = require("./src/routes/user.routes");
const setupGraphQL = require("./src/graphql/setupGraphQL");

const createApp = async () => {
  const app = express();

  app.use(
    cors({
      origin: "http://localhost:5173",
      methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
      allowedHeaders: ["Content-Type", "Authorization"],
    })
  );

  app.use(express.json());

  await setupGraphQL(app);

  app.get("/", (req, res) => {
    res.status(200).json({
      success: true,
      message: "Backend server is running",
    });
  });

  app.get("/hello", (req, res) => {
    res.status(200).json({
      success: true,
      message: "Hello Saif, Express is working with AWS Lambda, DynamoDB, Redis and GraphQL setup!",
    });
  });

  app.use("/users", userRoutes);

  return app;
};

module.exports = createApp;