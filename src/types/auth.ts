export type LogoutResponse = {
  success: boolean;
  logoutUrl: string | null;
};

export interface SessionUser {
  id?: string;
  email?: string;
  emailVerified?: boolean;
  name?: string;
  firstName?: string;
  lastName?: string;
}

export type SessionResponse = {
  isAuthenticated: boolean;
  isExpired?: boolean;
  user: SessionUser | null;
  expiresAt?: number;
};
