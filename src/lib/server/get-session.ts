import {cookies} from "next/headers";

export const getSession = async () => {
  try {
    const cookiesForRequest = await cookies();

    const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/auth/session`, {
      headers: {
        cookie: cookiesForRequest.toString()
      },
      cache: 'no-store',
    });

    return await res.json() as {
      isAuthenticated: boolean;
      token: string
    };

  } catch (error) {
    console.error('Error getting session:', error);

    return {
      isAuthenticated: false,
      token: '',
    };
  }
}