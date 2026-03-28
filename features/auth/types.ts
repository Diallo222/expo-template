export interface LoginCredentials {
  email: string;
  password: string;
}

export interface LoginResponse {
  accessToken: string;
  refreshToken: string;
}

export interface AuthSession {
  accessToken: string | null;
  refreshToken: string | null;
}
