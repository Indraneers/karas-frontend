import { JwtPayload } from "jwt-decode";

export interface SuccessAuthDto {
  type: 'success',
  access_token: string;
  refresh_token: string;
  expires_in: 300;
  refresh_expires_in: number;
}

export interface FailedAuthDto {
  type: 'failed',
  error: string;
  error_description: string;
}

export interface TokenPayload extends JwtPayload {
  name: string;
  email: string;
  userId: string;
}