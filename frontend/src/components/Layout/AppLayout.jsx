import { NavLink, Outlet } from "react-router-dom";

const AppLayout = () => {
  return (
    <div>
      <h1>MERN Serverless Interview Project</h1>

      <nav className="app-nav">
        <NavLink to="/" end>
          Home
        </NavLink>

        <NavLink to="/counter">
          Counter
        </NavLink>

        <NavLink to="/graphql-users">
          GraphQL Users
        </NavLink>

        <NavLink to="/lambda-users">
          Lambda Users
        </NavLink>

        <NavLink to="/filter-users">
          Filter Users
        </NavLink>

        <NavLink to="/fetch-users">
          Fetch Users
        </NavLink>
      </nav>

      <main className="page-content">
        <Outlet />
      </main>
    </div>
  );
};

export default AppLayout;