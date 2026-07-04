const serverless = require("serverless-http");
const createApp = require("./app");

let cachedHandler;

module.exports.handler = async (event, context) => {
  if (!cachedHandler) {
    const app = await createApp();
    cachedHandler = serverless(app);
  }

  return cachedHandler(event, context);
};