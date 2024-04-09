import { useMsal } from "@azure/msal-react";

export const getAccessToken = async (): Promise<string | null> => {
  const { instance, accounts } = useMsal();

  if (accounts.length === 0) {
    return null;
  }

  try {
    const response = await instance.acquireTokenSilent({
      scopes: ["user.read"],
      account: accounts[0],
    });

    return response.accessToken;
  } catch (error) {
    console.error("Error acquiring access token:", error);
    return null;
  }
};
