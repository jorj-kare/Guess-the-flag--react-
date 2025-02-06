import { useState, useEffect } from "react";
export default function useFetch(url) {
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!url) return;
    const fetchData = async () => {
      try {
        setLoading(true);
        const res = await fetch(url);
        const resJson = await res.json();
        setData(resJson);
      } catch (err) {
        setError(err);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [url]);

  return { data, error, loading };
}
