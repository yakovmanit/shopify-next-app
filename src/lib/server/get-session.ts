import "server-only";

import {cookies} from "next/headers";

export const getSession = async () => {
  const cookiesStore = await cookies();

  const expiresInDate = cookiesStore.get('expires_in_date')?.value;
  const accessToken = cookiesStore.get('access_token')?.value;

  if (!expiresInDate || !accessToken || Date.now() > Number(expiresInDate)) {
    return {
      isAuthenticated: false,
      accessToken: null,
    }
  }

  return {
    isAuthenticated: true,
    accessToken,
  };
}