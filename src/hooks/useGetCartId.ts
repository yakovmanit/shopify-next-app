import {useState} from "react";

export const useGetCartId = () => {
  const [cartId] = useState<string | null>(() => {
    if (typeof window !== 'undefined') {
      return localStorage.getItem('cartId');
    }
    return null;
  });

  return cartId;
}