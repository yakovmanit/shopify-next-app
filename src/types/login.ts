export type LoginResponse =
  | { success: true }
  | { success: false; message: string };
