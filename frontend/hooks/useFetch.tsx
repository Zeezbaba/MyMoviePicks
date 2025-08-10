import axiosInstance from "@/services/axios";
import { useCallback, useEffect, useState } from "react";

interface optionsProps {
  params?: {
    page?: number;
    ordering?: string;
    title?: string;
    query?: string;
  };
}

const useFetch = (url: string, options?: optionsProps) => {
  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<any>("");

  const fetchCallback = async (signal: any) => {
    setLoading(true);
    try {
      const response = await axiosInstance.get(url, {
        signal,
        ...options,
      });
      setData(response);
    } catch (error) {
      setError(error);
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  // /useCallback(
  //, []);
  useEffect(() => {
    const abortController = new AbortController();
    const signal = abortController.signal;
    let debouncingSearch: any;
    if (options?.params?.title) {
      debouncingSearch = setTimeout(() => {
        fetchCallback(signal);
      }, 500);
    } else {
      fetchCallback(signal);
    }

    return () => {
      clearTimeout(debouncingSearch);
    };
  }, [url, options?.params?.page, options?.params?.title]);
  return { data, loading, error };
};

export default useFetch;
