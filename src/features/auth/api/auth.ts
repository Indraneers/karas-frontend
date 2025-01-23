/* eslint-disable @typescript-eslint/no-unused-vars */
import axios, { AxiosError } from "axios";
import { FailedAuthDto, SuccessAuthDto } from "../types/auth";

export const postTokenKeycloak = async (formData: URLSearchParams): Promise<SuccessAuthDto | FailedAuthDto> => {
  try {
    const response = await axios
      .post(
        `${ import.meta.env.VITE_KEYCLOAK_URL }/realms/karas-keycloak/protocol/openid-connect/token`,
        formData
      );

    return {
      type: 'success',
      access_token: response.data.access_token,
      refresh_token: response.data.refresh_token,
      refresh_expires_in: response.data.refresh_expires_in,
      expires_in: response.data.expires_in
    };
  }
  catch (error: Error | AxiosError | unknown) {
    if (axios.isAxiosError(error))  {
      return {
        type: 'failed',
        error: error.response?.data.error,
        error_description: error.response?.data.error_description
      };
    }

    return {
      type: 'failed',
      error: '',
      error_description: ''
    };
  }
};