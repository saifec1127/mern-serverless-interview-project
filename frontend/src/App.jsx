import { Route, Routes } from "react-router-dom";

import "./App.css";

import AppLayout from "./components/Layout/AppLayout";
import Home from "./components/Home/Home";
import Counter from "./components/Counter/Counter";
import FetchUser from "./components/FetchUser/FetchUser";
import FilterUser from "./components/FilterUser/FilterUser";
import FetchLambdaUser from "./components/LambdaFetch/FetchUser/FetchLambdaUser";
import GraphQLUsers from "./components/GraphQLUsers/GraphQLUsers";

function App() {
  return (
    <Routes>
      <Route path="/" element={<AppLayout />}>
        <Route index element={<Home />} />

        <Route path="counter" element={<Counter />} />

        <Route path="graphql-users" element={<GraphQLUsers />} />

        <Route path="lambda-users" element={<FetchLambdaUser />} />

        <Route path="filter-users" element={<FilterUser />} />

        <Route path="fetch-users" element={<FetchUser />} />
      </Route>
    </Routes>
  );
}

export default App;