import { PublicClientApplication } from "@azure/msal-browser";

const msalConfig = {
  auth: {
    clientId: "90f2626b-7a26-4110-8ee4-23cdc2628555",
    authority: "https://sts.windows.net/09d8c2b8-850c-4d96-a486-cbc8dfe86610",
  },
  cache: {
    cacheLocation: "localStorage", // Ensure MSAL is configured to use localStorage
  },
};

export const msalInstance = new PublicClientApplication(msalConfig);
