export interface SuccessAuthDto {
  type: 'success',
  access_token: string;
  refresh_token: string;
}

export interface FailedAuthDto {
  type: 'failed',
  error: string;
  error_description: string;
}

export interface TokenPayload {
  name: string;
  email: string;
}