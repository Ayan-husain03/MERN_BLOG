import { useState, useEffect } from "react";

const useFetch = (url, option = {}, dependencies = []) => {
  const [data, setData] = useState();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    async function getUser() {
      try {
        setLoading(true);
        const res = await fetch(url, option);
        const result = await res.json();
        setData(result);
        setError("");
      } catch (error) {
        setError(error);
      } finally {
        setLoading(false);
      }
    }
    getUser();
  }, dependencies);
  return { data, loading, error };
};

export default useFetch;
