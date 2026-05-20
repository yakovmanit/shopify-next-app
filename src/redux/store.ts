import { configureStore } from '@reduxjs/toolkit';
import cartReducer from './slices/cartSlice';

import { storefrontApi, customerAccountApi } from './api/api';

export const store = configureStore({
  reducer: {
    cart: cartReducer,

    // Endpoints
    [storefrontApi.reducerPath]: storefrontApi.reducer,
    [customerAccountApi.reducerPath]: customerAccountApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware()
      .concat(storefrontApi.middleware)
      .concat(customerAccountApi.middleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
