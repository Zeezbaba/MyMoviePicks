import { loginAug } from "@/interfaces";
import axiosInstance from "@/services/axios";
import { useRouter } from "next/router";
import { useCallback, useState } from "react";
import toast from "react-hot-toast";



const usePost = () => {
  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<any>(null);
  const router = useRouter();

  const postRequest = useCallback(async (url: string, form: any, successMessage: string, errorMessage: string, redirectPath: string) => {
    try {
      setLoading(true);
      const response = await axiosInstance.post(url, form);
      if (response.status == 200 || response.status == 201) {
        toast.success(successMessage);
        setData(response.data);
        router.push(redirectPath);
      } else {
        toast.error(errorMessage);
      }
    } catch (error) {
      setError(error);
      console.error(error);
    }
  }, []);
  return { postRequest, data, loading, error };
};

export default usePost;
