import axiosInstance from "@/services/axios";

export const fetchData = async (url: string) => {
  let loading;
  let data;
  let error;
  loading = true;
  try {
    const response = await axiosInstance.get(url);
    data = response.data;
  } catch (err) {
    error = err;
    console.log(error);
  } finally {
    loading = false;
  }

  return { data, loading, error };
};
