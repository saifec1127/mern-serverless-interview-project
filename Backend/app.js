const express = require("express");
const cors = require("cors");

const userRoutes = require("./src/routes/user.routes");

const app = express();

app.use(
  cors({
    origin: "http://localhost:5173",
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);

app.use(express.json());

app.get("/", (req, res) => {
  res.status(200).json({
    success: true,
    message: "Backend server is running",
  });
});

app.get("/hello", (req, res) => {
  res.status(200).json({
    success: true,
    message: "Hello Saif, Express is working with AWS Lambda and DynamoDB setup!",
  });
});

app.use("/users", userRoutes);

module.exports = app;