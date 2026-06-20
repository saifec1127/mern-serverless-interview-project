const app = require("./app");

const PORT = 5000;

app.listen(PORT, () => {
  console.log(`Server is running locally on http://localhost:${PORT}`);
});