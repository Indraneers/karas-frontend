import { User } from "oidc-client-ts";

export function getUser() {
  const authority = import.meta.env.VITE_AUTHORITY;
  const client_id = import.meta.env.VITE_CLIENT_ID;
  const oidcStorage = sessionStorage.getItem(`oidc.user:${ authority }:${ client_id }`);
  if (!oidcStorage) {
    return null;
  }

  return User.fromStorageString(oidcStorage);
}