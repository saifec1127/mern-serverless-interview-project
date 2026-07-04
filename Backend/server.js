require("dotenv").config();

const createApp = require("./app");

const PORT = process.env.PORT || 5000;

const startServer = async () => {
  const app = await createApp();

  app.listen(PORT, () => {
    console.log(`Server is running locally on http://localhost:${PORT}`);
    console.log(`GraphQL is running locally on http://localhost:${PORT}/graphql`);
  });
};

startServer();