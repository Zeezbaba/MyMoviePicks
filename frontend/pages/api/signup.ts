import axiosInstance from "@/services/axios";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  request: NextApiRequest,
  response: NextApiResponse
) {
  if (request.method == "POST") {
    const data = request.body;
    const responseApi = await axiosInstance.post("/api/users/register/", data);
    if (responseApi.status == 201) {
      const fetchedData = responseApi.data;
      return response.status(201).json(fetchedData);
    }
  }else {
    return response.status(405).json({ error: "Incorrect HTTP method"})
  }
}
