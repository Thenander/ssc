import { useState, useEffect, useCallback } from "react";
import axios from "axios";

axios.defaults.baseURL = "http://localhost:8080/api/V1";

function useGet(path) {
  const [response, setResponse] = useState(null);
  const [error, setError] = useState("");
  const [loading, setloading] = useState(true);

  const fetchData = useCallback(() => {
    axios
      .get(path)
      .then((res) => {
        setResponse(res.data);
      })
      .catch((error) => {
        setError(error);
      })
      .finally(() => {
        setloading(false);
      });
  }, [path]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  // custom hook returns value
  return { response, error, loading };
}

export default useGet;
