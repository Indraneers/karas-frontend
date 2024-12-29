import axios from "axios";

export const postTokenKeycloak = (formData: URLSearchParams) => 
  axios
    .post(
      `${ import.meta.env.VITE_KEYCLOAK_URL }/realms/karas-keycloak/protocol/openid-connect/token`,
      formData
    );