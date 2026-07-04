const { ApolloServer } = require("@apollo/server");
const { expressMiddleware } = require("@as-integrations/express4");

const typeDefs = require("./schema");
const resolvers = require("./resolvers");

const setupGraphQL = async (app) => {
  const apolloServer = new ApolloServer({
    typeDefs,
    resolvers,
  });

  await apolloServer.start();

  app.use(
    "/graphql",
    expressMiddleware(apolloServer, {
      context: async ({ req }) => {
        return {
          headers: req.headers,
        };
      },
    })
  );
};

module.exports = setupGraphQL;