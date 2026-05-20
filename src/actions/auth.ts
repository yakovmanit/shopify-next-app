'use server';

import {cookies} from "next/headers";
import {redirect} from "next/navigation";

export async function getCustomerAccessToken(): Promise<string> {
  const cookieStore = await cookies();

  const accessToken = cookieStore.get('access_token')?.value;

  if (!accessToken) {
    redirect('/account/login');
  }

  return accessToken;
}