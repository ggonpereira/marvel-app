import { useCallback, useState } from "react";

export default function useFetch() {
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(null);

  const request = useCallback(async (url, options) => {
    let response;
    let json;
    try {
      setError(null);
      setLoading(true);
      response = await fetch(url, options);
      json = await response.json();
    } catch (error) {
      json = null;
      setError(
        "Ocorreu um erro ao buscar seus dados, recarregue a página e tente novamente."
      );
    } finally {
      setData(json);
      setLoading(false);
      return { response, json };
    }
  }, []);
  return { data, error, loading, request };
}
