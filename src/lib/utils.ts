import {
  AuthenticationResult,
  SilentRequest,
  InteractionRequiredAuthError,
} from "@azure/msal-browser";
import { msalInstance } from "./../Auth/msal";

export const getAccessToken = async (): Promise<string | null> => {
  const accounts = msalInstance.getAllAccounts();
  if (accounts.length === 0) {
    console.error("No accounts detected");
    return null;
  }

  const silentRequest: SilentRequest = {
    account: accounts[0],
    scopes: ["api://90f2626b-7a26-4110-8ee4-23cdc2628555/AccessToken"],
  };

  try {
    const response: AuthenticationResult =
      await msalInstance.acquireTokenSilent(silentRequest);
    return response.accessToken;
  } catch (error) {
    if (error instanceof InteractionRequiredAuthError) {
      try {
        const response: AuthenticationResult =
          await msalInstance.acquireTokenPopup(silentRequest);
        return response.accessToken;
      } catch (err) {
        console.error("Error acquiring token interactively:", err);
        return null;
      }
    } else {
      console.error("Error acquiring token silently:", error);
      return null;
    }
  }
};
