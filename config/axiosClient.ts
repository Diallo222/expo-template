import axios, { type AxiosError, type InternalAxiosRequestConfig } from 'axios';

/** Narrow store shape to avoid a circular import with `store/store.ts`. */
interface AppStoreLike {
  dispatch: (action: unknown) => unknown;
  getState: () => { auth: { accessToken: string | null } };
}

const baseURL = process.env.EXPO_PUBLIC_API_URL ?? '';

export const axiosClient = axios.create({
  baseURL,
  timeout: 30_000,
  headers: {
    'Content-Type': 'application/json',
  },
});

let appStore: AppStoreLike | null = null;

export function injectStoreForAxios(store: AppStoreLike): void {
  appStore = store;
}

function getAccessToken(): string | null {
  return appStore?.getState().auth.accessToken ?? null;
}

axiosClient.interceptors.request.use((config: InternalAxiosRequestConfig) => {
  const token = getAccessToken();
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

axiosClient.interceptors.response.use(
  (response) => response,
  async (error: AxiosError) => {
    const status = error.response?.status;
    if ((status === 401 || status === 403) && appStore) {
      const { logout } = await import('@/features/auth/thunks');
      await appStore.dispatch(logout());
    }
    return Promise.reject(error);
  }
);
