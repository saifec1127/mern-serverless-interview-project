import { ApolloClient, HttpLink, InMemoryCache } from "@apollo/client";
import { API_ENDPOINTS } from "../../config/apiConfig";

export const graphqlClient = new ApolloClient({
  link: new HttpLink({
    uri: API_ENDPOINTS.graphql,
  }),
  cache: new InMemoryCache(),
});