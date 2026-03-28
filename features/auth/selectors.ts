import type { RootState } from '@/store/store';

export const selectAccessToken = (state: RootState) => state.auth.accessToken;

export const selectIsAuthenticated = (state: RootState) => Boolean(state.auth.accessToken);

export const selectAuthHydrated = (state: RootState) => state.auth.hydrated;

export const selectLoginStatus = (state: RootState) => state.auth.loginStatus;

export const selectLoginError = (state: RootState) => state.auth.loginError;
