import { useState, useEffect } from "react";

export const useFetch = (request, initloading, deps) => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(initloading || true);
  const [error, setError] = useState(null);

  useEffect(() => {
    let isCurrent = true;
    request()
      .then(data => {
        if (isCurrent) {
          setData(data);
        }
      })
      .catch(err => {
        if (isCurrent) {
          setError(err);
        }
      })
      .finally(() => {
        if (isCurrent) {
          setLoading(false);
        }
      });

    return () => {
      console.log("cancelling request");
      isCurrent = false; // if deps change in the middle of API request, there is no need to resolve it.
    };
  }, [request, deps]);

  return { data, loading, error };
};
