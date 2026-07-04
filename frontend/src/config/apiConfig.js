const BASE_URL =
  import.meta.env.VITE_API_BASE_URL ||
  "https://53bxr099c8.execute-api.ap-south-1.amazonaws.com";

export const API_ENDPOINTS = {
  lambdaUsers: `${BASE_URL}/users`,
  lambdaHello: `${BASE_URL}/hello`,
  graphql: `${BASE_URL}/graphql`,
};