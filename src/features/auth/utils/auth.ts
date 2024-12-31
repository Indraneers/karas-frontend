import { postTokenKeycloak } from "../api/auth";
import { FailedAuthDto, SuccessAuthDto } from "../types/auth";

export function getAccessToken() {
  return localStorage.getItem('karas-auth');
}

export function getRefreshToken() {
  return localStorage.getItem('karas-auth_refresh');
}

export async function authenticateWithUsernamePassword
(username: string, password: string): Promise<SuccessAuthDto | FailedAuthDto> {
  const formData = new URLSearchParams();
  formData.append('username', username);
  formData.append('password', password);
  formData.append('client_id', 'karas-frontend');
  formData.append('client_secret', 'secret');
  formData.append('grant_type', 'password');

  return await postTokenKeycloak(formData);
}

export async function requestWithRefreshToken
(refreshToken: string | undefined): Promise<SuccessAuthDto | FailedAuthDto> {
  const formData = new URLSearchParams();
  formData.append('client_id', 'karas-frontend');
  formData.append('grant_type', 'refresh_token');
  formData.append('refresh_token', refreshToken || '');

  const response = await postTokenKeycloak(
    formData
  );

  return response;
}