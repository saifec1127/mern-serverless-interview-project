const express = require("express");
const cors = require("cors");

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
    message: "Hello Saif, Express is working with AWS Lambda setup!",
  });
});

app.get("/users", (req, res) => {
  const users = [
    {
      id: 1,
      name: "Saif",
      role: "Senior Software Engineer",
    },
    {
      id: 2,
      name: "Zainab",
      role: "Biochemistry",
    },
  ];

  res.status(200).json({
    success: true,
    data: users,
  });
});

app.post("/users", (req, res) => {
  const { name, role } = req.body;

  const newUser = {
    id: Date.now(),
    name,
    role,
  };

  res.status(201).json({
    success: true,
    message: "User created successfully",
    data: newUser,
  });
});

module.exports = app;