import { useState, useEffect } from "react";

const useFetchUser = () => {
  const [user, setUser] = useState([]);

  useEffect(() => {
    const fetchUser = async () => {
      const response = await fetch(
        "https://53bxr099c8.execute-api.ap-south-1.amazonaws.com/users",
      );
      const data = await response.json();
      setUser(data.data);
    };

    fetchUser();
  }, []);

  return { user };
};

export default useFetchUser;
