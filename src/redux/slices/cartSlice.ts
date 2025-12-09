import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';

interface CartState {
  cartId: string | null;
}

const initialState = {
  cartId: typeof window !== 'undefined' ? localStorage.getItem('cartId') : null,
} satisfies CartState as CartState;

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    setCartItemsCount(state, action: PayloadAction<string>) {
      state.cartId = action.payload;
    },
  },
});

export const {
  setCartItemsCount,
} = cartSlice.actions;

export default cartSlice.reducer;