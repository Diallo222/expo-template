/**
 * Public API for the auth feature. Import selectors and thunks from here.
 * Do not import `slice.ts` from other features — only the root store registers the reducer.
 */
export { hydrateAuth, login, logout } from './thunks';
export {
  selectAccessToken,
  selectAuthHydrated,
  selectIsAuthenticated,
  selectLoginError,
  selectLoginStatus,
} from './selectors';
export type { AuthSession, LoginCredentials, LoginResponse } from './types';
export { loginFormSchema, type LoginFormValues } from './loginFormSchema';
