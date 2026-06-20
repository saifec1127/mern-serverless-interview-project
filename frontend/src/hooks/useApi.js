import { useEffect, useState } from "react";

const useApi = (url, options = {}) => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchData = async () => {
    try {
      setLoading(true);
      setError(null);

      const response = await fetch(url, options);

      if (!response.ok) {
        throw new Error(`API failed with status: ${response.status}`);
      }

      const result = await response.json();

      setData(result);
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (!url) return;

    fetchData();
    
  }, [url]);

  return {
    data,
    loading,
    error,
    refetch: fetchData,
  };
};

export default useApi;