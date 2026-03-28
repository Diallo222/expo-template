import { configureStore } from '@reduxjs/toolkit';

import { injectStoreForAxios } from '@/config/axiosClient';
import { authReducer } from '@/features/auth/slice';

export const store = configureStore({
  reducer: {
    auth: authReducer,
  },
});

injectStoreForAxios(store);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
