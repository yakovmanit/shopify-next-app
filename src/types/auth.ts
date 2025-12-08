export type LoginResponse =
  | { success: true }
  | { success: false; message: string };

export type LogoutResponse = { success: true };