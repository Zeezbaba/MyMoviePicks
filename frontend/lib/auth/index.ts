import { createAccountAug } from "@/interfaces";
import axiosInstance from "@/services/axios";


export async function createAccount(form: createAccountAug){
    try {
        const response = await axiosInstance.post("/signup", form);
        console.log(response);
      } catch (error) {
        console.error(error);
      } 
}