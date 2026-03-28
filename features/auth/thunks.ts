import { createAsyncThunk } from '@reduxjs/toolkit';
import { isAxiosError } from 'axios';

import { post } from '@/api/methods';

import type { LoginCredentials, LoginResponse } from './types';
import { clearTokens, readTokens, writeTokens } from './storage';

export const hydrateAuth = createAsyncThunk('auth/hydrate', async () => {
  return readTokens();
});

export const login = createAsyncThunk(
  'auth/login',
  async (credentials: LoginCredentials, { rejectWithValue }) => {
    try {
      if (process.env.EXPO_PUBLIC_MOCK_AUTH === 'true') {
        const tokens: LoginResponse = {
          accessToken: 'mock-access-token',
          refreshToken: 'mock-refresh-token',
        };
        await writeTokens(tokens.accessToken, tokens.refreshToken);
        return tokens;
      }

      const tokens = await post<LoginResponse, LoginCredentials>('/auth/login', credentials);
      await writeTokens(tokens.accessToken, tokens.refreshToken);
      return tokens;
    } catch (err: unknown) {
      if (isAxiosError(err)) {
        const body = err.response?.data as { message?: string } | undefined;
        return rejectWithValue(body?.message ?? err.message ?? 'Login failed');
      }
      if (err instanceof Error) {
        return rejectWithValue(err.message);
      }
      return rejectWithValue('Login failed');
    }
  }
);

export const logout = createAsyncThunk('auth/logout', async () => {
  await clearTokens();
});
