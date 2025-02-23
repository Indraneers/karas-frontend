import { QueryClient } from "@tanstack/react-query";
import { UserManager, WebStorageStateStore } from "oidc-client-ts";

export const userManager = new UserManager({
  authority: import.meta.env.VITE_AUTHORITY,
  client_id: import.meta.env.VITE_CLIENT_ID,
  redirect_uri: `${ window.location.origin }${ window.location.pathname }${ window.location.search }`,
  post_logout_redirect_uri: window.location.origin,
  userStore: new WebStorageStateStore({ store: window.sessionStorage }),
  monitorSession: true // this allows cross tab login/logout detection
});

console.log("HEY", import.meta.env);

export const onSigninCallback = () => {
  // Parse the current URL
  const url = new URL(window.location.href);

  // Define the parameters to keep (e.g., 'print')
  const paramsToKeep = ['print'];

  // Create a new URLSearchParams object to store the filtered parameters
  const filteredParams = new URLSearchParams();

  // Iterate over the current query parameters and keep only the ones you need
  url.searchParams.forEach((value, key) => {
    if (paramsToKeep.includes(key)) {
      filteredParams.set(key, value);
    }
  });

  // Replace the current URL with the filtered parameters
  const newUrl = `${ window.location.pathname }${ filteredParams.toString() ? `?${ filteredParams.toString() }` : '' }`;
  window.history.replaceState({}, document.title, newUrl);
};


export const queryClient = new QueryClient();