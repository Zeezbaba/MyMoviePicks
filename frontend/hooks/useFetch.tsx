import axiosInstance from "@/services/axios";
import React, { useCallback, useEffect, useState } from "react";

const useFetch = (url: string) => {
  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<any>("");
  

  const fetchCallback = useCallback(async (signal: any) => {
    setLoading(true);
    try {
      const response = await axiosInstance.get(url, {
        signal,
        params: {
          page: 10,
        },
      });
      setData(response);
    } catch (error) {
      setError(error);
      console.log(error);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    const abortController = new AbortController();
    const signal = abortController.signal;
    fetchCallback(signal);
  }, [url]);
  return { data, loading, error };
};

export default useFetch;
