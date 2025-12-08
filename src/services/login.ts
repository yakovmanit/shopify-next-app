import axios from "axios";
import {LoginResponse} from "@/types";
import {domain} from "@/constants/variables";

export async function login(email: string, password: string) {
  const response = await axios.post<LoginResponse>(`${domain}/api/auth/login`, {
    email,
    password,
  });

  return response.data;
}