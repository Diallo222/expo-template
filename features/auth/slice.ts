import { createSlice } from '@reduxjs/toolkit';

import { hydrateAuth, login, logout } from './thunks';

export interface AuthState {
  accessToken: string | null;
  refreshToken: string | null;
  /** True after `hydrateAuth` has finished (success or failure). */
  hydrated: boolean;
  loginStatus: 'idle' | 'loading' | 'succeeded' | 'failed';
  loginError: string | null;
}

const initialState: AuthState = {
  accessToken: null,
  refreshToken: null,
  hydrated: false,
  loginStatus: 'idle',
  loginError: null,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(hydrateAuth.fulfilled, (state, action) => {
        state.accessToken = action.payload.accessToken;
        state.refreshToken = action.payload.refreshToken;
        state.hydrated = true;
      })
      .addCase(hydrateAuth.rejected, (state) => {
        state.accessToken = null;
        state.refreshToken = null;
        state.hydrated = true;
      })
      .addCase(login.pending, (state) => {
        state.loginStatus = 'loading';
        state.loginError = null;
      })
      .addCase(login.fulfilled, (state, action) => {
        state.loginStatus = 'succeeded';
        state.accessToken = action.payload.accessToken;
        state.refreshToken = action.payload.refreshToken;
        state.loginError = null;
      })
      .addCase(login.rejected, (state, action) => {
        state.loginStatus = 'failed';
        state.loginError =
          typeof action.payload === 'string' ? action.payload : action.error.message ?? 'Login failed';
      })
      .addCase(logout.fulfilled, (state) => {
        state.accessToken = null;
        state.refreshToken = null;
        state.loginStatus = 'idle';
        state.loginError = null;
      });
  },
});

export const authReducer = authSlice.reducer;
