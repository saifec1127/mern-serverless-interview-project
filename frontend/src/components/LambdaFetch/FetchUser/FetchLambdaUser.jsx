import useApi from "../../../hooks/useApi";
import { API_ENDPOINTS } from "../../../config/apiConfig";

const FetchLambdaUser = () => {
  const { data, loading, error } = useApi(API_ENDPOINTS.lambdaUsers);

  const users = data?.data || [];

  if (loading) {
    return <p>Loading users...</p>;
  }

  if (error) {
    return <p style={{ color: "red" }}>Error: {error}</p>;
  }

  return (
    <div>
      <h2>Fetch from AWS Lambda HTTP API</h2>

      {users.length === 0 ? (
        <p>No users found.</p>
      ) : (
        users.map((user) => <p key={user.id}>{user.name}</p>)
      )}
    </div>
  );
};

export default FetchLambdaUser;