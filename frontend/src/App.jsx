import "./App.css";
import Counter from "./components/Counter/Counter";
import FetchUser from "./components/FetchUser/FetchUser";
import FilterUser from "./components/FilterUser/FilterUser";
import FetchLambdaUser from "./components/LambdaFetch/FetchUser/FetchLambdaUser";

function App() {
  return (
    <>
      <h1>App</h1>

      <Counter />
      <FetchLambdaUser />
      <FilterUser />
      <FetchUser />
    </>
  );
}

export default App;