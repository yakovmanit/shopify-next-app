import axios from "axios";
import {LogoutResponse} from "@/types";
import {domain} from "@/constants/variables";

export async function logout() {
  const response = await axios.post<LogoutResponse>(`${domain}/api/auth/logout`);

  return response.data;
}