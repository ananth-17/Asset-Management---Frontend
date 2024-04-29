import { MsalProvider } from "@azure/msal-react";
import { PublicClientApplication } from "@azure/msal-browser";

const msalInstance = new PublicClientApplication({
  auth: {
    clientId: "90f2626b-7a26-4110-8ee4-23cdc2628555",
    authority: "https://sts.windows.net/09d8c2b8-850c-4d96-a486-cbc8dfe86610",
    redirectUri: "http://localhost:5173/",
    navigateToLoginRequestUrl: false,
  },
  cache: {
    cacheLocation: "localStorage",
  },
});

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  return <MsalProvider instance={msalInstance}>{children}</MsalProvider>;
};
